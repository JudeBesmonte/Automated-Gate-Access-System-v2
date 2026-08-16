import { NextRequest, NextResponse } from 'next/server';
import {
    getSubscriptionsNeedingReminders,
    getOverdueSubscriptions,
    getBillingSummary
} from '@/core/lib/billing-service';
import { sendPaymentDueReminderEmail } from '@/services/email/templates';
import { initializeApp } from '@/core/lib/app-initialization';

/**
 * GET /api/billing/reminders
 * Get subscriptions that need payment reminders, scheduler status, or billing summary
 */
export async function GET(request: NextRequest) {
    try {
        // Initialize app services
        await initializeApp();

        const { searchParams } = new URL(request.url);
        const type = searchParams.get('type') || 'reminders';
        const reminderDays = parseInt(searchParams.get('reminderDays') || '7');

        switch (type) {
            case 'reminders':
                const reminders = await getSubscriptionsNeedingReminders(reminderDays);
                return NextResponse.json({
                    success: true,
                    data: reminders,
                    count: reminders.length
                });

            case 'overdue':
                const overdue = await getOverdueSubscriptions();
                return NextResponse.json({
                    success: true,
                    data: overdue,
                    count: overdue.length
                });

            case 'summary':
                const summary = await getBillingSummary();
                return NextResponse.json({
                    success: true,
                    data: summary
                });

            case 'status':
                // Get scheduler status
                const { getSchedulerStatus } = await import('@/services/email/email-scheduler/scheduler');
                const status = getSchedulerStatus();
                return NextResponse.json({
                    success: true,
                    status
                });

            case 'test':
                // Manual test trigger
                const { triggerBillingCheck } = await import('@/services/email/email-scheduler/scheduler');
                const results = await triggerBillingCheck();
                return NextResponse.json({
                    success: true,
                    message: 'Manual billing check completed',
                    results: {
                        checked: results.totalChecked,
                        sent: results.results.filter(r => r.success).length,
                        failed: results.results.filter(r => !r.success).length
                    },
                    details: results.results
                });

            default:
                return NextResponse.json(
                    { success: false, error: 'Invalid type parameter. Use: reminders, overdue, summary, status, test' },
                    { status: 400 }
                );
        }
    } catch (error) {
        console.error('Billing reminders API error:', error);
        return NextResponse.json(
            {
                success: false,
                error: 'Failed to fetch billing data',
                details: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    }
}

/**
 * POST /api/billing/reminders
 * Send payment reminders (called by automated scheduler or manually)
 */
export async function POST(request: NextRequest) {
    try {
        // Ensure app services are initialized
        await initializeApp();

        const body = await request.json();
        const { type = 'reminders', reminderDays = 7 } = body;

        let subscriptions;
        let emailType;
        let emailResults: any[] = [];

        if (type === 'reminders') {
            subscriptions = await getSubscriptionsNeedingReminders(reminderDays);
            emailType = 'payment_due_reminder';

            // Send payment due reminder emails
            for (const subscription of subscriptions) {
                if (!subscription.nextBillingDate) continue;

                try {
                    const result = await sendPaymentDueReminderEmail({
                        subscriberName: subscription.subscriber.name || 'Valued Customer',
                        billingEmail: subscription.billingDetail.billingEmail,
                        planName: subscription.plan.name,
                        nextBillingDate: subscription.nextBillingDate.toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        }),
                        amount: subscription.plan.monthlyPrice || subscription.plan.yearlyPrice || 0,
                        gracePeriodDays: subscription.gracePeriodDays,
                        paymentUrl: `${process.env.NEXT_PUBLIC_APP_URL}/client/payment`
                    });

                    emailResults.push({
                        subscriptionId: subscription.id,
                        email: subscription.billingDetail.billingEmail,
                        success: true,
                        error: null
                    });
                } catch (error) {
                    console.error(`Failed to send payment due reminder to ${subscription.billingDetail.billingEmail}:`, error);
                    emailResults.push({
                        subscriptionId: subscription.id,
                        email: subscription.billingDetail.billingEmail,
                        success: false,
                        error: error instanceof Error ? error.message : 'Unknown error'
                    });
                }
            }
        } else if (type === 'overdue') {
            subscriptions = await getOverdueSubscriptions();
            emailType = 'payment_overdue_notice';

            // TODO: Implement payment overdue notice email sending
            console.log(`Would send ${emailType} to ${subscriptions.length} subscriptions:`,
                subscriptions.map(sub => ({
                    id: sub.id,
                    email: sub.billingDetail.billingEmail,
                    dueDate: sub.nextBillingDate
                }))
            );
        } else {
            return NextResponse.json(
                { success: false, error: 'Invalid type parameter' },
                { status: 400 }
            );
        }

        return NextResponse.json({
            success: true,
            message: `${emailType} processed`,
            count: subscriptions.length,
            emailResults: emailResults.length > 0 ? emailResults : undefined,
            subscriptions: subscriptions.map(sub => ({
                id: sub.id,
                subscriberName: sub.subscriber.name,
                billingEmail: sub.billingDetail.billingEmail,
                nextBillingDate: sub.nextBillingDate,
                planName: sub.plan.name
            }))
        });

    } catch (error) {
        console.error('Send billing reminders error:', error);
        return NextResponse.json(
            {
                success: false,
                error: 'Failed to send billing reminders',
                details: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    }
} 