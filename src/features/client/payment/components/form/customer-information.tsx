import type { Control } from "react-hook-form"

import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from "@/core/components/ui/form"
import { Input } from "@/core/components/ui/input"

import { type PaymentFormValues } from "@/features/client/payment/server/validations"

interface CustomerInformationProps {
	control: Control<PaymentFormValues>
}

export function CustomerInformation({ control }: CustomerInformationProps) {
	return (
		<div className="space-y-4">
			<FormField
				control={control}
				name="name"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Name</FormLabel>
						<FormControl>
							<Input type="name" placeholder="Juan Dela Cruz" {...field} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>

			<FormField
				control={control}
				name="email"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Email Address</FormLabel>
						<FormControl>
							<Input
								type="email"
								placeholder="your.email@example.com"
								{...field}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>

			<FormField
				control={control}
				name="phoneNumber"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Phone Number</FormLabel>
						<FormControl>
							<Input placeholder="09123456789" {...field} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
		</div>
	)
}
