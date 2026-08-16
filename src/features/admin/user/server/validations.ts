import { boolean, string, z } from "zod"

//Base schemas
export const getUserIdSchema = () =>
	string({ required_error: "User ID is required" })
		.min(1, "User ID is required")
		.max(50, "User ID must be less than 50 characters")

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

export const getOptionalPasswordSchema = () =>
	string()
		.max(32, "Password cannot exceed 32 characters")
		.refine(
			(password) => !password || password.length >= 8,
			"Password must be at least 8 characters"
		)
		.optional()

export const getRememberMeSchema = () =>
	boolean({ required_error: "Remember me is required" })

export const getRoleSchema = () =>
	z.enum(["ADMIN", "CLIENT", "STAFF"], {
		required_error: "Role is required"
	})

// create user schema
export const createUserSchema = z
	.object({
		name: getNameSchema(),
		email: getEmailSchema(),
		password: getPasswordSchema(),
		confirmPassword: getPasswordSchema(),
		role: getRoleSchema()
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords must match",
		path: ["confirmPassword"]
	})

export type CreateUserSchema = z.infer<typeof createUserSchema>

// edit user schema
export const editUserSchema = z
	.object({
		id: getUserIdSchema(),
		name: getNameSchema(),
		email: getEmailSchema(),
		role: getRoleSchema(),
		password: getOptionalPasswordSchema(),
		confirmPassword: getOptionalPasswordSchema()
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords must match",
		path: ["confirmPassword"]
	})
export type EditUserSchema = z.infer<typeof editUserSchema>

// delete user schema
export const deleteUserSchema = z.object({
	id: getUserIdSchema()
})
export type DeleteUserSchema = z.infer<typeof deleteUserSchema>
