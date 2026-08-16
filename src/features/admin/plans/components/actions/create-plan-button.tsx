"use client"

import { useState } from "react"

import { Button } from "@/core/components/ui/button"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from "@/core/components/ui/dialog"
import { AddIcon } from "@/core/lib/icons"

import { CreatePlanForm } from "@/features/admin/plans/components/forms/create-plan-form"

export function CreatePlanButton() {
	const [open, setOpen] = useState(false)

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogHeader>
				<DialogTrigger asChild>
					<Button size="sm">
						<AddIcon />
						Create Plan
					</Button>
				</DialogTrigger>
			</DialogHeader>
			<DialogContent className="sm:max-w-[600px]">
				<DialogHeader>
					<DialogTitle>Create New Plan</DialogTitle>
					<DialogDescription>
						Create a new subscription plan for your clients.
					</DialogDescription>
				</DialogHeader>

				<CreatePlanForm onSuccess={() => setOpen(false)} />
			</DialogContent>
		</Dialog>
	)
}

export default CreatePlanButton
