/**
 * Application initialization utilities
 * Handles startup of background services like billing scheduler
 */

let isInitialized = false;

/**
 * Initialize application services
 * Only runs once and only in server context
 */
export async function initializeApp() {
    if (isInitialized) {
        return;
    }

    // Only run in production or when explicitly enabled
    const shouldStartScheduler = process.env.NODE_ENV === 'production' ||
        process.env.ENABLE_BILLING_CRON === 'true';

    if (shouldStartScheduler) {
        try {
            // Dynamic import to ensure this only runs server-side
            const { startBillingScheduler } = await import('@/services/email/email-scheduler/scheduler');
            startBillingScheduler();
            console.log('✅ Billing scheduler initialized');
        } catch (error) {
            console.error('❌ Failed to initialize billing scheduler:', error);
        }
    } else {
        console.log('📅 Billing scheduler disabled (set ENABLE_BILLING_CRON=true to enable in development)');
    }

    isInitialized = true;
}

/**
 * Get initialization status
 */
export function getInitializationStatus() {
    return { isInitialized };
} 