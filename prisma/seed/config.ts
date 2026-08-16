import { PrismaClient } from "@prisma/client"

export const db = new PrismaClient({
	log: ["warn", "error"],
	transactionOptions: {
		maxWait: 5000,
		timeout: 30000
	}
})

export const SEED_RANGES = {
	ADMIN: [2, 5],
	CLIENT: [5, 15],
	STAFF: [1, 5]
} as const

export const EMAIL_DOMAIN = "@email.com"
export const DEFAULT_PASSWORD = "asdfasdf"
