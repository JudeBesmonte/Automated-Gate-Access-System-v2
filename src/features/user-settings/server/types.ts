import { z } from "zod"

// base schemas
export const getUserIdSchema = () =>
	z
		.string({ required_error: "User ID is required" })
		.min(1, "User ID is required")
		.max(50, "User ID must be less than 50 characters")

export const getImageSchema = () => z.string().optional()
export const getFileSchema = () =>
	z
		.instanceof(File)
		.refine((file) => {
			if (!file) return true
			return file.size <= 5 * 1024 * 1024 // 5MB
		}, "File size should be less than 5MB")
		.refine((file) => {
			if (!file) return true
			return ["image/jpeg", "image/png", "image/gif"].includes(file.type)
		}, "Only .jpg, .jpeg, .png and .gif formats are supported")
		.optional()

export const getNameSchema = () =>
	z
		.string({ required_error: "Name is required" })
		.min(1, "Name is required")
		.max(50, "Name must be less than 50 characters")

export const getEmailSchema = () =>
	z
		.string({ required_error: "Email is required" })
		.min(1, "Email is required")
		.email("Invalid email")

export const getPasswordSchema = () =>
	z
		.string()
		.optional()
		.refine(
			(value: string | undefined) => {
				if (!value) return true
				return value.length >= 8
			},
			{
				message: "Password must be at least 8 characters"
			}
		)
		.refine(
			(value: string | undefined) => {
				if (!value) return true
				return value.length <= 32
			},
			{
				message: "Password must be less than 32 characters"
			}
		)

// edit user profile schema
export const editUserProfileSchema = z.object({
	name: getNameSchema(),
	image: getImageSchema(),
	file: getFileSchema()
})
export type EditUserProfileSchema = z.infer<typeof editUserProfileSchema>

// edit user account schema
export const editUserEmailSchema = z.object({
	email: getEmailSchema()
})
export type EditUserEmailSchema = z.infer<typeof editUserEmailSchema>

export const editUserPasswordSchema = z.object({
	oldPassword: getPasswordSchema(),
	newPassword: getPasswordSchema(),
	confirmNewPassword: getPasswordSchema()
})
export type EditUserPasswordSchema = z.infer<typeof editUserPasswordSchema>

export const editUserAccountSchema = editUserEmailSchema
	.merge(editUserPasswordSchema)
	.refine((data) => data.newPassword === data.confirmNewPassword, {
		message: "Passwords must match",
		path: ["confirmNewPassword"]
	})
	.superRefine((data, ctx) => {
		const hasAnyPassword = Boolean(
			data.oldPassword ?? data.newPassword ?? data.confirmNewPassword
		)

		if (hasAnyPassword) {
			if (!data.oldPassword) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: "Current password is required when changing password",
					path: ["oldPassword"]
				})
			}
			if (!data.newPassword) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: "New password is required when changing password",
					path: ["newPassword"]
				})
			}
			if (!data.confirmNewPassword) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: "Password confirmation is required when changing password",
					path: ["confirmNewPassword"]
				})
			}
		}
	})

export type EditUserAccountSchema = z.infer<typeof editUserAccountSchema>
