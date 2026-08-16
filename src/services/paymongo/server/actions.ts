"use server"

import type {
	PaymentIntentRes,
	PaymentMethodRes
} from "@/services/paymongo/server/types"

import { type CheckoutSchema } from "@/features/client/subscribe/server/validations"

const PAYMONGO_API = "https://api.paymongo.com/v1"
const AUTHORIZATION = `Basic ${Buffer.from(process.env.PAYMONGO_SECRET_KEY + ":").toString("base64")}`

// -- Create Payment Intent --
export const createPaymentIntent = async ({
	name,
	price
}: {
	name: string
	price: number
}) => {
	const url = `${PAYMONGO_API}/payment_intents`

	return (await fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Authorization": AUTHORIZATION
		},
		body: JSON.stringify({
			data: {
				attributes: {
					amount: price * 100,
					payment_method_allowed: ["card", "qrph", "gcash", "paymaya"],
					payment_method_options: { card: { request_three_d_secure: "any" } },
					currency: "PHP",
					capture_type: "automatic",
					description: name,
					statement_descriptor: "Quanby IT Solutions"
				}
			}
		})
	}).then((res) => res.json())) as PaymentIntentRes
}

// -- Create Payment Method --
export const createPaymentMethod = async ({
	payload
}: {
	payload: CheckoutSchema
}) => {
	const url = `${PAYMONGO_API}/payment_methods`

	return (await fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Authorization": AUTHORIZATION
		},
		body: JSON.stringify({
			data: {
				attributes: {
					type: payload.paymentType.toLowerCase(),
					details: {
						card_number: payload.ccNumber,
						exp_month: payload.ccExpiryMonth,
						exp_year: payload.ccExpiryYear,
						cvc: payload.ccCVC
					},
					billing: {
						name: payload.billingName,
						email: payload.billingEmail,
						phone: payload.billingPhone,
						address: {
							line1: payload.siteAdress,
							country: "PH"
						}
					}
				}
			}
		})
	}).then((res) => res.json())) as PaymentMethodRes
}

// -- Attach Payment Method to Payment Intent --
export const attachToPaymentIntent = async ({
	paymentIntentId,
	paymentMethodId,
	clientKey,
	returnUrl
}: {
	paymentIntentId: string
	paymentMethodId: string
	clientKey: string
	returnUrl: string
}) => {
	const url = `${PAYMONGO_API}/payment_intents/${paymentIntentId}/attach`

	return (await fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Basic ${Buffer.from(process.env.PAYMONGO_SECRET_KEY + ":").toString("base64")}`
		},
		body: JSON.stringify({
			data: {
				attributes: {
					payment_method: paymentMethodId,
					client_key: clientKey,
					return_url: returnUrl
				}
			}
		})
	}).then((res) => res.json())) as PaymentIntentRes
}
