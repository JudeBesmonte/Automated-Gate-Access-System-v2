"use server"

import { sendEmail, renderEmailTemplate } from "../../shared/utils"
import { PaymentFailedEmail } from "../components/payment-failed"

interface PaymentFailedEmailData {
    name: string
    email: string
    amount: number
    paymentMethod: string
    transactionId: string
    paymentDate?: string
    failureReason?: string
    subscriptionName?: string
}

export const sendPaymentFailedEmail = async (data: PaymentFailedEmailData) => {
    try {
        const paymentDate = data.paymentDate || new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })

        const { html, text } = await renderEmailTemplate(PaymentFailedEmail({
            ...data,
            paymentDate
        }))

        return await sendEmail({
            to: data.email,
            subject: "Payment Failed - Action Required",
            html,
            text
        })
    } catch (error) {
        console.error('Payment failed email error:', error)
        // Don't throw - payment processing shouldn't fail due to email
        return { success: false, error }
    }
} 