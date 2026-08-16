"use server"

import { sendEmail, renderEmailTemplate } from "../../shared/utils"
import { SubscriptionTerminatedEmail } from "../components/subscription-terminated"

interface SubscriptionTerminatedEmailData {
    name: string
    email: string
    planName: string
    price: number
    subscriptionId: string
    terminationDate: string
    reason?: string
}

export const sendSubscriptionTerminatedEmail = async (data: SubscriptionTerminatedEmailData) => {
    const { html, text } = await renderEmailTemplate(SubscriptionTerminatedEmail(data))

    return sendEmail({
        to: data.email,
        subject: `Subscription Terminated - ${data.planName} Service Ended`,
        html,
        text
    })
} 