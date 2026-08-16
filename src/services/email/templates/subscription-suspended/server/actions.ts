"use server"

import { sendEmail, renderEmailTemplate } from "../../shared/utils"
import { SubscriptionSuspendedEmail } from "../components/subscription-suspended"

interface SubscriptionSuspendedEmailData {
    name: string
    email: string
    planName: string
    price: number
    subscriptionId: string
    suspensionDate: string
    reason?: string
}

export const sendSubscriptionSuspendedEmail = async (data: SubscriptionSuspendedEmailData) => {
    const { html, text } = await renderEmailTemplate(SubscriptionSuspendedEmail(data))

    return sendEmail({
        to: data.email,
        subject: `Service Suspended - ${data.planName} Temporarily Unavailable`,
        html,
        text
    })
} 