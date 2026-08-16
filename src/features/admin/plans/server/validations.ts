import { array, coerce, object, string, z } from "zod"

// Base schemas
export const getPlanIdSchema = () =>
	string({ required_error: "Plan ID is required" }).uuid()

export const getPlanTypeEnumSchema = () =>
	z.enum(["EDUCATION", "GOVERNMENT"], {
		errorMap: () => ({ message: "Invalid plan type" })
	})

export const getPlanNameSchema = () =>
	string({ required_error: "Plan name is required" })
		.min(2, "Plan name must be at least 2 characters")
		.max(50, "Plan name must be less than 50 characters")

export const getPlanSlugSchema = () =>
	string({ required_error: "Slug is required" })
		.min(2, "Slug must be at least 2 characters")
		.max(50, "Slug must be less than 50 characters")
		.regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "Slug must be in kebab case")

export const getPlanMonthlyPriceSchema = () =>
	coerce
		.number({ required_error: "Monthly price is required" })
		.min(20, "Price must be greater than 20")
		.max(1000000, "Price must be less than 1,000,000")

export const getPlanStringArraySchema = (field: string) =>
	array(string().max(100, `${field} item must be less than 100 characters`), {
		required_error: `${field} is required`
	}).max(20, `${field} must have less than 20 items`)

export const getPlanHasKioskSchema = () => z.boolean().default(false)

export const getPlanIsActiveSchema = () => z.boolean().default(true)

// Create Plan Schema
export const createPlanSchema = object({
	planType: getPlanTypeEnumSchema(),
	name: getPlanNameSchema(),
	slug: getPlanSlugSchema(),
	monthlyPrice: getPlanMonthlyPriceSchema(),
	features: getPlanStringArraySchema("Features"),
	inclusions: getPlanStringArraySchema("Inclusions"),
	addons: getPlanStringArraySchema("Addons"),
	equipment: getPlanStringArraySchema("Equipment"),
	hasKiosk: getPlanHasKioskSchema(),
	isActive: getPlanIsActiveSchema()
})
export type CreatePlanSchema = z.infer<typeof createPlanSchema>

// Update Plan Schema
export const updatePlanSchema = object({
	id: getPlanIdSchema(),
	planType: getPlanTypeEnumSchema(),
	name: getPlanNameSchema(),
	slug: getPlanSlugSchema(),
	monthlyPrice: getPlanMonthlyPriceSchema(),
	features: getPlanStringArraySchema("Features"),
	inclusions: getPlanStringArraySchema("Inclusions"),
	addons: getPlanStringArraySchema("Addons"),
	equipment: getPlanStringArraySchema("Equipment"),
	hasKiosk: getPlanHasKioskSchema(),
	isActive: getPlanIsActiveSchema()
})
export type UpdatePlanSchema = z.infer<typeof updatePlanSchema>

// Delete Plan Schema
export const deletePlanSchema = object({ id: getPlanIdSchema() })
export type DeletePlanSchema = z.infer<typeof deletePlanSchema>

// Update Plan Request Status Schema
export const updatePlanRequestStatusSchema = object({
	id: string({ required_error: "Request ID is required" }).uuid(),
	status: string({ required_error: "Status is required" }).refine(
		(value) =>
			[
				"PENDING",
				"FOR_PAYMENT",
				"FOR_INSTALLATION",
				"ACTIVE",
				"SUSPENDED",
				"TERMINATED"
			].includes(value),
		{ message: "Invalid status value" }
	)
})
export type UpdatePlanRequestStatusSchema = z.infer<
	typeof updatePlanRequestStatusSchema
>

export const updateSubscriptionStatusSchema = z.object({
	id: z.string(),
	status: z.enum([
		"PENDING",
		"PROCESSING",
		"FOR_PAYMENT",
		"FOR_INSTALLATION",
		"ACTIVE",
		"SUSPENDED",
		"TERMINATED"
	])
})

export const scheduleInstallationSchema = z.object({
	id: z.string().uuid(),
	installationDate: z.string().datetime(),
	notes: z.string().optional()
})
