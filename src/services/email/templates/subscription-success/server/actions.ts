"use server"

import { sendEmail, renderEmailTemplate } from "../../shared/utils"
import { SubscriptionSuccessEmail } from "../components/subscription-success"

interface SubscriptionSuccessEmailData {
    name: string
    email: string
    planName: string
    price: number
    subscriptionId: string
}

export const sendSubscriptionSuccessEmail = async (data: SubscriptionSuccessEmailData) => {
    const { html, text } = await renderEmailTemplate(SubscriptionSuccessEmail(data))

    return sendEmail({
        to: data.email,
        subject: `Subscription Confirmed - Welcome to ${data.planName}!`,
        html,
        text
    })
} 