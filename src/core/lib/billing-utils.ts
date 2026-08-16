import { addMonths, addYears, startOfDay, isAfter, differenceInDays } from 'date-fns';
import type { BillingInterval } from '@prisma/client';

/**
 * Calculate the next billing date based on billing start date and interval
 * Handles edge cases like month-end dates (Jan 31 → Feb 28/29)
 */
export function calculateNextBillingDate(
    billingStartDate: Date,
    billingInterval: BillingInterval,
    fromDate: Date = new Date()
): Date {
    const startDate = startOfDay(billingStartDate);
    let nextDate = new Date(startDate);

    if (billingInterval === 'YEARLY') {
        // For yearly billing, add 1 year
        nextDate = addYears(startDate, 1);
    } else {
        // For monthly billing, handle month-end edge cases
        nextDate = addMonths(startDate, 1);

        // Handle month-end edge case (e.g., Jan 31 → Feb 28/29)
        const originalDay = startDate.getDate();
        const newMonthLastDay = new Date(nextDate.getFullYear(), nextDate.getMonth() + 1, 0).getDate();

        // If original day doesn't exist in new month, use last day of month
        if (originalDay > newMonthLastDay) {
            nextDate.setDate(newMonthLastDay);
        } else {
            nextDate.setDate(originalDay);
        }
    }

    // If calculated date is still in the past, calculate the next occurrence
    while (!isAfter(nextDate, fromDate)) {
        if (billingInterval === 'YEARLY') {
            nextDate = addYears(nextDate, 1);
        } else {
            nextDate = addMonths(nextDate, 1);

            // Re-apply month-end logic
            const originalDay = startDate.getDate();
            const newMonthLastDay = new Date(nextDate.getFullYear(), nextDate.getMonth() + 1, 0).getDate();

            if (originalDay > newMonthLastDay) {
                nextDate.setDate(newMonthLastDay);
            } else {
                nextDate.setDate(originalDay);
            }
        }
    }

    return nextDate;
}

/**
 * Check if a subscription is overdue based on next billing date and grace period
 */
export function isSubscriptionOverdue(
    nextBillingDate: Date,
    gracePeriodDays: number,
    currentDate: Date = new Date()
): boolean {
    const gracePeriodEnd = new Date(nextBillingDate);
    gracePeriodEnd.setDate(gracePeriodEnd.getDate() + gracePeriodDays);

    return isAfter(currentDate, gracePeriodEnd);
}

/**
 * Check if a payment reminder should be sent
 * Default: 7 days before due date
 */
export function shouldSendPaymentReminder(
    nextBillingDate: Date,
    reminderDaysBefore: number = 7,
    currentDate: Date = new Date()
): boolean {
    const reminderDate = new Date(nextBillingDate);
    reminderDate.setDate(reminderDate.getDate() - reminderDaysBefore);

    const tomorrow = new Date(currentDate);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Send reminder if current date is on or after reminder date, but before due date
    return !isAfter(currentDate, nextBillingDate) && !isAfter(reminderDate, currentDate);
}

/**
 * Get days until next billing date
 */
export function getDaysUntilBilling(
    nextBillingDate: Date,
    currentDate: Date = new Date()
): number {
    return differenceInDays(nextBillingDate, currentDate);
}

/**
 * Get days overdue (negative means not overdue yet)
 */
export function getDaysOverdue(
    nextBillingDate: Date,
    gracePeriodDays: number,
    currentDate: Date = new Date()
): number {
    const gracePeriodEnd = new Date(nextBillingDate);
    gracePeriodEnd.setDate(gracePeriodEnd.getDate() + gracePeriodDays);

    return differenceInDays(currentDate, gracePeriodEnd);
}

/**
 * Format billing date for display
 */
export function formatBillingDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

/**
 * Get billing status for a subscription
 */
export function getBillingStatus(
    nextBillingDate: Date | null,
    gracePeriodDays: number,
    currentDate: Date = new Date()
): 'upcoming' | 'due' | 'overdue' | 'unknown' {
    if (!nextBillingDate) return 'unknown';

    const daysUntil = getDaysUntilBilling(nextBillingDate, currentDate);

    if (daysUntil > 7) {
        return 'upcoming';
    } else if (daysUntil >= 0) {
        return 'due';
    } else if (isSubscriptionOverdue(nextBillingDate, gracePeriodDays, currentDate)) {
        return 'overdue';
    } else {
        return 'due'; // In grace period
    }
} 