"use server"

import { sendEmail, renderEmailTemplate } from "../../shared/utils"
import { PaymentSuccessEmail } from "../components/payment-success"

interface PaymentSuccessEmailData {
    name: string
    email: string
    amount: number
    paymentMethod: string
    transactionId: string
    paymentDate?: string
    subscriptionName?: string
}

export const sendPaymentSuccessEmail = async (data: PaymentSuccessEmailData) => {
    try {
        const paymentDate = data.paymentDate || new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })

        const { html, text } = await renderEmailTemplate(PaymentSuccessEmail({
            ...data,
            paymentDate
        }))

        return await sendEmail({
            to: data.email,
            subject: `Payment Confirmed - ₱${data.amount.toLocaleString()}`,
            html,
            text
        })
    } catch (error) {
        console.error('Payment success email error:', error)
        // Don't throw - payment succeeded, email failure shouldn't break flow
        return { success: false, error }
    }
} 