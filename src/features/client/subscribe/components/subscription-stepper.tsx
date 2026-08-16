"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { PaymentType } from "@prisma/client"
import { useForm } from "react-hook-form"
import type z from "zod"

import { Button } from "@/core/components/ui/button"
import { Form } from "@/core/components/ui/form"
import { defineStepper } from "@/core/components/ui/stepper"

import { BillingDetailsForm } from "@/features/client/subscribe/components/forms/billing-details-form"
import { LocationStep } from "@/features/client/subscribe/components/forms/location-step"
import { ReviewStep } from "@/features/client/subscribe/components/forms/review-step"
import { SubscriberDetailsForm } from "@/features/client/subscribe/components/forms/subscriber-details-form"
import { SummaryCard } from "@/features/client/subscribe/components/summary-card"
import { useSubscribeToPlan } from "@/features/client/subscribe/lib/hooks"
import { useGeolocation } from "@/features/client/subscribe/lib/use-geolocation"
import {
	billingSchema,
	locationSchema,
	reviewSchema,
	subscriberSchema,
	type CheckoutSchema
} from "@/features/client/subscribe/server/validations"

const { Stepper, useStepper } = defineStepper(
	{
		id: "location",
		title: "Location",
		schema: locationSchema,
		Component: LocationStep
	},
	{
		id: "subscriber",
		title: "Details",
		schema: subscriberSchema,
		Component: SubscriberDetailsForm
	},
	{
		id: "billing",
		title: "Billing",
		schema: billingSchema,
		Component: BillingDetailsForm
	},
	{
		id: "review",
		title: "Review",
		schema: reviewSchema,
		Component: ReviewStep
	}
)

export function SubscriptionStepper({ slug }: { slug: string }) {
	return (
		<Stepper.Provider variant="horizontal" labelOrientation="vertical">
			<SubscriptionStepperComponent slug={slug} />
		</Stepper.Provider>
	)
}

function SubscriptionStepperComponent({ slug }: { slug: string }) {
	const methods = useStepper()
	const { mutate: subscribeToPlan } = useSubscribeToPlan()
	const { latitude, longitude } = useGeolocation()

	// Use user's current location if available, otherwise fallback to default
	const defaultLatitude = latitude ?? 13.145947
	const defaultLongitude = longitude ?? 123.749353

	const form = useForm<CheckoutSchema>({
		mode: "onTouched",
		resolver: zodResolver(methods.current.schema as z.ZodSchema),
		values: {
			// Location step - use user's current location as default
			latitude: defaultLatitude,
			longitude: defaultLongitude,
			country: "Philippines",
			region: "Bicol Region",
			state: "Albay",
			city: "Legazpi City",
			barangay: "Legazpi City",
			postalCode: "4500",
			// Subscriber step
			clientName: "Legazpi City",
			siteAdress: "Legazpi City Hall",
			contactPerson: "Hisham Ishmael",
			contactEmail: "mayor@email.com",
			contactNumber: "09123456789",
			contactDesignation: "Mayor",
			// Billing step
			billingName: "Legazpi City",
			billingEmail: "billing@email.com",
			billingPhone: "09123456789",
			paymentType: PaymentType.CARD,
			ccNumber: "4343434343434345",
			ccExpiryMonth: 8,
			ccExpiryYear: 25,
			ccCVC: "123",
			// Review step
			isConfirmed: true
		}
	})

	const onSubmit = async () => {
		if (methods.isLast) {
			void subscribeToPlan({
				payload: form.getValues(),
				slug
			})
			methods.reset()
		} else {
			methods.next()
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<Stepper.Navigation>
					{methods.all.map((step) => (
						<Stepper.Step
							key={step.id}
							of={step.id}
							type="button"
							onClick={async () => {
								if (step.id === methods.current.id) return
								if (await form.trigger()) methods.goTo(step.id)
							}}
						>
							<Stepper.Title>{step.title}</Stepper.Title>
						</Stepper.Step>
					))}
				</Stepper.Navigation>

				<Stepper.Panel className="!mt-8 flex flex-col gap-4 md:flex-row md:flex-wrap md:gap-6">
					<div className="w-full flex-[2_1_0%] space-y-4 md:w-2/3 md:min-w-[500px]">
						{methods.switch({
							location: ({ Component }) => <Component />,
							subscriber: ({ Component }) => <Component />,
							billing: ({ Component }) => <Component />,
							review: ({ Component }) => <Component />
						})}

						<Stepper.Controls>
							{!methods.isLast && (
								<Button
									type="button"
									variant="secondary"
									onClick={methods.prev}
									disabled={methods.isFirst}
								>
									Back
								</Button>
							)}
							<Button type="submit">
								{methods.isLast ? "Confirm" : "Continue"}
							</Button>
						</Stepper.Controls>
					</div>
					<SummaryCard slug={slug} />
				</Stepper.Panel>
			</form>
		</Form>
	)
}
