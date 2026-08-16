"use client"

import { type Plan } from "@prisma/client"

import { Button } from "@/core/components/ui/button"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from "@/core/components/ui/select"

interface EditPlanFormProps {
	plans: Plan[]
	selectedPlan: Omit<Plan, "createdAt" | "updatedAt">
	onPlanChange: (planName: string) => void
	onSave: () => void
	onCancel: () => void
}

export function EditPlanForm({
	plans,
	selectedPlan,
	onPlanChange,
	onSave,
	onCancel
}: EditPlanFormProps) {
	return (
		<div className="w-[200px]">
			<Select onValueChange={onPlanChange} defaultValue={selectedPlan.name}>
				<SelectTrigger>
					<SelectValue placeholder="Select a plan" />
				</SelectTrigger>
				<SelectContent>
					{plans.map((plan) => (
						<SelectItem key={plan.name} value={plan.name}>
							{plan.name}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
			<div className="mt-4 space-x-2">
				<Button variant="outline" size="sm" onClick={onCancel}>
					Cancel
				</Button>
				<Button variant="default" size="sm" onClick={onSave}>
					Save
				</Button>
			</div>
		</div>
	)
}
