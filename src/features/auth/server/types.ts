import { boolean, string, z } from "zod"

//Base schemas
export const getNameSchema = () =>
	string({ required_error: "Name is required" })
		.min(1, "Name is required")
		.max(50, "Name must be less than 50 characters")

export const getEmailSchema = () =>
	string({ required_error: "Email is required" })
		.min(1, "Email is required")
		.email("Invalid email")

export const getPasswordSchema = () =>
	string({ required_error: "Password is required" })
		.min(8, "Password must be at least 8 characters")
		.max(32, "Password cannot exceed 32 characters")

export const getRememberMeSchema = () =>
	boolean({ required_error: "Remember me is required" })

//Sign in Schema
export const signInSchema = z.object({
	email: getEmailSchema(),
	password: getPasswordSchema(),
	rememberMe: getRememberMeSchema()
})

export type SignInSchema = z.infer<typeof signInSchema>

//Sign up Schema
export const signUpSchema = z
	.object({
		name: getNameSchema(),
		email: getEmailSchema(),
		password: getPasswordSchema(),
		confirmPassword: getPasswordSchema()
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords must match",
		path: ["confirmPassword"]
	})

export type SignUpSchema = z.infer<typeof signUpSchema>
