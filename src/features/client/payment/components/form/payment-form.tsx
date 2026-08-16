"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { CheckCircle2 } from "lucide-react"
import { useForm } from "react-hook-form"

import { Button } from "@/core/components/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from "@/core/components/ui/card"
import { Form } from "@/core/components/ui/form"
import { Separator } from "@/core/components/ui/separator"

import { CardForm } from "@/features/client/payment/components/form/card-form"
import { CustomerInformation } from "@/features/client/payment/components/form/customer-information"
import { PaymentChannels } from "@/features/client/payment/components/payment-channels"
import { attachIntentMethod } from "@/features/client/payment/server/api/attachIntentMethod"
import { createPaymentMethod } from "@/features/client/payment/server/api/createpaymentMethod"
import { processPaymentStatus } from "@/features/client/payment/server/actions"
import {
	paymentSchema,
	type PaymentFormValues
} from "@/features/client/payment/server/validations"

export function PaymentForm() {
	const { paymentIntentId } = useParams()

	const [isSubmitting, setIsSubmitting] = useState(false)
	const [isSuccess, setIsSuccess] = useState(false)
	const [errorMessage, setErrorMessage] = useState<string | null>(null)

	const form = useForm<PaymentFormValues>({
		resolver: zodResolver(paymentSchema),
		defaultValues: {
			paymentMethod: "card",
			name: "",
			email: "",
			phoneNumber: "",
			cardNumber: "",
			cardName: "",
			expiryMonth: "",
			expiryYear: "",
			cvv: ""
		},
		mode: "onBlur"
	})

	const selectedPaymentMethod = form.watch("paymentMethod")

	useEffect(() => {
		form.clearErrors()
		form.reset({
			paymentMethod: selectedPaymentMethod,
			name: "",
			email: "",
			phoneNumber: "",
			cardNumber: "",
			cardName: "",
			expiryMonth: "",
			expiryYear: "",
			cvv: ""
		})
	}, [selectedPaymentMethod, form])

	async function onSubmit(values: PaymentFormValues) {
		console.log("onSubmit triggered with values:", values)
		setIsSubmitting(true)
		setErrorMessage(null)

		try {
			if (!paymentIntentId) {
				throw new Error("Payment Intent ID is missing.")
			}

			const paymentDetails =
				selectedPaymentMethod === "card"
					? {
							card_number: values.cardNumber,
							exp_month: parseInt(values.expiryMonth ?? "", 10),
							exp_year: parseInt(values.expiryYear ?? "", 10),
							cvc: values.cvv
						}
					: undefined

			const billing = {
				name: values.name ?? "",
				email: values.email,
				phone: values.phoneNumber ?? ""
			}

			console.log("Billing object:", billing)

			// Step 1: Create the payment method
			console.log("Calling createPaymentMethod...")
			const paymentMethod = await createPaymentMethod(
				paymentDetails ?? {},
				billing,
				selectedPaymentMethod
			)
			console.log("Payment method created:", paymentMethod)

			// Step 2: Attach the payment method to the payment intent
			const returnUrl = `http://localhost:3000/client/payment/payment-successful`
			console.log("Return URL:", returnUrl)

			console.log("Calling attachIntentMethod...")
			const clientKey: string | undefined =
				typeof paymentMethod.details?.client_key === "string"
					? paymentMethod.details.client_key
					: undefined

			const attachResponse = await attachIntentMethod(
				paymentIntentId as string,
				paymentMethod.id,
				clientKey,
				returnUrl
			)
			console.log("Attach Intent Response:", attachResponse)

			if (attachResponse.status === "succeeded") {
				// Payment was successful
				setIsSuccess(true)
				form.reset()

				// TODO: Replace with actual subscription ID and amount
				// You'll need to get these from subscription context or URL params
				const subscriptionId = "sample-subscription-id" // Get from context
				const amount = 1500 // Get from plan details
				
				// Send payment success email
				try {
					await processPaymentStatus({
						paymentIntentId: paymentIntentId as string,
						subscriptionId,
						status: "succeeded",
						amount,
						paymentMethod: selectedPaymentMethod,
						paymentMethodId: paymentMethod.id,
						clientKey
					})
					console.log("Payment success email sent successfully")
				} catch (emailError) {
					console.error("Failed to send payment success email:", emailError)
					// Don't fail the payment flow if email fails
				}

				// Reset success message after 3 seconds
				setTimeout(() => setIsSuccess(false), 3000)
			} else if (
				attachResponse.status === "awaiting_next_action" &&
				attachResponse.next_action
			) {
				// Handle 3D Secure or other next actions
				window.open(attachResponse.next_action.redirect.url, "_blank")
			} else {
				throw new Error("Payment failed or requires further action.")
			}
		} catch (error) {
			console.error("Error processing payment:", error)
			
			// Send payment failed email
			const subscriptionId = "sample-subscription-id" // Get from context
			const amount = 1500 // Get from plan details
			
			try {
				await processPaymentStatus({
					paymentIntentId: paymentIntentId as string,
					subscriptionId,
					status: "failed",
					amount,
					paymentMethod: selectedPaymentMethod,
					failureReason: error instanceof Error ? error.message : "Payment processing failed"
				})
				console.log("Payment failed email sent successfully")
			} catch (emailError) {
				console.error("Failed to send payment failed email:", emailError)
			}
			
			setErrorMessage("Failed to process payment. Please try again.")
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-2xl">Payment Details</CardTitle>
				<CardDescription>
					Complete your payment using your preferred method.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
						<div className="space-y-4">
							<h3 className="text-lg font-medium">Customer Information</h3>
							<CustomerInformation control={form.control} />
						</div>

						<Separator />

						<PaymentChannels control={form.control} />

						<Separator />

						{selectedPaymentMethod === "card" && (
							<h3 className="text-lg font-medium">Payment Method</h3>
						)}
						{selectedPaymentMethod === "card" && (
							<CardForm control={form.control} />
						)}

						<Button type="submit" className="w-full" disabled={isSubmitting}>
							{isSubmitting ? "Processing..." : "Pay Now"}
						</Button>
					</form>
				</Form>

				{isSuccess && (
					<div className="mt-4 flex items-center rounded-md bg-green-50 p-3 text-green-700">
						<CheckCircle2 className="mr-2 h-5 w-5" />
						Payment processed successfully! A confirmation email has been sent.
					</div>
				)}

				{errorMessage && (
					<div className="mt-4 rounded-md bg-red-50 p-3 text-red-700">
						{errorMessage}
					</div>
				)}
			</CardContent>
			<CardFooter className="flex justify-between text-sm text-muted-foreground">
				<p>Secure payment processing</p>
				<p>256-bit encryption</p>
			</CardFooter>
		</Card>
	)
}
