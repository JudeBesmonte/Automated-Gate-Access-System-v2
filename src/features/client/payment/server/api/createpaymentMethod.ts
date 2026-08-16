import axios from "axios"

import { handleApiError } from "@/features/client/payment/server/errorHandler"

const PAYMONGO_SECRET_KEY = process.env.PAYMONGO_SECRET_KEY

if (!PAYMONGO_SECRET_KEY) {
	throw new Error(
		"PAYMONGO_SECRET_KEY is not set in the environment variables."
	)
}

/**
 * @param paymentDetails
 * @param billing
 * @param paymentType
 * @returns {Promise<{ id: string; type: string; details: Record<string, unknown> }>}
 */
export const createPaymentMethod = async (
	paymentDetails: {
		card_number?: string
		exp_month?: number
		exp_year?: number
		cvc?: string
	},
	billing: {
		name: string
		email: string
		phone: string
	},
	paymentType: "card" | "gcash" | "paymaya" | "qrph"
): Promise<{ id: string; type: string; details: Record<string, unknown> }> => {
	try {
		const attributes: Record<string, unknown> = { type: paymentType }

		if (paymentType === "card") {
			attributes.details = {
				card_number: paymentDetails.card_number,
				exp_month: paymentDetails.exp_month,
				exp_year: paymentDetails.exp_year,
				cvc: paymentDetails.cvc
			}
			attributes.billing = {
				name: billing.name,
				email: billing.email,
				phone: billing.phone
			}
		} else if (
			paymentType === "gcash" ||
			paymentType === "paymaya" ||
			paymentType === "qrph"
		) {
			attributes.billing = {
				name: billing.name,
				email: billing.email,
				phone: billing.phone
			}
		}

		interface PayMongoResponse {
			data: {
				id: string
				attributes: {
					type: string
					details: Record<string, unknown>
				}
			}
		}

		const response = await axios.post<PayMongoResponse>(
			"https://api.paymongo.com/v1/payment_methods",
			{
				data: { attributes }
			},
			{
				headers: {
					"Authorization": `Basic ${Buffer.from(PAYMONGO_SECRET_KEY + ":").toString("base64")}`,
					"Content-Type": "application/json"
				}
			}
		)

		if (response.status >= 400) {
			throw new Error(`PayMongo API error: ${response.statusText}`)
		}

		const { id, attributes: responseAttributes } = response.data.data

		return {
			id,
			type: responseAttributes.type,
			details: responseAttributes.details
		}
	} catch (error) {
		handleApiError(error, "Error creating payment method")
		throw error
	}
}
