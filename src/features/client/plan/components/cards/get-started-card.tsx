"use client"

import Link from "next/link"

import { buttonVariants } from "@/core/components/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from "@/core/components/ui/card"
import { cn } from "@/core/lib/utils"

import { usePlanDetails } from "@/features/client/payment/lib/hooks"

export function GetStartedCard({ slug }: { slug: string }) {
	const { data } = usePlanDetails({ slug })

	if (!data?.plan?.name) return null

	return (
		<Card className="relative w-full text-center">
			<CardHeader className="pb-4">
				<CardTitle className="text-2xl font-bold">
					Ready to get started?
				</CardTitle>
				<CardDescription>
					Subscribe now to the {data.plan.name} and experience reliable WiFI
					connectivity for your institution.
				</CardDescription>
			</CardHeader>

			<CardContent className="flex justify-center">
				<Link
					href={`/client/subscribe/${data.plan.slug}`}
					className={cn(buttonVariants(), "mt-2 lg:mt-4")}
				>
					Subscribe Now
				</Link>
			</CardContent>
		</Card>
	)
}
