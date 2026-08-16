import { NextRequest, NextResponse } from "next/server"
import { headers } from "next/headers"
import { db } from "@/core/server/db"
import { sendPaymentSuccessEmail, sendPaymentFailedEmail } from "@/services/email/templates"
import type { PaymentStatus, PaymentType } from "@prisma/client"
import { initializeBillingCycle } from '@/core/lib/billing-service'

// PayMongo webhook event types
interface PaymentWebhookData {
    data: {
        id: string
        type: string
        attributes: {
            type: string
            livemode: boolean
            data: {
                id: string
                type: "payment_intent"
                attributes: {
                    amount: number
                    currency: string
                    description: string
                    status: "succeeded" | "failed" | "awaiting_payment_method" | "awaiting_next_action" | "processing"
                    last_payment_error?: {
                        code: string
                        message: string
                    }
                    metadata?: Record<string, string>
                    payments?: Array<{
                        id: string
                        attributes: {
                            amount: number
                            source: {
                                type: string
                                brand?: string
                            }
                            billing: {
                                name: string
                                email: string
                                phone: string
                            }
                        }
                    }>
                }
            }
        }
    }
}

const getPaymentType = (sourceType: string): PaymentType => {
    const normalizedType = sourceType.toUpperCase()
    switch (normalizedType) {
        case 'CARD':
            return 'CARD'
        case 'GCASH':
            return 'GCASH'
        case 'PAYMAYA':
            return 'PAYMAYA'
        case 'QRPH':
            return 'QRPH'
        default:
            return 'CARD'
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json() as PaymentWebhookData
        const headersList = await headers()

        // TODO: Verify webhook signature for security
        // const signature = headersList.get('paymongo-signature')
        // if (!verifyWebhookSignature(body, signature)) {
        //     return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
        // }

        const { data } = body
        const eventType = data.attributes.type

        console.log('Payment webhook received:', eventType, data.id)

        if (eventType === 'payment_intent.succeeded' || eventType === 'payment_intent.payment_failed') {
            const paymentIntent = data.attributes.data
            const paymentIntentId = paymentIntent.id
            const status = paymentIntent.attributes.status
            const amount = paymentIntent.attributes.amount / 100 // Convert from cents

            // Get payment details from the first payment if available
            const payment = paymentIntent.attributes.payments?.[0]
            const billing = payment?.attributes.billing
            const paymentSource = payment?.attributes.source

            if (!billing) {
                console.error('No billing information found in payment webhook')
                return NextResponse.json({ error: 'No billing information' }, { status: 400 })
            }

            // Try to find subscription by payment intent ID or metadata
            // You might need to store this association when creating the payment intent
            let subscription = null

            // Method 1: Check if payment intent ID is stored in subscription metadata
            subscription = await db.subscription.findFirst({
                where: {
                    // Assuming you store payment intent ID in a field
                    // You might need to add this field to your schema
                    // paymentIntentId: paymentIntentId
                },
                include: {
                    subscriber: { select: { name: true, email: true } },
                    plan: { select: { name: true } },
                    billingDetail: true
                }
            })

            // Method 2: Find by billing email if no direct association
            if (!subscription) {
                subscription = await db.subscription.findFirst({
                    where: {
                        billingDetail: {
                            billingEmail: billing.email
                        },
                        subscriptionStatus: "FOR_PAYMENT" // Only pending payments
                    },
                    include: {
                        subscriber: { select: { name: true, email: true } },
                        plan: { select: { name: true } },
                        billingDetail: true
                    },
                    orderBy: {
                        createdAt: 'desc'
                    }
                })
            }

            if (!subscription) {
                console.error('No subscription found for payment intent:', paymentIntentId)
                return NextResponse.json({ error: 'Subscription not found' }, { status: 404 })
            }

            // Map status to our enum
            const paymentStatus: PaymentStatus = status === 'succeeded' ? 'SUCCESS' : 'FAILED'
            const paymentType = getPaymentType(paymentSource?.type || 'card')

            // Create payment history record
            const paymentHistory = await db.paymentHistory.create({
                data: {
                    type: paymentType,
                    amount,
                    paymentDate: new Date(),
                    description: `Payment for ${subscription.plan.name}`,
                    status: paymentStatus,
                    billingName: billing.name,
                    billingEmail: billing.email,
                    billingPhone: billing.phone,
                    paymentIntentId,
                    clientKey: "", // Not available in webhook
                    subscriptionId: subscription.id
                }
            })

            // Prepare email data
            const emailData = {
                name: billing.name,
                email: billing.email,
                amount,
                paymentMethod: paymentType,
                transactionId: paymentHistory.id,
                paymentDate: new Date().toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                }),
                subscriptionName: subscription.plan.name
            }

            if (status === 'succeeded') {
                // Update subscription status to ACTIVE
                await db.subscription.update({
                    where: { id: subscription.id },
                    data: { subscriptionStatus: "ACTIVE" }
                })

                // 🆕 Initialize billing cycle
                try {
                    await initializeBillingCycle(subscription.id)
                    console.log(`Billing cycle initialized for subscription ${subscription.id}`)
                } catch (billingError) {
                    console.error("Failed to initialize billing cycle:", billingError)
                    // Don't throw - payment success should still proceed
                }

                // Send success email
                await sendPaymentSuccessEmail(emailData).catch((error) => {
                    console.error('Failed to send payment success email:', error)
                })

                console.log('Payment success processed and email sent')
            } else {
                // Send failure email
                const failureReason = paymentIntent.attributes.last_payment_error?.message || 'Payment processing failed'

                await sendPaymentFailedEmail({
                    ...emailData,
                    failureReason
                }).catch((error) => {
                    console.error('Failed to send payment failed email:', error)
                })

                console.log('Payment failure processed and email sent')
            }

            return NextResponse.json({
                success: true,
                paymentHistoryId: paymentHistory.id,
                status: paymentStatus
            })
        }

        return NextResponse.json({ message: 'Event not handled' })
    } catch (error) {
        console.error('Webhook error:', error)
        return NextResponse.json(
            { error: 'Webhook processing failed' },
            { status: 500 }
        )
    }
} 