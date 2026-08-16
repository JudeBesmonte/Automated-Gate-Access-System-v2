import { useFormContext } from "react-hook-form"

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from "@/core/components/ui/card"
import { Checkbox } from "@/core/components/ui/checkbox"
import {
	FormControl,
	FormField,
	FormItem,
	FormMessage
} from "@/core/components/ui/form"
import { Label } from "@/core/components/ui/label"
import { Separator } from "@/core/components/ui/separator"

import { ReviewItem } from "@/features/client/subscribe/components/ui/review-item"
import {
	type CheckoutSchema,
	type ReviewSchema
} from "@/features/client/subscribe/server/validations"

export function ReviewStep() {
	const { getValues } = useFormContext<CheckoutSchema>()
	const values = getValues()

	return (
		<Card>
			<CardHeader className="pb-6">
				<CardTitle className="text-xl font-bold">
					Review Your Information
				</CardTitle>
				<CardDescription>
					Please review your information before submitting your order.
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				<Separator />
				<div className="space-y-6">
					<ReviewItem>
						<ReviewItem.Title>Client Information</ReviewItem.Title>
						<ReviewItem.Content>
							<ReviewItem.Field label="Client Name" value={values.clientName} />
							<ReviewItem.Field
								label="Installation Address"
								value={values.siteAdress}
							/>
						</ReviewItem.Content>
					</ReviewItem>

					<Separator />

					<ReviewItem>
						<ReviewItem.Title>Contact Person</ReviewItem.Title>
						<ReviewItem.Content>
							<ReviewItem.Field label="Name" value={values.contactPerson} />
							<ReviewItem.Field
								label="Designation"
								value={values.contactDesignation ?? "N/A"}
							/>
							<ReviewItem.Field label="Email" value={values.contactEmail} />
							<ReviewItem.Field label="Phone" value={values.contactNumber} />
						</ReviewItem.Content>
					</ReviewItem>

					<Separator />

					<ReviewItem>
						<ReviewItem.Title>Payment Method</ReviewItem.Title>
						<ReviewItem.Content>
							<ReviewItem.Field
								label="Payment Type"
								value={
									values.paymentType === "CARD"
										? "Credit Card"
										: values.paymentType
								}
							/>
							{values.paymentType === "CARD" && values.ccNumber && (
								<ReviewItem.Field
									label="Card Details"
									value={`•••• •••• •••• ${values.ccNumber.toString().slice(-4)}`}
								/>
							)}
						</ReviewItem.Content>
					</ReviewItem>
				</div>
			</CardContent>

			<Separator />

			<CardFooter className="flex items-center gap-2 pt-6">
				<CompleteStepComponent />
			</CardFooter>
		</Card>
	)
}

function CompleteStepComponent() {
	const { control } = useFormContext<ReviewSchema>()

	return (
		<FormField
			control={control}
			name="isConfirmed"
			render={({ field }) => (
				<FormItem>
					<div className="flex flex-row items-center gap-2">
						<FormControl>
							<Checkbox
								id="confirm-details"
								checked={field.value === true}
								onCheckedChange={field.onChange}
							/>
						</FormControl>
						<Label htmlFor="confirm-details" className="text-sm">
							I confirm that the above details are correct.
						</Label>
					</div>
					<FormMessage className="!mt-1 ml-6 text-xs" />
				</FormItem>
			)}
		/>
	)
}
