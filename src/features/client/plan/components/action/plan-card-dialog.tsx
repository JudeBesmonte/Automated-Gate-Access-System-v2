"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

import { Button } from "@/core/components/ui/button"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle
} from "@/core/components/ui/dialog"

import { useAvailablePlans } from "@/features/admin/plans/lib/hooks"

export default function PlanSelectionDialog({
	isOpen,
	onClose,
	selectedPlan,
	setSelectedPlan
}: {
	isOpen: boolean
	onClose: () => void
	selectedPlan: {
		id: string
		slug: string
		name: string
		price: string
		features: string[]
	} | null
	setSelectedPlan: (plan: {
		id: string
		slug: string
		name: string
		price: string
		features: string[]
	}) => void
}) {
	const router = useRouter()
	const { data, isLoading, isError } = useAvailablePlans()

	const [localSelectedPlan, setLocalSelectedPlan] = useState(selectedPlan)

	const handleConfirmSelection = () => {
		if (localSelectedPlan) {
			setSelectedPlan(localSelectedPlan)
			void router.push(`/client/plan/${localSelectedPlan.slug}`)
			onClose()
		}
	}

	if (isLoading) {
		return (
			<Dialog open={isOpen} onOpenChange={onClose}>
				<DialogContent className="sm:max-w-md">
					<DialogHeader>
						<DialogTitle>Loading Plans...</DialogTitle>
					</DialogHeader>
				</DialogContent>
			</Dialog>
		)
	}

	if (isError || !data) {
		return (
			<Dialog open={isOpen} onOpenChange={onClose}>
				<DialogContent className="sm:max-w-md">
					<DialogHeader>
						<DialogTitle>Error</DialogTitle>
						<DialogDescription>
							Failed to load plans. Please try again later.
						</DialogDescription>
					</DialogHeader>
				</DialogContent>
			</Dialog>
		)
	}

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>Select a Plan</DialogTitle>
					<DialogDescription>
						Choose the subscription plan that works best for you.
					</DialogDescription>
				</DialogHeader>

				<div className="grid gap-4 py-4">
					{data.plans.map(
						(plan: {
							id: string
							slug: string
							name: string
							monthlyPrice: number
							features: string[]
						}) => (
							<div
								key={plan.id}
								onClick={() =>
									setLocalSelectedPlan({
										id: plan.id,
										slug: plan.slug,
										name: plan.name,
										price: plan.monthlyPrice.toString(),
										features: plan.features
									})
								}
								className={`relative flex cursor-pointer rounded-lg border p-4 ${
									localSelectedPlan?.id === plan.id
										? "border-primary"
										: "border-border"
								}`}
							>
								<div className="w-full">
									<div className="flex items-center justify-between">
										<span className="text-base font-medium">{plan.name}</span>
										<span className="text-lg font-bold">
											Php {plan.monthlyPrice}
											<span className="text-xs font-normal text-muted-foreground">
												/mo
											</span>
										</span>
									</div>
								</div>
							</div>
						)
					)}
				</div>

				<div className="flex justify-end">
					<Button onClick={handleConfirmSelection}>Confirm Selection</Button>
				</div>
			</DialogContent>
		</Dialog>
	)
}
