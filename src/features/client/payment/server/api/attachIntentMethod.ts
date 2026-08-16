import axios from "axios"

import { handleApiError } from "@/features/client/payment/server/errorHandler"

const PAYMONGO_SECRET_KEY = process.env.PAYMONGO_SECRET_KEY

if (!PAYMONGO_SECRET_KEY) {
	throw new Error(
		"PAYMONGO_SECRET_KEY is not set in the environment variables."
	)
}

/**
 * @param intentId
 * @param methodId
 * @param clientKey
 * @returns {Promise<{ status: string; next_action?: { redirect: { url: string } } }>}
 */
export const attachIntentMethod = async (
	intentId: string,
	methodId: string,
	clientKey: string | undefined,
	returnUrl: string
): Promise<{ status: string; next_action?: { redirect: { url: string } } }> => {
	try {
		const response = await axios.post(
			`https://api.paymongo.com/v1/payment_intents/${intentId}/attach`,
			{
				data: {
					attributes: {
						payment_method: methodId,
						client_key: clientKey ?? undefined,
						return_url: returnUrl
					}
				}
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

		interface PaymentIntentResponse {
			data: {
				data: {
					attributes: {
						status: string
						next_action?: { redirect: { url: string } }
					}
				}
			}
		}

		const paymentIntentResponse = response as PaymentIntentResponse
		const paymentIntent = paymentIntentResponse.data.data
		const paymentIntentStatus = paymentIntent.attributes.status

		console.log("Payment Intent attached successfully:", paymentIntent)

		return {
			status: paymentIntentStatus,
			next_action: paymentIntent.attributes.next_action
		}
	} catch (error) {
		handleApiError(error, "Error attaching payment method to intent")
		throw error
	}
}
