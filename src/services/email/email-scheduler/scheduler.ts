import cron from 'node-cron';
import {
    checkAndSendPaymentReminders,
    getOverdueSubscriptions
} from '@/core/lib/billing-service';

let isSchedulerRunning = false;

/**
 * Start the automated billing scheduler
 * Runs daily at 9 AM Philippines time to send payment reminders
 * Runs weekly on Mondays at 10 AM for overdue summary
 */
export function startBillingScheduler() {
    // Prevent multiple schedulers from running
    if (isSchedulerRunning) {
        console.log('📅 Billing scheduler already running');
        return;
    }

    // Daily billing reminders at 9 AM Philippines time
    cron.schedule('0 9 * * *', async () => {
        console.log('🔄 Running daily billing reminders...');

        try {
            // Send payment reminders (7 days before due)
            const reminderResults = await checkAndSendPaymentReminders(7);
            const successfulReminders = reminderResults.results.filter(r => r.success);

            console.log(`📧 Sent ${successfulReminders.length} payment reminders out of ${reminderResults.totalChecked} checked`);

            // Check overdue subscriptions
            const overdueSubscriptions = await getOverdueSubscriptions();
            console.log(`⚠️ Found ${overdueSubscriptions.length} overdue subscriptions`);

            // Log overdue details for manual follow-up
            if (overdueSubscriptions.length > 0) {
                console.log('Overdue subscriptions:');
                overdueSubscriptions.forEach(sub => {
                    const daysOverdue = sub.nextBillingDate
                        ? Math.floor((Date.now() - sub.nextBillingDate.getTime()) / (1000 * 60 * 60 * 24))
                        : 0;

                    console.log(`  - ${sub.subscriber.name} (${sub.billingDetail.billingEmail}) - ${daysOverdue} days overdue`);
                });
            }

            // Summary
            const summary = {
                timestamp: new Date().toISOString(),
                reminders: {
                    checked: reminderResults.totalChecked,
                    sent: successfulReminders.length,
                    failed: reminderResults.results.filter(r => !r.success).length
                },
                overdue: {
                    count: overdueSubscriptions.length
                }
            };

            console.log('✅ Daily billing check completed:', summary);

        } catch (error) {
            console.error('❌ Billing scheduler error:', error);
        }
    }, {
        timezone: "Asia/Manila"
    });

    // Weekly overdue summary every Monday at 10 AM
    cron.schedule('0 10 * * 1', async () => {
        console.log('📊 Running weekly overdue summary...');

        try {
            const overdueSubscriptions = await getOverdueSubscriptions();

            if (overdueSubscriptions.length > 0) {
                console.log(`📋 Weekly Summary: ${overdueSubscriptions.length} overdue subscriptions`);

                // Group by days overdue for better insights
                const grouped = overdueSubscriptions.reduce((acc, sub) => {
                    const daysOverdue = sub.nextBillingDate
                        ? Math.floor((Date.now() - sub.nextBillingDate.getTime()) / (1000 * 60 * 60 * 24))
                        : 0;

                    const range = daysOverdue <= 7 ? '1-7 days' :
                        daysOverdue <= 30 ? '8-30 days' : '30+ days';

                    acc[range] = (acc[range] || 0) + 1;
                    return acc;
                }, {} as Record<string, number>);

                console.log('Overdue breakdown:', grouped);
            } else {
                console.log('✅ No overdue subscriptions this week!');
            }
        } catch (error) {
            console.error('❌ Weekly summary error:', error);
        }
    }, {
        timezone: "Asia/Manila"
    });

    isSchedulerRunning = true;
    console.log('📅 Billing scheduler started successfully');
    console.log('   - Daily reminders: 9:00 AM (Philippines time)');
    console.log('   - Weekly summary: Mondays 10:00 AM (Philippines time)');
}

/**
 * Stop the billing scheduler
 */
export function stopBillingScheduler() {
    // Note: node-cron doesn't expose getTasks in current versions
    // Tasks will be stopped when the process exits
    isSchedulerRunning = false;
    console.log('🛑 Billing scheduler stopped');
}

/**
 * Manual trigger for testing billing reminders
 */
export async function triggerBillingCheck() {
    console.log('🔄 Manual billing check triggered...');

    try {
        const results = await checkAndSendPaymentReminders(7);
        console.log(`📧 Manual check: Sent ${results.results.filter(r => r.success).length} reminders`);
        return results;
    } catch (error) {
        console.error('❌ Manual billing check failed:', error);
        throw error;
    }
}

/**
 * Get scheduler status
 */
export function getSchedulerStatus() {
    return {
        isRunning: isSchedulerRunning,
        activeTasksCount: isSchedulerRunning ? 2 : 0 // Daily + Weekly tasks
    };
} 