"use server"

import { hash } from "bcryptjs"

import { signIn as authSignIn } from "@/services/authjs/auth"
import { getUserByEmail } from "@/services/authjs/data"
import { sendWelcomeEmail } from "@/services/email/templates/welcome"

import { catchErr, createErr } from "@/core/lib/errors"
import { db } from "@/core/server/db"

import {
	signInSchema,
	signUpSchema,
	type SignInSchema,
	type SignUpSchema
} from "@/features/auth/server/types"

export const signUp = async (params: SignUpSchema) => {
	const validatedFields = signUpSchema.safeParse(params)

	if (!validatedFields.success) throw new Error("Invalid Fields")
	const { name, email, password } = validatedFields.data

	const [existingUser, getUserErr] = await catchErr(getUserByEmail(email), {
		message: "Error checking user existence"
	})

	if (getUserErr) throw getUserErr
	if (existingUser) {
		throw createErr({ code: "CONFLICT", message: "User already exists" })
	}

	const hashedPassword = await hash(password, 10)

	const [newUser, signUpError] = await catchErr(
		db.user.create({
			data: { name, email, password: hashedPassword }
		}),
		{ message: "Failed to create user" }
	)

	if (signUpError) throw signUpError

	// Send welcome email (don't block the response if email fails)
	if (newUser) {
		sendWelcomeEmail({
			name: newUser.name || "User",
			email: newUser.email
		}).catch(
			(error) => {
				console.error("Failed to send welcome email:", error)
			}
		)
	}

	return { success: "Signed up successfully" }
}

export const signIn = async (values: SignInSchema) => {
	const validatedFields = signInSchema.safeParse(values)

	if (!validatedFields.success) throw new Error("Invalid Fields")
	const { email, password } = validatedFields.data

	const [existingUser, getUserErr] = await catchErr(getUserByEmail(email), {
		message: "Error checking user credentials"
	})

	if (getUserErr) throw getUserErr
	if (!existingUser) {
		throw createErr({ code: "NOT_FOUND", message: "User not found" })
	}

	const [, err] = await catchErr(
		authSignIn("credentials", {
			email,
			password
		}),
		{ overrideMessage: true }
	)

	if (err) throw err

	return { success: "Signed in successfully" }
}
