"use server"

import { guard } from "@/core/lib/auth-guard"
import { catchErr } from "@/core/lib/errors"
import { db } from "@/core/server/db"
import { sendPaymentSuccessEmail, sendPaymentFailedEmail } from "@/services/email/templates"
import type { PaymentStatus, PaymentType } from "@prisma/client"
import { initializeBillingCycle } from "@/core/lib/billing-service"

export const getPlanDetails = guard
	.roles(["CLIENT"])
	.schema<{ slug: string }>()
	.action(async ({ slug }) => {
		const plan = await db.plan.findUnique({
			where: { slug }
		})
		return { plan }
	})

// Process payment status and send appropriate email
export const processPaymentStatus = guard
	.schema<{
		paymentIntentId: string
		subscriptionId: string
		status: "succeeded" | "failed"
		amount: number
		paymentMethod: string
		failureReason?: string
		paymentMethodId?: string
		clientKey?: string
	}>()
	.action(async ({
		session,
		paymentIntentId,
		subscriptionId,
		status,
		amount,
		paymentMethod,
		failureReason,
		paymentMethodId,
		clientKey
	}) => {
		try {
			// Get subscription details
			const subscription = await db.subscription.findUnique({
				where: { id: subscriptionId },
				include: {
					subscriber: { select: { name: true, email: true } },
					plan: { select: { name: true } },
					subscriberDetail: true,
					billingDetail: true
				}
			})

			if (!subscription) {
				throw new Error("Subscription not found")
			}

			// Map PayMongo status to our PaymentStatus enum
			const paymentStatus: PaymentStatus = status === "succeeded" ? "SUCCESS" : "FAILED"

			// Map payment method to our PaymentType enum
			const getPaymentType = (method: string): PaymentType => {
				const normalizedMethod = method.toUpperCase()
				switch (normalizedMethod) {
					case 'CARD':
						return 'CARD'
					case 'GCASH':
						return 'GCASH'
					case 'PAYMAYA':
						return 'PAYMAYA'
					case 'QRPH':
						return 'QRPH'
					default:
						return 'CARD' // fallback
				}
			}

			// Create payment history record
			const [paymentHistory, paymentError] = await catchErr(
				db.paymentHistory.create({
					data: {
						type: getPaymentType(paymentMethod),
						amount,
						paymentDate: new Date(),
						description: `Payment for ${subscription.plan.name}`,
						status: paymentStatus,
						billingName: subscription.billingDetail.billingName,
						billingEmail: subscription.billingDetail.billingEmail,
						billingPhone: subscription.billingDetail.billingPhone,
						paymentIntentId,
						clientKey: clientKey || "",
						subscriptionId
					}
				})
			)

			if (paymentError) {
				console.error("Error creating payment history:", paymentError)
				throw paymentError
			}

			// Prepare email data
			const emailData = {
				name: subscription.subscriber.name || "User",
				email: subscription.subscriber.email,
				amount,
				paymentMethod: paymentMethod.toUpperCase(),
				transactionId: paymentHistory.id,
				paymentDate: new Date().toLocaleDateString('en-US', {
					year: 'numeric',
					month: 'long',
					day: 'numeric'
				}),
				subscriptionName: subscription.plan.name
			}

			if (status === "succeeded") {
				// Update subscription status to ACTIVE if payment succeeded
				await db.subscription.update({
					where: { id: subscriptionId },
					data: { subscriptionStatus: "ACTIVE" }
				})

				// Initialize billing cycle
				try {
					await initializeBillingCycle(subscriptionId)
					console.log(`Billing cycle initialized for subscription ${subscriptionId}`)
				} catch (billingError) {
					console.error("Failed to initialize billing cycle:", billingError)
					// Don't throw - payment success should still proceed
				}

				// Send success email
				await sendPaymentSuccessEmail(emailData).catch((emailError) => {
					console.error("Failed to send payment success email:", emailError)
				})
			} else {
				// Send failure email
				await sendPaymentFailedEmail({
					...emailData,
					failureReason: failureReason || "Payment processing failed"
				}).catch((emailError) => {
					console.error("Failed to send payment failed email:", emailError)
				})
			}

			return { success: true, paymentHistory, status: paymentStatus }
		} catch (error) {
			console.error("Error processing payment status:", error)
			throw error
		}
	})

// Create a webhook endpoint handler (if needed)
export const handlePaymentWebhook = async (webhookData: any) => {
	try {
		// This would be called from an API route to handle PayMongo webhooks
		const { type, data } = webhookData

		if (type === 'payment_intent.succeeded' || type === 'payment_intent.payment_failed') {
			const paymentIntent = data.attributes
			const paymentIntentId = data.id

			// You would need to find the related subscription based on metadata or payment intent ID
			// This is where you'd call processPaymentStatus with the webhook data

			console.log('Payment webhook received:', type, paymentIntentId)

			// Implementation would depend on how you associate payment intents with subscriptions
			// You might store this association when creating the payment intent
		}

		return { success: true }
	} catch (error) {
		console.error("Error handling payment webhook:", error)
		throw error
	}
}
