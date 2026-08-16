export interface PaymentIntentRes {
	data: {
		id: string
		type: "payment_intent"
		attributes: {
			amount: number
			currency: string
			description: string | null
			statement_descriptor: string | null
			status:
				| "awaiting_payment_method"
				| "awaiting_next_action"
				| "processing"
				| "succeeded"
				| "failed"
			livemode: boolean
			client_key: string
			capture_type: "automatic" | "manual"
			last_payment_error: null | {
				code: string
				message: string
			}
			original_amount: number
			payment_method_allowed: Array<
				"card" | "paymaya" | "gcash" | "grab_pay" | "dob" | "billease" | "qrph"
			>
			payments: Array<{
				id: string
				type: "payment"
				attributes: {
					access_url: null
					amount: number
					balance_transaction_id: string
					billing: {
						address: {
							city: string | null
							country: string
							line1: string
							line2: string | null
							postal_code: string | null
							state: string | null
						}
						email: string
						name: string
						phone: string
					}
					currency: string
					description: string
					disputed: boolean
					external_reference_number: string | null
					fee: number
					foreign_fee: number
					instant_settlement: null
					livemode: boolean
					net_amount: number
					origin: string
					payment_intent_id: string
					payout: null
					source: {
						id: string
						type: string
						brand?: string
						country?: string
						last4?: string
					}
					statement_descriptor: string
					status: "paid" | "pending" | "failed"
					tax_amount: null
					metadata: null
					promotion: null
					refunds: Array<unknown>
					taxes: Array<unknown>
					available_at: number
					created_at: number
					credited_at: number
					paid_at: number
					updated_at: number
				}
			}>
			next_action: null | {
				type: "redirect" | "three_d_secure_redirect" | "consume_qr"
				redirect?: {
					url: string
					return_url: string
				}
				code?: {
					id: string
					amount: number
					label: string
					image_url: string
				}
			}
			payment_method_options: {
				card: {
					request_three_d_secure: "any" | "automatic" | "none"
				}
			}
			metadata: null | Record<string, unknown>
			setup_future_usage: null | "off_session"
			created_at: number
			updated_at: number
		}
	}
}

export type PaymentMethodType =
	| "card"
	| "paymaya"
	| "gcash"
	| "grab_pay"
	| "dob"
	| "billease"
	| "qrph"

export interface PaymentMethodRes {
	data: {
		id: string
		type: "payment_method"
		attributes: {
			type: PaymentMethodType
			details: {
				last4?: string
				exp_month?: number
				exp_year?: number
				brand?: string
			}
			billing?: {
				name: string
				email: string
				phone: string
				address?: {
					line1?: string
					line2?: string
					city?: string
					state?: string
					postal_code?: string
					country?: string
				}
			}
			metadata: Record<string, unknown>
			created_at: number
			updated_at: number
		}
	}
}
