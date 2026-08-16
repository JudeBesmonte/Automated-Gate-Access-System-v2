"use client"

import { useState } from "react"

import PlanSelectionDialog from "./action/plan-card-dialog"
import SubscriptionDetailsForm from "./forms/subscription-details-form"
import PlanRequestsTable from "./plan-requests-table"
import { SelectedPlanCard } from "./selected-plan-card"

export const SubscriptionPage = ({ planSlug }: { planSlug: string }) => {
	const [selectedPlan, setSelectedPlan] = useState<{
		id: string
		slug: string
		name: string
		price: string
		features: string[]
	} | null>(null)
	const [isDialogOpen, setIsDialogOpen] = useState(false)

	return (
		<>
			<div className="grid gap-8 md:grid-cols-3">
				<SelectedPlanCard
					planSlug={planSlug}
					onChangePlan={() => setIsDialogOpen(true)}
				/>

				<SubscriptionDetailsForm />
			</div>

			<PlanRequestsTable />

			<PlanSelectionDialog
				isOpen={isDialogOpen}
				onClose={() => setIsDialogOpen(false)}
				selectedPlan={selectedPlan}
				setSelectedPlan={setSelectedPlan}
			/>
		</>
	)
}
