import { z } from "zod"

// Base schemas
export const getKiosktIdSchema = () =>
	z
		.string({ required_error: "Kiosk ID is required" })
		.min(1, "Kiosk ID is required")

export const getNameSchema = () =>
	z
		.string({ required_error: "Name is required" })
		.min(1, "Name is required")
		.max(50, "Name must be less than 50 characters")
		.trim()

export const getProjectIdSchema = () =>
	z
		.string({ required_error: "Project ID is required" })
		.min(1, "Project ID is required")

// Get kiosks by project schema
export const getKiosksByProjectSchema = z.object({
	projectId: getProjectIdSchema()
})

export type GetKiosksByProjectSchema = z.infer<typeof getKiosksByProjectSchema>

// Add kiosk schema
export const addKioskSchema = z.object({
	name: getNameSchema(),
	project_id: getProjectIdSchema()
})

export type AddKioskSchema = z.infer<typeof addKioskSchema>

// Edit kiosk schema
export const editKioskSchema = z.object({
	id: getKiosktIdSchema(),
	name: getNameSchema()
})

export type EditKioskSchema = z.infer<typeof editKioskSchema>

// Delete kiosk schema
export const deleteKioskSchema = z.object({
	id: getKiosktIdSchema()
})

export type DeleteKioskSchema = z.infer<typeof deleteKioskSchema>
