"use server"

import { render } from "@react-email/render"
import { catchErr } from "@/core/lib/errors"
import { createTransporter, EMAIL_FROM } from "@/services/email/config"

interface SendEmailParams {
    to: string
    subject: string
    html: string
    text: string
}

export const sendEmail = async ({ to, subject, html, text }: SendEmailParams) => {
    const transporter = createTransporter()

    const [result, error] = await catchErr(
        transporter.sendMail({
            from: EMAIL_FROM,
            to,
            subject,
            html,
            text
        })
    )

    if (error) {
        console.error("Failed to send email:", error)
        throw error
    }

    return result
}

export const renderEmailTemplate = async (component: React.ReactElement) => {
    const html = await render(component)
    const text = await render(component, { plainText: true })

    return { html, text }
} 