import * as nodemailer from "nodemailer"

interface EmailConfig {
    host: string
    port: number
    secure: boolean
    auth: {
        user: string
        pass: string
    }
}

const getEmailConfig = (): EmailConfig => {
    const host = process.env.EMAIL_HOST
    const port = parseInt(process.env.EMAIL_PORT || "587")
    const user = process.env.EMAIL_USER
    const pass = process.env.EMAIL_PASS

    if (!host || !user || !pass) {
        throw new Error("Missing required email configuration")
    }

    return {
        host,
        port,
        secure: port === 465,
        auth: { user, pass }
    }
}

export const createTransporter = () => {
    const config = getEmailConfig()
    return nodemailer.createTransport(config)
}

export const EMAIL_FROM = process.env.EMAIL_FROM || process.env.EMAIL_USER || "noreply@qbyfi.com" 