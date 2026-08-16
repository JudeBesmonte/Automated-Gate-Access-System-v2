import { useFormContext } from "react-hook-form"

import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from "@/core/components/ui/form"
import { Input } from "@/core/components/ui/input"

import { CheckoutStepCard } from "@/features/client/subscribe/components/ui/checkout-step-card"
import { type SubscriberSchema } from "@/features/client/subscribe/server/validations"

export function SubscriberDetailsForm() {
	return (
		<>
			<ClientInformationCard />
			<ContactPersonCard />
		</>
	)
}

function ClientInformationCard() {
	const { control } = useFormContext<SubscriberSchema>()

	return (
		<CheckoutStepCard title="Client Information">
			<FormField
				control={control}
				name="clientName"
				render={({ field }) => (
					<FormItem>
						<FormLabel className="text-foreground">Name</FormLabel>
						<FormControl>
							<Input
								type="text"
								placeholder="Local Government Unit"
								autoComplete="name"
								{...field}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				control={control}
				name="siteAdress"
				render={({ field }) => (
					<FormItem>
						<FormLabel className="text-foreground">Site Address</FormLabel>
						<FormControl>
							<Input
								type="text"
								placeholder="123 Main St, Anytown, USA"
								autoComplete="address"
								{...field}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
		</CheckoutStepCard>
	)
}

function ContactPersonCard() {
	const { control } = useFormContext<SubscriberSchema>()
	return (
		<CheckoutStepCard title="Contact Person Card">
			<div className="flex flex-row gap-4">
				<FormField
					control={control}
					name="contactPerson"
					render={({ field }) => (
						<FormItem className="flex-1">
							<FormLabel className="text-foreground">Contact Person</FormLabel>
							<FormControl>
								<Input
									type="text"
									placeholder="Juan Dela Cruz"
									autoComplete="name"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={control}
					name="contactDesignation"
					render={({ field }) => (
						<FormItem className="flex-1">
							<FormLabel className="text-foreground">
								Contact Designation
							</FormLabel>
							<FormControl>
								<Input
									type="text"
									placeholder="Manager"
									autoComplete="designation"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>

			<div className="flex flex-row gap-4">
				<FormField
					control={control}
					name="contactNumber"
					render={({ field }) => (
						<FormItem className="flex-1">
							<FormLabel className="text-foreground">Contact Number</FormLabel>
							<FormControl>
								<Input
									type="text"
									placeholder="09123456789"
									autoComplete="number"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={control}
					name="contactEmail"
					render={({ field }) => (
						<FormItem className="flex-1">
							<FormLabel className="text-foreground">Contact Email</FormLabel>
							<FormControl>
								<Input
									type="email"
									placeholder="juan@example.com"
									autoComplete="email"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>
		</CheckoutStepCard>
	)
}
