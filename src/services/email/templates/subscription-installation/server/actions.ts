"use server"

import { sendEmail, renderEmailTemplate } from "../../shared/utils"
import { InstallationScheduledEmail } from "../components/installation-scheduled"

interface InstallationScheduledEmailData {
    name: string
    email: string
    planName: string
    price: number
    subscriptionId: string
    installationDate: string
    siteAddress?: string
    contactNumber: string
}

export const sendInstallationScheduledEmail = async (data: InstallationScheduledEmailData) => {
    const { html, text } = await renderEmailTemplate(InstallationScheduledEmail(data))

    return sendEmail({
        to: data.email,
        subject: `Installation Scheduled - ${data.planName} Setup Confirmed for ${data.installationDate}`,
        html,
        text
    })
} 