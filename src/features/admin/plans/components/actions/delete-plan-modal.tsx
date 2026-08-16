"use client"

import { useState } from "react"

import { ConfirmModal } from "@/core/components/ui/confirm-modal"
import { DropdownMenuItem } from "@/core/components/ui/dropdown-menu"

import { useDeletePlan } from "@/features/admin/plans/lib/hooks"

interface DeletePlanModalProps {
	id: string
	name: string
}

export function DeletePlanModal({ id, name }: DeletePlanModalProps) {
	const [open, setOpen] = useState(false)

	const { mutate: deletePlan, isPending } = useDeletePlan()

	const handleDelete = () => deletePlan({ id })

	return (
		<ConfirmModal
			title="Are you absolutely sure?"
			description={`This action cannot be undone. This will permanently delete the plan. ${name} and remove it from our servers.`}
			actionLabel={isPending ? "Deleting..." : "Delete"}
			onConfirm={handleDelete}
			actionClassName="bg-destructive text-destructive-foreground hover:bg-destructive/90"
			open={open}
			onOpenChange={setOpen}
		>
			<DropdownMenuItem
				className="text-destructive focus:text-destructive"
				onSelect={(e) => e.preventDefault()}
			>
				Delete
			</DropdownMenuItem>
		</ConfirmModal>
	)
}
