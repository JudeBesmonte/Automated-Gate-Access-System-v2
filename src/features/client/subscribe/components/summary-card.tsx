"use client"

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from "@/core/components/ui/card"
import { Separator } from "@/core/components/ui/separator"
import { formatPeso } from "@/core/lib/utils"

import { usePlanDetails } from "@/features/client/payment/lib/hooks"

export function SummaryCard({ slug }: { slug: string }) {
	const { data } = usePlanDetails({ slug })

	const monthlyPrice = data?.plan?.monthlyPrice ?? 0
	const installationFee = data?.plan?.installationFee ?? 0
	const total = monthlyPrice + installationFee + monthlyPrice

	return (
		<Card className="sticky top-20 h-fit w-full min-w-96 flex-[1_1_0%] overflow-hidden md:w-1/3">
			<CardHeader>
				<CardTitle className="text-xl font-bold">
					Subscription Summary
				</CardTitle>
				<CardDescription>Review your subscription details</CardDescription>
			</CardHeader>

			<CardContent className="space-y-4 text-sm">
				<Separator />

				<SummaryItem label="Plan" value={data?.plan?.name} />
				<SummaryItem label="Billing Interval" value="Monthly" />
				<SummaryItem label="Lock-in Period" value="12 months" />

				<Separator />

				<SummaryItem label="Subtotal" value={formatPeso(monthlyPrice)} />
				<SummaryItem
					label="Installation Fee"
					value={formatPeso(installationFee)}
				/>
			</CardContent>

			<CardFooter className="flex-col items-start space-y-2 border-t pt-6">
				<div className="flex w-full justify-between font-semibold">
					<span>First Payment</span>
					<span>₱ {formatPeso(total)}</span>
				</div>
			</CardFooter>
		</Card>
	)
}

const SummaryItem = ({
	label,
	value
}: {
	label: string
	value: string | number | undefined
}) => {
	return (
		<div className="flex justify-between">
			<span className="text-muted-foreground">{label}</span>
			<span>{value}</span>
		</div>
	)
}
