"use server"

import { sendEmail, renderEmailTemplate } from "../../shared/utils"
import { SubscriptionRequestEmail } from "../components/subscription-request"

interface SubscriptionRequestEmailData {
    name: string
    email: string
    planName: string
    price: number
    subscriptionId: string
}

export const sendSubscriptionRequestEmail = async (data: SubscriptionRequestEmailData) => {
    const { html, text } = await renderEmailTemplate(SubscriptionRequestEmail(data))

    return sendEmail({
        to: data.email,
        subject: `Subscription Request Received - ${data.planName}`,
        html,
        text
    })
} 