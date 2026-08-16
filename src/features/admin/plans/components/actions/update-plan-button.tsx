"use client"

import { useState } from "react"
import type { Plan } from "@prisma/client"

import { DropdownMenuItem } from "@/core/components/ui/dropdown-menu"
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger
} from "@/core/components/ui/sheet"

import { UpdatePlanForm } from "@/features/admin/plans/components/forms/update-plan-form"

interface UpdatePlanButtonProps {
	plan: Plan
}

export function UpdatePlanButton({ plan }: UpdatePlanButtonProps) {
	const [open, setOpen] = useState(false)

	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger asChild>
				<DropdownMenuItem onSelect={(e) => e.preventDefault()}>
					Edit Plan
				</DropdownMenuItem>
			</SheetTrigger>

			<SheetContent className="w-full space-y-4 overflow-y-auto sm:max-w-xl">
				<SheetHeader>
					<SheetTitle>Edit Plan</SheetTitle>
					<SheetDescription>
						Make changes to the subscription plan.
					</SheetDescription>
				</SheetHeader>
				<UpdatePlanForm defaultValues={plan} onSuccess={() => setOpen(false)} />
			</SheetContent>
		</Sheet>
	)
}
