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

interface CardFormProps {
	control: Control<PaymentFormValues>
}

export function CardForm({ control }: CardFormProps) {
	return (
		<div className="space-y-4">
			<FormField
				control={control}
				name="cardNumber"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Card Number</FormLabel>
						<FormControl>
							<Input placeholder="1234 5678 9012 3456" {...field} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				control={control}
				name="cardName"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Cardholder Name</FormLabel>
						<FormControl>
							<Input placeholder="John Doe" {...field} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<div className="grid grid-cols-3 gap-4">
				<FormField
					control={control}
					name="expiryMonth"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Month</FormLabel>
							<FormControl>
								<Input placeholder="MM" maxLength={2} {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={control}
					name="expiryYear"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Year</FormLabel>
							<FormControl>
								<Input placeholder="YYYY" maxLength={4} {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={control}
					name="cvv"
					render={({ field }) => (
						<FormItem>
							<FormLabel>CVV</FormLabel>
							<FormControl>
								<Input
									placeholder="123"
									type="password"
									maxLength={4}
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>
		</div>
	)
}
