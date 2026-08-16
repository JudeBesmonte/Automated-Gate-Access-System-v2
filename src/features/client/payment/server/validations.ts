import { z } from "zod"

// Shared schema for validation
export const paymentSchema = z
	.object({
		paymentMethod: z.enum(["card", "gcash", "paymaya"], {
			required_error: "Please select a payment method."
		}),
		// Contact information
		email: z.string().email({ message: "Please enter a valid email address" }),
		// Phone number required for all payment methods
		phoneNumber: z.string().refine((val) => /^(09|\+639)\d{9}$/.test(val), {
			message: "Please enter a valid Philippine mobile number"
		}),
		// Card specific fields
		cardNumber: z
			.string()
			.optional()
			.refine((val) => !val || /^\d{16}$/.test(val), {
				message: "Card number must be 16 digits"
			}),
		name: z.string().optional(),
		cardName: z.string().optional(),
		// Separate month and year fields
		expiryMonth: z
			.string()
			.optional()
			.refine((val) => !val || /^(0[1-9]|1[0-2])$/.test(val), {
				message: "Month must be between 01-12"
			}),
		expiryYear: z
			.string()
			.optional()
			.refine((val) => !val || /^\d{4}$/.test(val), {
				message: "Year must be a 4-digit number"
			}),
		cvv: z
			.string()
			.optional()
			.refine((val) => !val || /^\d{3,4}$/.test(val), {
				message: "CVV must be 3 or 4 digits"
			})
	})
	.superRefine((data, ctx) => {
		// Validate card-specific fields only for card payment method
		if (data.paymentMethod === "card") {
			if (!data.cardNumber) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: "Card number is required for card payments",
					path: ["cardNumber"]
				})
			}
			if (!data.expiryMonth || !data.expiryYear) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: "Expiry month and year are required for card payments",
					path: ["expiryMonth"]
				})
			}
			if (!data.cvv) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: "CVV is required for card payments",
					path: ["cvv"]
				})
			}
		}
	})

export type PaymentFormValues = z.infer<typeof paymentSchema>
