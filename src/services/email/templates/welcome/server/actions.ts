"use server"

import { sendEmail, renderEmailTemplate } from "../../shared/utils"
import { WelcomeEmail } from "../components/welcome"

interface WelcomeEmailData {
    name: string
    email: string
}

export const sendWelcomeEmail = async (data: WelcomeEmailData) => {
    const { html, text } = await renderEmailTemplate(WelcomeEmail(data))

    return sendEmail({
        to: data.email,
        subject: "Welcome to QBYFI - Your Account is Ready!",
        html,
        text
    })
} 