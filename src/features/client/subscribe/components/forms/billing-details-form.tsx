import { PaymentType } from "@prisma/client"
import {
	CreditCard,
	DollarSign,
	QrCode,
	Smartphone,
	Wallet
} from "lucide-react"
import { useFormContext, useWatch } from "react-hook-form"

import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from "@/core/components/ui/form"
import { Input } from "@/core/components/ui/input"
import { Label } from "@/core/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/core/components/ui/radio-group"

import { CheckoutStepCard } from "@/features/client/subscribe/components/ui/checkout-step-card"
import { InfoField } from "@/features/client/subscribe/components/ui/info-field"
import { type BillingSchema } from "@/features/client/subscribe/server/validations"

export function BillingDetailsForm() {
	return (
		<>
			<BillingInformationCard />
			<PaymentMethodCard />
		</>
	)
}

function BillingInformationCard() {
	const { control } = useFormContext<BillingSchema>()
	return (
		<CheckoutStepCard title="Billing Information">
			<FormField
				control={control}
				name="billingName"
				render={({ field }) => (
					<FormItem>
						<FormLabel className="text-foreground">Billing Name</FormLabel>
						<FormControl>
							<Input
								type="text"
								placeholder="Billing Name"
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
				name="billingEmail"
				render={({ field }) => (
					<FormItem>
						<FormLabel className="text-foreground">Billing Email</FormLabel>
						<FormControl>
							<Input
								type="email"
								placeholder="billing@example.com"
								autoComplete="email"
								{...field}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				control={control}
				name="billingPhone"
				render={({ field }) => (
					<FormItem>
						<FormLabel className="text-foreground">Billing Phone</FormLabel>
						<FormControl>
							<Input
								type="tel"
								placeholder="09123456789"
								autoComplete="tel"
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

const paymentOptions = [
	{
		value: PaymentType.CASH,
		label: "Cash",
		icon: <DollarSign className="mb-3 size-5 shrink-0" />
	},
	{
		value: PaymentType.CARD,
		label: "Credit Card",
		icon: <CreditCard className="mb-3 size-5 shrink-0" />
	},
	{
		value: PaymentType.QRPH,
		label: "QRPH",
		icon: <QrCode className="mb-3 size-5 shrink-0" />
	},
	{
		value: PaymentType.GCASH,
		label: "GCash",
		icon: <Wallet className="mb-3 size-5 shrink-0" />
	},
	{
		value: PaymentType.PAYMAYA,
		label: "PayMaya",
		icon: <Smartphone className="mb-3 size-5 shrink-0" />
	}
]
function PaymentMethodCard() {
	const { control } = useFormContext<BillingSchema>()

	const paymentType = useWatch({
		control,
		name: "paymentType"
	})

	const renderPaymentFields = () => {
		switch (paymentType) {
			case PaymentType.CASH:
				return <CashPaymentFields />
			case PaymentType.CARD:
				return <CreditCardFields />
			case PaymentType.QRPH:
				return <QRPaymentFields />
			case PaymentType.GCASH:
				return <QRPaymentFields />
			case PaymentType.PAYMAYA:
				return <QRPaymentFields />
			default:
				return null
		}
	}
	return (
		<CheckoutStepCard
			title="Payment Method"
			className={{
				header: "pb-6"
			}}
		>
			<FormField
				control={control}
				name="paymentType"
				render={({ field }) => (
					<FormItem>
						<FormControl>
							<RadioGroup
								className="flex flex-row flex-wrap justify-center gap-4"
								value={field.value}
								onValueChange={field.onChange}
							>
								{paymentOptions.map((option) => (
									<div key={option.value}>
										<RadioGroupItem
											value={option.value}
											id={option.value}
											className="peer sr-only"
										/>
										<Label
											htmlFor={option.value}
											className="flex h-20 w-24 cursor-pointer flex-col items-center justify-between text-nowrap rounded-lg border-2 border-muted bg-popover p-4 text-center text-xs font-medium text-muted-foreground transition-colors hover:bg-secondary/80 hover:text-secondary-foreground peer-data-[state=checked]:border-primary"
										>
											{option.icon}
											{option.label}
										</Label>
									</div>
								))}
							</RadioGroup>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>

			{renderPaymentFields()}
		</CheckoutStepCard>
	)
}

function CashPaymentFields() {
	return (
		<InfoField label="For cash payments, please visit our office to complete your subscription. Our staff will assist you with the payment process." />
	)
}

function CreditCardFields() {
	const { control } = useFormContext<BillingSchema>()
	return (
		<>
			<FormField
				control={control}
				name="ccNumber"
				render={({ field }) => (
					<FormItem>
						<FormLabel className="text-foreground">Card Number</FormLabel>
						<FormControl>
							<Input
								type="text"
								placeholder="1234 5678 9012 3456"
								autoComplete="cc-number"
								{...field}
								onChange={(e) => {
									const value = e.target.value.replace(/\D/g, "").slice(0, 16)
									const formatted = value.replace(/(\d{4})/g, "$1 ").trim()
									e.target.value = formatted
									field.onChange(value)
								}}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<div className="flex flex-row gap-4">
				<FormField
					control={control}
					name="ccExpiryMonth"
					render={({ field }) => (
						<FormItem className="flex-1">
							<FormLabel className="text-foreground">Expiry Month</FormLabel>
							<FormControl>
								<Input
									type="number"
									placeholder="MM"
									autoComplete="cc-exp-month"
									{...field}
									onChange={(e) =>
										field.onChange(e.target.value ? Number(e.target.value) : "")
									}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={control}
					name="ccExpiryYear"
					render={({ field }) => (
						<FormItem className="flex-1">
							<FormLabel className="text-foreground">Expiry Year</FormLabel>
							<FormControl>
								<Input
									type="number"
									placeholder="YY"
									autoComplete="cc-exp-year"
									{...field}
									onChange={(e) =>
										field.onChange(e.target.value ? Number(e.target.value) : "")
									}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={control}
					name="ccCVC"
					render={({ field }) => (
						<FormItem className="flex-1">
							<FormLabel className="text-foreground">CVC</FormLabel>
							<FormControl>
								<Input
									type="text"
									placeholder="123"
									autoComplete="cc-csc"
									{...field}
									onChange={(e) => {
										const value = e.target.value.replace(/\D/g, "").slice(0, 3)
										e.target.value = value
										field.onChange(value)
									}}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>
		</>
	)
}

function QRPaymentFields() {
	return (
		<InfoField label="You'll be redirected to QR Code to complete your payment after confirming your subscription." />
	)
}
