"use client"

import Link from "next/link"

import { buttonVariants } from "@/core/components/ui/button"
import { PageContent } from "@/core/components/ui/page"
import { Separator } from "@/core/components/ui/separator"
import { CheckIcon } from "@/core/lib/icons"
import { formatPeso } from "@/core/lib/utils"

import { usePlanDetails } from "@/features/client/payment/lib/hooks"

interface PlanDetailsContentProps {
	slug: string
}

export function PlanDetailsContent({ slug }: PlanDetailsContentProps) {
	const { data } = usePlanDetails({ slug })
	const plan = data?.plan

	if (!plan) return <div>Plan not found.</div>

	return (
		<PageContent className="mx-auto flex max-w-2xl flex-col gap-8">
			<div className="rounded-lg border bg-card p-6 shadow-sm">
				<div className="mb-4 flex items-center justify-between">
					<h2 className="text-2xl font-bold">{plan.name}</h2>
					<div className="text-xl font-semibold text-primary">
						₱ {formatPeso(plan.monthlyPrice)}{" "}
						<span className="text-sm font-normal text-muted-foreground">
							/month
						</span>
					</div>
				</div>
				<Separator />
				<div className="mt-4">
					<h3 className="mb-2 font-medium">Features</h3>
					<ul className="space-y-1.5">
						{plan.features?.map((feature: string, idx: number) => (
							<li key={idx} className="flex items-start text-sm">
								<CheckIcon className="mr-2 h-4 w-4 shrink-0 text-green-600" />
								{feature}
							</li>
						))}
					</ul>
				</div>
				{plan.inclusions?.length ? (
					<div className="mt-4">
						<h3 className="mb-2 font-medium">Inclusions</h3>
						<ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
							{plan.inclusions.map((item: string, idx: number) => (
								<li key={idx}>{item}</li>
							))}
						</ul>
					</div>
				) : null}
				{plan.equipment?.length ? (
					<div className="mt-4">
						<h3 className="mb-2 font-medium">Equipment</h3>
						<ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
							{plan.equipment.map((item: string, idx: number) => (
								<li key={idx}>{item}</li>
							))}
						</ul>
					</div>
				) : null}
			</div>
			<div className="flex justify-end">
				<Link
					href={`/client/plan/${slug}/details`}
					className={buttonVariants({ size: "lg" })}
				>
					Continue
				</Link>
			</div>
		</PageContent>
	)
}
