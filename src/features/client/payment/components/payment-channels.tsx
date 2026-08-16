"use client"

import { CreditCard, Wallet } from "lucide-react"
import type { Control } from "react-hook-form"

import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from "@/core/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/core/components/ui/radio-group"

import { type PaymentFormValues } from "@/features/client/payment/server/validations"

interface PaymentChannelsProps {
	control: Control<PaymentFormValues>
}

export function PaymentChannels({ control }: PaymentChannelsProps) {
	return (
		<FormField
			control={control}
			name="paymentMethod"
			render={({ field }) => (
				<FormItem className="space-y-3">
					<FormLabel>Payment Method</FormLabel>
					<FormControl>
						<RadioGroup
							onValueChange={(value) => {
								console.log("Payment Method Changed:", value) // Debugging log
								field.onChange(value)
							}}
							defaultValue={field.value}
							className="grid grid-cols-3 gap-4"
						>
							<FormItem>
								<FormControl>
									<RadioGroupItem
										value="card"
										className="peer sr-only"
										id="card"
									/>
								</FormControl>
								<FormLabel
									htmlFor="card"
									className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
								>
									<CreditCard className="mb-3 h-6 w-6" />
									Card
								</FormLabel>
							</FormItem>
							<FormItem>
								<FormControl>
									<RadioGroupItem
										value="gcash"
										className="peer sr-only"
										id="gcash"
									/>
								</FormControl>
								<FormLabel
									htmlFor="gcash"
									className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
								>
									<Wallet className="mb-3 h-6 w-6 text-blue-600" />
									GCash
								</FormLabel>
							</FormItem>
							<FormItem>
								<FormControl>
									<RadioGroupItem
										value="paymaya"
										className="peer sr-only"
										id="paymaya"
									/>
								</FormControl>
								<FormLabel
									htmlFor="paymaya"
									className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
								>
									<Wallet className="mb-3 h-6 w-6 text-purple-600" />
									PayMaya
								</FormLabel>
							</FormItem>
						</RadioGroup>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}
