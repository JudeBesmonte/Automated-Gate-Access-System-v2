import { db } from '@/core/server/db';
import {
    calculateNextBillingDate,
    isSubscriptionOverdue,
    shouldSendPaymentReminder,
    getBillingStatus
} from './billing-utils';
import type { BillingInterval, SubscriptionStatus } from '@prisma/client';
import { sendPaymentDueReminderEmail } from '@/services/email/templates';

/**
 * Initialize billing cycle when subscription becomes ACTIVE
 */
export async function initializeBillingCycle(subscriptionId: string) {
    const subscription = await db.subscription.findUnique({
        where: { id: subscriptionId },
        select: {
            id: true,
            billingInterval: true,
            subscriptionStatus: true
        }
    });

    if (!subscription) {
        throw new Error('Subscription not found');
    }

    if (subscription.subscriptionStatus !== 'ACTIVE') {
        throw new Error('Subscription must be ACTIVE to initialize billing cycle');
    }

    // Use current date as billing start date (when status changed to ACTIVE)
    const billingStartDate = new Date();

    // Calculate next billing date
    const nextBillingDate = calculateNextBillingDate(
        billingStartDate,
        subscription.billingInterval
    );

    // Update subscription with billing information
    await db.subscription.update({
        where: { id: subscriptionId },
        data: {
            billingStartDate: billingStartDate,
            nextBillingDate: nextBillingDate
        }
    });

    return {
        billingStartDate: billingStartDate,
        nextBillingDate: nextBillingDate
    };
}

/**
 * Update next billing date after successful payment
 */
export async function updateNextBillingDate(subscriptionId: string) {
    const subscription = await db.subscription.findUnique({
        where: { id: subscriptionId },
        select: {
            id: true,
            billingStartDate: true,
            billingInterval: true,
            nextBillingDate: true
        }
    });

    if (!subscription || !subscription.billingStartDate) {
        throw new Error('Subscription or billing start date not found');
    }

    // Calculate next billing date from current billing start
    const nextBillingDate = calculateNextBillingDate(
        subscription.billingStartDate,
        subscription.billingInterval,
        subscription.nextBillingDate || new Date()
    );

    await db.subscription.update({
        where: { id: subscriptionId },
        data: {
            nextBillingDate: nextBillingDate
        }
    });

    return nextBillingDate;
}

/**
 * Get subscriptions that need payment reminders
 */
export async function getSubscriptionsNeedingReminders(reminderDaysBefore: number = 7) {
    const subscriptions = await db.subscription.findMany({
        where: {
            subscriptionStatus: 'ACTIVE',
            nextBillingDate: { not: null }
        },
        select: {
            id: true,
            nextBillingDate: true,
            gracePeriodDays: true,
            subscriber: {
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            },
            subscriberDetail: {
                select: {
                    contactEmail: true
                }
            },
            billingDetail: {
                select: {
                    billingName: true,
                    billingEmail: true
                }
            },
            plan: {
                select: {
                    name: true,
                    monthlyPrice: true,
                    yearlyPrice: true
                }
            }
        }
    });

    return subscriptions.filter(subscription => {
        if (!subscription.nextBillingDate) return false;

        return shouldSendPaymentReminder(
            subscription.nextBillingDate,
            reminderDaysBefore
        );
    });
}

/**
 * Get overdue subscriptions
 */
export async function getOverdueSubscriptions() {
    const subscriptions = await db.subscription.findMany({
        where: {
            subscriptionStatus: 'ACTIVE',
            nextBillingDate: { not: null }
        },
        select: {
            id: true,
            nextBillingDate: true,
            gracePeriodDays: true,
            subscriber: {
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            },
            billingDetail: {
                select: {
                    billingName: true,
                    billingEmail: true
                }
            },
            plan: {
                select: {
                    name: true,
                    monthlyPrice: true,
                    yearlyPrice: true
                }
            }
        }
    });

    return subscriptions.filter(subscription => {
        if (!subscription.nextBillingDate) return false;

        return isSubscriptionOverdue(
            subscription.nextBillingDate,
            subscription.gracePeriodDays
        );
    });
}

/**
 * Get billing summary for admin dashboard
 */
export async function getBillingSummary() {
    const subscriptions = await db.subscription.findMany({
        where: {
            subscriptionStatus: 'ACTIVE',
            nextBillingDate: { not: null }
        },
        select: {
            id: true,
            nextBillingDate: true,
            gracePeriodDays: true,
            price: true
        }
    });

    const summary = {
        total: subscriptions.length,
        upcoming: 0,
        due: 0,
        overdue: 0,
        unknown: 0,
        totalRevenue: 0
    };

    subscriptions.forEach(subscription => {
        if (!subscription.nextBillingDate) return;

        const status = getBillingStatus(
            subscription.nextBillingDate,
            subscription.gracePeriodDays
        );

        summary[status]++;
        summary.totalRevenue += subscription.price;
    });

    return summary;
}

/**
 * Get subscription billing details
 */
export async function getSubscriptionBillingDetails(subscriptionId: string) {
    const subscription = await db.subscription.findUnique({
        where: { id: subscriptionId },
        select: {
            id: true,
            billingStartDate: true,
            nextBillingDate: true,
            gracePeriodDays: true,
            billingInterval: true,
            price: true,
            installationDate: true,
            subscriptionStatus: true,
            subscriber: {
                select: {
                    name: true,
                    email: true
                }
            },
            plan: {
                select: {
                    name: true,
                    billingInterval: true
                }
            }
        }
    });

    if (!subscription) {
        throw new Error('Subscription not found');
    }

    const billingStatus = subscription.nextBillingDate
        ? getBillingStatus(subscription.nextBillingDate, subscription.gracePeriodDays)
        : 'unknown';

    return {
        ...subscription,
        billingStatus
    };
}

/**
 * Suspend overdue subscription
 */
export async function suspendOverdueSubscription(subscriptionId: string, reason: string) {
    const subscription = await db.subscription.findUnique({
        where: { id: subscriptionId },
        select: {
            id: true,
            nextBillingDate: true,
            gracePeriodDays: true,
            subscriptionStatus: true
        }
    });

    if (!subscription) {
        throw new Error('Subscription not found');
    }

    if (subscription.subscriptionStatus !== 'ACTIVE') {
        throw new Error('Only active subscriptions can be suspended');
    }

    if (!subscription.nextBillingDate || !isSubscriptionOverdue(subscription.nextBillingDate, subscription.gracePeriodDays)) {
        throw new Error('Subscription is not overdue');
    }

    await db.subscription.update({
        where: { id: subscriptionId },
        data: {
            subscriptionStatus: 'SUSPENDED'
        }
    });

    return true;
}

/**
 * Reactivate suspended subscription
 */
export async function reactivateSubscription(subscriptionId: string) {
    const subscription = await db.subscription.findUnique({
        where: { id: subscriptionId },
        select: {
            id: true,
            billingStartDate: true,
            billingInterval: true,
            subscriptionStatus: true
        }
    });

    if (!subscription) {
        throw new Error('Subscription not found');
    }

    if (subscription.subscriptionStatus !== 'SUSPENDED') {
        throw new Error('Only suspended subscriptions can be reactivated');
    }

    if (!subscription.billingStartDate) {
        throw new Error('Billing start date missing');
    }

    // Calculate new next billing date
    const nextBillingDate = calculateNextBillingDate(
        subscription.billingStartDate,
        subscription.billingInterval
    );

    await db.subscription.update({
        where: { id: subscriptionId },
        data: {
            subscriptionStatus: 'ACTIVE',
            nextBillingDate: nextBillingDate
        }
    });

    return nextBillingDate;
}

/**
 * Send payment reminder for a specific subscription
 */
export async function sendPaymentReminderForSubscription(subscriptionId: string) {
    const subscription = await db.subscription.findUnique({
        where: { id: subscriptionId },
        select: {
            id: true,
            nextBillingDate: true,
            gracePeriodDays: true,
            subscriptionStatus: true,
            price: true,
            subscriber: {
                select: {
                    name: true,
                    email: true
                }
            },
            subscriberDetail: {
                select: {
                    contactEmail: true
                }
            },
            billingDetail: {
                select: {
                    billingName: true,
                    billingEmail: true
                }
            },
            plan: {
                select: {
                    name: true,
                    monthlyPrice: true,
                    yearlyPrice: true
                }
            }
        }
    });

    if (!subscription || !subscription.nextBillingDate) {
        return { success: false, error: 'Subscription or billing date not found' };
    }

    if (subscription.subscriptionStatus !== 'ACTIVE') {
        return { success: false, error: 'Subscription is not active' };
    }

    // Check if reminder should be sent (within 7 days of due date)
    if (!shouldSendPaymentReminder(subscription.nextBillingDate, 7)) {
        return { success: false, error: 'Not within reminder window' };
    }

    try {
        await sendPaymentDueReminderEmail({
            subscriberName: subscription.subscriber.name || 'Valued Customer',
            billingEmail: subscription.subscriberDetail.contactEmail,
            planName: subscription.plan.name,
            nextBillingDate: subscription.nextBillingDate.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }),
            amount: subscription.price,
            gracePeriodDays: subscription.gracePeriodDays,
            paymentUrl: `${process.env.NEXT_PUBLIC_APP_URL}/client/payment`
        });

        return { success: true };
    } catch (error) {
        console.error('Failed to send payment reminder:', error);
        return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
}

/**
 * Check and send payment reminders for subscriptions that need them
 */
export async function checkAndSendPaymentReminders(reminderDaysBefore: number = 7) {
    const subscriptions = await getSubscriptionsNeedingReminders(reminderDaysBefore);
    const results = [];

    for (const subscription of subscriptions) {
        if (!subscription.nextBillingDate) continue;

        const result = await sendPaymentReminderForSubscription(subscription.id);
        results.push({
            subscriptionId: subscription.id,
            subscriberName: subscription.subscriber.name,
            billingEmail: subscription.billingDetail.billingEmail,
            ...result
        });
    }

    return {
        totalChecked: subscriptions.length,
        results
    };
} 