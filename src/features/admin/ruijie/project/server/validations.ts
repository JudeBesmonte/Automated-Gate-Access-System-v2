import { z } from "zod"

// base schemas
export const getProjectIdSchema = () =>
	z
		.string({ required_error: "Project ID is required" })
		.min(1, "Project ID is required")

export const getNameSchema = () =>
	z
		.string({ required_error: "Name is required" })
		.min(1, "Name is required")
		.max(50, "Name must be less than 50 characters")

export const getDescriptionSchema = () =>
	z.string().max(255, "Description must be less than 255 characters").optional()

export const getImageUrlSchema = () =>
	z.string().max(255, "Image URL must be less than 255 characters").optional()

export const getTypeSchema = () =>
	z
		.string({ required_error: "Type is required" })
		.refine((value) => ["RESIDENTIAL", "VOUCHER"].includes(value), {
			message: "Invalid project type"
		})

export const getAuthorSchema = () =>
	z
		.string({ required_error: "Author is required" })
		.min(1, "Author is required")
		.max(50, "Author must be less than 50 characters")

export const getLocationSchema = () =>
	z
		.string()
		.min(1, "Location is required")
		.max(255, "Location must be less than 250 characters")

export const getCreatedAtSchema = () =>
	z.date({ required_error: "Created at is required" })

export const getUpdatedAtSchema = () =>
	z.date({ required_error: "Updated at is required" })

// add project schema
export const addProjectSchema = z.object({
	name: getNameSchema(),
	description: getDescriptionSchema(),
	imageUrl: getImageUrlSchema(),
	type: getTypeSchema(),
	location: getLocationSchema()
})
export type AddProjectSchema = z.infer<typeof addProjectSchema>

// delete project schema
export const deleteProjectSchema = z.object({
	id: getProjectIdSchema()
})
export type DeleteProjectSchema = z.infer<typeof deleteProjectSchema>

// edit project schema
export const editProjectSchema = z.object({
	id: getProjectIdSchema(),
	name: getNameSchema(),
	description: getDescriptionSchema(),
	imageUrl: getImageUrlSchema(),
	type: getTypeSchema(),
	location: getLocationSchema()
})
export type EditProjectSchema = z.infer<typeof editProjectSchema>

// get project schema
export const getProjectSchema = z.object({
	id: getProjectIdSchema(),
	name: getNameSchema(),
	description: getDescriptionSchema(),
	imageUrl: getImageUrlSchema(),
	type: getTypeSchema(),
	location: getLocationSchema(),
	author: getAuthorSchema(),
	createdAt: getCreatedAtSchema(),
	updatedAt: getUpdatedAtSchema()
})
export type GetProjectSchema = z.infer<typeof getProjectSchema>
