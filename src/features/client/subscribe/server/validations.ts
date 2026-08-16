import { PaymentType } from "@prisma/client"
import { boolean, nativeEnum, number, object, string, z } from "zod"

// Base schemas
const phoneRegex = new RegExp(
	/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
)

export const getClientNameSchema = () =>
	string({ required_error: "Client name is required" })
		.min(2, "Client name must be at least 2 characters")
		.max(50, "Client name must be less than 50 characters")
export const getSiteAddressSchema = () =>
	string({ required_error: "Site address is required" })
		.min(1, "Site address is required")
		.max(255, "Site address must be less than 255 characters")
export const getContactPersonSchema = () =>
	string({ required_error: "Contact person is required" })
		.min(2, "Contact person must be at least 2 characters")
		.max(50, "Contact person must be less than 50 characters")
export const getContactEmailSchema = () =>
	string({ required_error: "Contact email is required" })
		.min(1, "Contact email is required")
		.email("Invalid email")
export const getContactNumberSchema = () =>
	string({ required_error: "Contact number is required" }).regex(
		phoneRegex,
		"Invalid Number!"
	)
export const getContactDesignationSchema = () =>
	string({ required_error: "Contact designation is required" })
		.min(2, "Contact designation must be at least 2 characters")
		.max(50, "Contact designation must be less than 50 characters")

export const getBillingNameSchema = () =>
	string({ required_error: "Billing name is required" })
		.min(2, "Billing name must be at least 2 characters")
		.max(50, "Billing name must be less than 50 characters")
export const getBillingEmailSchema = () =>
	string({ required_error: "Billing email is required" })
		.min(1, "Billing email is required")
		.email("Invalid email")
export const getBillingPhoneSchema = () =>
	string().regex(phoneRegex, "Invalid Number!")
export const getPaymentTypeSchema = () =>
	nativeEnum(PaymentType, {
		errorMap: (issue) => ({
			message:
				issue.code === "invalid_type"
					? "Payment type is required"
					: "Invalid payment type"
		})
	})

export const getCCNumberSchema = () =>
	string().refine((val) => !val || /^\d{16}$/.test(val), {
		message: "Card number must be 16 digits"
	})

export const getCCExpiryMonthSchema = () =>
	number()
		.int("Month must be an integer")
		.min(1, "Month must be between 1-12")
		.max(12, "Month must be between 1-12")

export const getCCExpiryYearSchema = () => {
	const currentYear = new Date().getFullYear() % 100
	return number()
		.int("Year must be an integer")
		.min(currentYear, "Card is expired")
		.max(currentYear + 50, "Year cannot be more than 50 years in the future")
}

export const getCCCVCSchema = () =>
	string().refine((val) => !val || /^\d{3}$/.test(val), {
		message: "CVC must be 3 digits"
	})

export const locationSchema = object({
	country: string().min(1, "Country is required"),
	region: string().min(1, "Region is required"),
	state: string().min(1, "State/Province is required"),
	city: string().min(1, "City is required"),
	barangay: string(),
	postalCode: string(),
	latitude: number({ required_error: "Latitude is required" }).min(-90).max(90),
	longitude: number({ required_error: "Longitude is required" })
		.min(-180)
		.max(180)
})

export const subscriberSchema = object({
	clientName: getClientNameSchema(),
	siteAdress: getSiteAddressSchema(),

	contactPerson: getContactPersonSchema(),
	contactEmail: getContactEmailSchema(),
	contactNumber: getContactNumberSchema(),
	contactDesignation: getContactDesignationSchema()
})

const billingFields = {
	billingName: getBillingNameSchema(),
	billingEmail: getBillingEmailSchema(),
	billingPhone: getBillingPhoneSchema(),
	paymentType: getPaymentTypeSchema(),
	ccNumber: getCCNumberSchema().optional(),
	ccExpiryMonth: getCCExpiryMonthSchema().optional(),
	ccExpiryYear: getCCExpiryYearSchema().optional(),
	ccCVC: getCCCVCSchema().optional()
}

const baseBillingSchema = object(billingFields).refine(
	(data) => {
		if (data.paymentType !== "CARD") return true
		return !!(
			data.ccNumber &&
			data.ccExpiryMonth &&
			data.ccExpiryYear &&
			data.ccCVC
		)
	},
	{
		message: "Card details are required for card payments",
		path: ["ccNumber"] // Show error on first card field
	}
)

export const billingSchema = baseBillingSchema.superRefine((data, ctx) => {
	const now = new Date()
	if (
		data.paymentType === "CARD" &&
		data.ccExpiryMonth &&
		data.ccExpiryYear &&
		data.ccExpiryYear === now.getFullYear() % 100 &&
		data.ccExpiryMonth < now.getMonth() + 1
	) {
		ctx.addIssue({
			path: ["ccExpiryMonth"],
			code: z.ZodIssueCode.custom,
			message: "Card is expired"
		})
	}
})

export const reviewSchema = object({
	isConfirmed: boolean().refine((val) => val, {
		message: "You must confirm the order"
	})
})

export const checkoutSchema = object({
	...locationSchema.shape,
	...subscriberSchema.shape,
	...billingFields,
	...reviewSchema.shape
})

export type LocationSchema = z.infer<typeof locationSchema>
export type SubscriberSchema = z.infer<typeof subscriberSchema>
export type BillingSchema = z.infer<typeof billingSchema>
export type ReviewSchema = z.infer<typeof reviewSchema>
export type CheckoutSchema = z.infer<typeof checkoutSchema>
