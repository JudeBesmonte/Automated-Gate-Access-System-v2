"use client"

import { useState } from "react"
import { Gem } from "lucide-react"

import { AnimationContainer } from "@/core/components/animation-container"
import { Badge } from "@/core/components/ui/badge"
import { ScrollArea, ScrollBar } from "@/core/components/ui/scroll-area"
import { cn } from "@/core/lib/utils"

import { useAvailablePlans } from "@/features/admin/plans/lib/hooks"
import { PlanCard } from "@/features/landing-page/components/plan-card"
import { PlanCardSkeleton } from "@/features/landing-page/components/plan-card-skeleton"
import { PlanNotFound } from "@/features/landing-page/components/plans-not-found"

type Frequency = "monthly" | "annually"

export const PlansSection = () => {
	const { data: rawr, isLoading } = useAvailablePlans()

	const [frequency, setFrequency] = useState<Frequency>("monthly")
	const handleSwitch = () => {
		setFrequency((prev) => (prev === "monthly" ? "annually" : "monthly"))
	}

	const hasPlans = rawr && rawr.plans.length > 0

	return (
		<section className="relative">
			<div className="mx-auto flex max-w-2xl flex-col items-center justify-center">
				<AnimationContainer
					className="flex flex-col items-center justify-center"
					delay={1}
				>
					<Badge size="lg" variant="outlineSecondary">
						<Gem className="h-4 w-4" />
						<span className="ml-2 text-sm">Choose your plan</span>
					</Badge>
					<h2
						id="plans"
						className="mt-6 text-center text-2xl font-semibold lg:text-3xl xl:text-4xl"
					>
						Find Your Perfect Internet Plan
					</h2>
					<p className="mt-6 max-w-lg text-center text-accent-foreground/80">
						Experience lightning-fast internet speeds with our flexible plans.
						Choose from a range of options tailored to your business needs.
					</p>
				</AnimationContainer>

				<AnimationContainer delay={1.2}>
					<div className="mt-6 flex items-center justify-center space-x-4">
						<span className="text-base font-medium">Monthly</span>
						<button
							onClick={handleSwitch}
							className="relative rounded-full focus:outline-none"
						>
							<div className="h-6 w-12 rounded-full bg-primary shadow-md outline-none transition" />
							<div
								className={cn(
									"absolute left-1 top-1 inline-flex h-4 w-4 items-center justify-center rounded-full bg-white transition-all duration-200 ease-in-out",
									frequency === "annually" ? "translate-x-6" : "translate-x-0"
								)}
							/>
						</button>
						<span className="text-base font-medium">Annually</span>
					</div>
				</AnimationContainer>
			</div>

			<ScrollArea
				type="scroll"
				className="mt-8 overflow-y-hidden md:mt-12 lg:mt-16"
			>
				<div className="flex space-x-8 overflow-x-auto overflow-y-hidden px-40">
					{isLoading ? (
						Array.from({ length: 4 }).map((_, id) => (
							<AnimationContainer
								key={id}
								delay={0.2 * id + 0.2}
								className="flex"
							>
								<PlanCardSkeleton />
							</AnimationContainer>
						))
					) : hasPlans ? (
						rawr.plans.map((plan, id) => (
							<AnimationContainer
								key={id}
								delay={0.2 * id + 0.2}
								className="flex"
							>
								<PlanCard plan={plan} frequency={frequency} />
							</AnimationContainer>
						))
					) : (
						<PlanNotFound />
					)}
				</div>
				<ScrollBar orientation="horizontal" className="opacity-0" />
			</ScrollArea>
		</section>
	)
}
