import { CheckCircle } from "lucide-react"

import { Button } from "@/core/components/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from "@/core/components/ui/card"

import { useAvailablePlans } from "@/features/admin/plans/lib/hooks"
import { SelectedPlanNotFound } from "@/features/client/plan/components/not-found/selected-plan-not-found"
import { SelectedPlanSkeleton } from "@/features/client/plan/components/skeletons/selected-plan-skeleton"
import { usePlan } from "@/features/client/plan/lib/hooks"

interface SelectedPlanProps {
	planSlug: string
	onChangePlan: () => void
}

export const SelectedPlanCard = ({
	planSlug,
	onChangePlan
}: SelectedPlanProps) => {
	const { data, isLoading: isPlansLoading } = useAvailablePlans()
	const {
		data: plan,
		isLoading: isPlanLoading,
		isError: isPlanError
	} = usePlan({ planSlug })

	if (isPlansLoading || isPlanLoading) return <SelectedPlanSkeleton />
	if (isPlanError || !plan) return <SelectedPlanNotFound />

	const handlePlanChange = (planSlug: string) => {
		const newPlan = data?.plans?.find((plan) => plan.slug === planSlug)
		if (newPlan) {
			// setSelectedPlan(newPlan)
		}
		onChangePlan()
	}

	return (
		<Card className="md:col-span-1">
			<CardHeader className="space-y-1 pb-2">
				<CardTitle className="text-xl">Selected Plan</CardTitle>
				<CardDescription>Your subscription</CardDescription>
			</CardHeader>
			<CardContent className="space-y-3 pt-0">
				<div className="rounded-lg bg-primary/10 p-3">
					<div className="flex items-center justify-between">
						<div className="font-semibold">{plan.name}</div>
						<div className="rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
							Selected
						</div>
					</div>
					<div className="mt-1 text-xl font-bold">
						Php {plan.monthlyPrice}
						<span className="text-xs font-normal text-muted-foreground">
							/month
						</span>
					</div>
					<ul className="mt-2 space-y-1">
						{plan.features.map((feature, index) => (
							<li key={index} className="flex items-center text-xs">
								<CheckCircle className="mr-1 h-3 w-3 text-primary" />
								{feature}
							</li>
						))}
					</ul>
				</div>
			</CardContent>
			<CardFooter>
				<Button
					variant="outline"
					size="sm"
					className="w-full text-xs"
					onClick={() => handlePlanChange(plan.slug)}
				>
					Change Plan
				</Button>
			</CardFooter>
		</Card>
	)
}
