"use client"

import { CheckIcon } from "lucide-react"

import {
	Card,
	CardContent,
	CardHeader,
	CardTitle
} from "@/core/components/ui/card"

import { usePlanDetails } from "@/features/client/payment/lib/hooks"

export function AddonsCard({ slug }: { slug: string }) {
	const { data } = usePlanDetails({ slug })

	if (!data?.plan?.addons || data.plan.addons.length === 0) return null

	return (
		<Card className="w-full">
			<CardHeader>
				<CardTitle className="text-xl font-bold">Optional Add-ons</CardTitle>
			</CardHeader>

			<CardContent>
				<ul className="grid gap-x-4 gap-y-2 md:grid-cols-2">
					{data.plan.addons.map((addon, index) => (
						<li key={index} className="flex items-start gap-2 text-sm">
							<CheckIcon className="mt-1 h-4 w-4 shrink-0 text-primary" />
							{addon}
						</li>
					))}
				</ul>
			</CardContent>
		</Card>
	)
}
