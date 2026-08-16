"use server"

import { sendEmail, renderEmailTemplate } from "../../shared/utils"
import { PaymentDueReminder } from "../components/payment-due-reminder"

interface PaymentDueReminderEmailData {
    subscriberName: string
    billingEmail: string
    planName: string
    nextBillingDate: string
    amount: number
    gracePeriodDays: number
    paymentUrl?: string
}

export const sendPaymentDueReminderEmail = async (data: PaymentDueReminderEmailData) => {
    try {
        const { html, text } = await renderEmailTemplate(PaymentDueReminder(data))

        return await sendEmail({
            to: data.billingEmail,
            subject: `Payment Due Reminder - ${data.planName} (Due: ${data.nextBillingDate})`,
            html,
            text
        })
    } catch (error) {
        console.error('Payment due reminder email error:', error)
        // Don't throw - this is a reminder email, failure shouldn't break the system
        return { success: false, error }
    }
} 