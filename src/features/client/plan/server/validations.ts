import { z } from "zod"

// base schemas
export const getBillingInfoIdSchema = () =>
	z
		.string({ required_error: "Billing Info ID is required" })
		.min(1, "Billing Info ID is required")

export const getCompanyNameSchema = () =>
	z
		.string({ required_error: "Company Name is required" })
		.min(1, "Company Name is required")
		.max(255, "Company Name must be less than 255 characters")

export const getOfficeAddressSchema = () =>
	z
		.string({ required_error: "Office Address is required" })
		.min(1, "Office Address is required")
		.max(255, "Office Address must be less than 255 characters")

export const getContactNumberSchema = () =>
	z.string().max(20, "Contact Number must be less than 20 characters")

export const getContactPersonSchema = () =>
	z
		.string()
		.max(255, "Contact Person must be less than 255 characters")
		.optional()

export const getDesignationSchema = () =>
	z.string().max(255, "Designation must be less than 255 characters").optional()

export const getEmailAddressSchema = () =>
	z
		.string()
		.email("Invalid email address")
		.max(255, "Email Address must be less than 255 characters")

export const getUserIdSchema = () =>
	z
		.string({ required_error: "User ID is required" })
		.min(1, "User ID is required")

// add billing info schema
export const addBillingInfoSchema = z.object({
	companyName: getCompanyNameSchema(),
	officeAddress: getOfficeAddressSchema(),
	contactPerson: getContactPersonSchema(),
	designation: getDesignationSchema(),
	contactNumber: getContactNumberSchema(),
	emailAddress: getEmailAddressSchema()
})
export type AddBillingInfoSchema = z.infer<typeof addBillingInfoSchema>

// delete billing info schema
export const deleteBillingInfoSchema = z.object({
	id: getBillingInfoIdSchema()
})
export type DeleteBillingInfoSchema = z.infer<typeof deleteBillingInfoSchema>

// edit billing info schema
export const editBillingInfoSchema = z.object({
	id: getBillingInfoIdSchema(),
	companyName: getCompanyNameSchema(),
	officeAddress: getOfficeAddressSchema(),
	contactPerson: getContactPersonSchema(),
	designation: getDesignationSchema(),
	contactNumber: getContactNumberSchema(),
	emailAddress: getEmailAddressSchema(),
	userId: getUserIdSchema()
})
export type EditBillingInfoSchema = z.infer<typeof editBillingInfoSchema>

// get billing info schema
export const getBillingInfoSchema = z.object({
	id: getBillingInfoIdSchema(),
	companyName: getCompanyNameSchema(),
	officeAddress: getOfficeAddressSchema(),
	contactPerson: getContactPersonSchema(),
	designation: getDesignationSchema(),
	contactNumber: getContactNumberSchema(),
	emailAddress: getEmailAddressSchema(),
	userId: getUserIdSchema()
})
export type GetBillingInfoSchema = z.infer<typeof getBillingInfoSchema>

export const getPlanRequestIdSchema = () =>
	z
		.string({ required_error: "Plan ID is required" })
		.min(1, "Plan Request ID is required")

export const getPlanNameSchema = () =>
	z
		.string({ required_error: "Plan Name is required" })
		.min(1, "Plan Name is required")

// get plan request schema
export const getPlanRequestSchema = z.object({
	id: getPlanRequestIdSchema(),
	billingInfoId: getBillingInfoIdSchema(),
	planName: getPlanNameSchema(),
	createdAt: z.date({ required_error: "Creation Date is required" }),
	status: z.enum(["pending", "approved", "rejected"], {
		required_error: "Status is required"
	})
})
export type GetPlanRequestSchema = z.infer<typeof getPlanRequestSchema>

// plan form schema
export const planFormSchema = z.object({
	planId: z.string().min(1, "Plan ID is required"),
	price: z.string().min(1, "Price is required")
})
export type PlanFormSchema = z.infer<typeof planFormSchema>
