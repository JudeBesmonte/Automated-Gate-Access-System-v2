"use client"

import Link from "next/link"
import { Zap } from "lucide-react"

import { BorderBeam } from "@/core/components/ui/border-beam"
import { buttonVariants } from "@/core/components/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from "@/core/components/ui/card"
import { cn, formatPeso } from "@/core/lib/utils"

interface Plan {
	monthlyPrice: number
	name: string
	slug: string
	features: string[]
}

interface PlanCardProps {
	plan: Plan
	frequency?: "monthly" | "annually"
}

export function PlanCard({ plan, frequency = "monthly" }: PlanCardProps) {
	const price =
		frequency === "annually" ? plan.monthlyPrice * 12 : plan.monthlyPrice
	return (
		<Card className="relative w-80 flex-1 overflow-hidden rounded-3xl">
			<div className="flex h-full flex-col">
				<CardHeader
					className="rounded-t-3xl p-4 md:p-8"
					style={{ backgroundColor: "hsla(335, 74.9%, 56.9%, 0.07)" }}
				>
					<CardDescription className="truncate text-base font-medium">
						{plan.name}
					</CardDescription>
					<CardTitle className="mt-4 text-2xl font-medium md:text-3xl">
						₱ {formatPeso(price)}
					</CardTitle>

					<span className="mt-2 text-neutral-500">
						per {frequency === "annually" ? "year" : "month"}
					</span>
				</CardHeader>

				<CardContent className="flex flex-1 flex-col justify-between border-t border-border pt-8">
					<ul className="space-y-4">
						{plan.features.map((feature, index) => (
							<li
								key={index}
								className="flex items-start gap-2 text-sm tracking-wide text-muted-foreground"
							>
								<span
									className="rounded-full p-1"
									style={{ backgroundColor: "hsla(335, 74.9%, 56.9%, 0.15)" }}
								>
									<Zap className="h-3 w-3 shrink-0 fill-primary text-primary" />
								</span>
								{feature}
							</li>
						))}
					</ul>

					<Link
						href={`/client/plan/${plan.slug}`}
						passHref
						className={cn(buttonVariants(), "mt-6")}
					>
						Select Plan
					</Link>
				</CardContent>
			</div>

			<BorderBeam
				duration={6}
				size={400}
				className="from-transparent via-[#C70655] to-transparent"
			/>
			<BorderBeam
				duration={6}
				delay={3}
				size={400}
				className="from-transparent via-[#C70655] to-transparent"
			/>
		</Card>
	)
}
