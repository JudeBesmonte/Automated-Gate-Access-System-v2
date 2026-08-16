"use server"

import { sendEmail, renderEmailTemplate } from "../../shared/utils"
import { PaymentOverdueNotice } from "../components/payment-overdue-notice"

interface PaymentOverdueNoticeEmailData {
    subscriberName: string
    billingEmail: string
    planName: string
    nextBillingDate: string
    amount: number
    daysOverdue: number
    paymentUrl?: string
}

export const sendPaymentOverdueNoticeEmail = async (data: PaymentOverdueNoticeEmailData) => {
    try {
        const { html, text } = await renderEmailTemplate(PaymentOverdueNotice(data))

        return await sendEmail({
            to: data.billingEmail,
            subject: `🚨 URGENT: Payment Overdue - ${data.planName} (${data.daysOverdue} days overdue)`,
            html,
            text
        })
    } catch (error) {
        console.error('Payment overdue notice email error:', error)
        // Don't throw - this is a reminder email, failure shouldn't break the system
        return { success: false, error }
    }
} 