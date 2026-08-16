"use server"

import {
	attachToPaymentIntent,
	createPaymentIntent,
	createPaymentMethod
} from "@/services/paymongo/server/actions"
import { sendSubscriptionRequestEmail } from "@/services/email/templates/subscription-request"
import { sendPaymentSuccessEmail, sendPaymentFailedEmail } from "@/services/email/templates"

import { guard } from "@/core/lib/auth-guard"
import { catchErr } from "@/core/lib/errors"
import { db } from "@/core/server/db"

import { type CheckoutSchema } from "@/features/client/subscribe/server/validations"

// -- Create Subscription --
export const subscribeToPlan = guard
	.roles(["CLIENT", "ADMIN"])
	.schema<{ payload: CheckoutSchema; slug: string }>()
	.action(async ({ session, payload, slug }) => {
		const [plan, err] = await catchErr(
			db.plan.findUnique({
				where: { slug }
			})
		)

		if (err) throw err
		if (!plan) throw new Error("Plan not found")

		// const { data: paymentIntent } = await createPaymentIntent({
		// 	name: plan.name,
		// 	price: plan.monthlyPrice
		// })

		// const { data: paymentMethod } = await createPaymentMethod({
		// 	payload: payload
		// })

		// const { data: attachedPaymentMethod } = await attachToPaymentIntent({
		// 	paymentIntentId: paymentIntent.id,
		// 	paymentMethodId: paymentMethod.id,
		// 	clientKey: paymentIntent.attributes.client_key,
		// 	returnUrl: "https://localhost:3000/admin/client"
		// })

		const subscription = await db.subscription.create({
			data: {
				planType: plan.planType,
				billingInterval: plan.billingInterval,
				price: plan.monthlyPrice,
				discount: plan.discount,
				subscriptionStatus: "FOR_PAYMENT",

				subscriberDetail: {
					create: {
						clientName: payload.clientName,
						siteAddress: payload.siteAdress,
						contactPerson: payload.contactPerson,
						contactEmail: payload.contactEmail,
						contactNumber: payload.contactNumber,
						contactDesignation: payload.contactDesignation
					}
				},
				billingDetail: {
					create: {
						billingName: payload.billingName,
						billingEmail: payload.billingEmail,
						billingPhone: payload.billingPhone
					}
				},

				plan: {
					connect: { id: plan.id }
				},
				subscriber: {
					connect: { id: session!.user.id }
				}
			}
		})

		// Send subscription request email immediately
		if (subscription && session?.user) {
			sendSubscriptionRequestEmail({
				name: payload.contactPerson || session.user.name || "User",
				email: payload.contactEmail,
				planName: plan.name,
				price: plan.monthlyPrice,
				subscriptionId: subscription.id
			}).catch((emailError) => {
				console.error("Failed to send subscription request email:", emailError)
			})

			// TEST: Send payment success email to see the template
			// sendPaymentSuccessEmail({
			// 	name: payload.contactPerson || session.user.name || "User",
			// 	email: payload.contactEmail,
			// 	amount: plan.monthlyPrice,
			// 	paymentMethod: payload.paymentType,
			// 	transactionId: `test-txn-${subscription.id}`,
			// 	subscriptionName: plan.name
			// }).catch((emailError) => {
			// 	console.error("Failed to send test payment success email:", emailError)
			// })

			// TEST: Send payment failed email to see the template
			// sendPaymentFailedEmail({
			// 	name: payload.contactPerson || session.user.name || "User",
			// 	email: payload.contactEmail,
			// 	amount: plan.monthlyPrice,
			// 	paymentMethod: payload.paymentType,
			// 	transactionId: `test-failed-txn-${subscription.id}`,
			// 	subscriptionName: plan.name,
			// 	failureReason: "Insufficient funds - This is a test email"
			// }).catch((emailError) => {
			// 	console.error("Failed to send test payment failed email:", emailError)
			// })
		}

		return { subscription }


	})
