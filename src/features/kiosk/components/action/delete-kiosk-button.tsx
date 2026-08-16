"use client"

import { ConfirmModal } from "@/core/components/ui/confirm-modal"
import { DropdownMenuItem } from "@/core/components/ui/dropdown-menu"

import { useDeleteKiosk } from "@/features/kiosk/lib/hooks"

interface DeleteKioskButtonProps {
	kioskId: string
}

export function DeleteKioskButton({ kioskId }: DeleteKioskButtonProps) {
	const { mutateAsync, isPending } = useDeleteKiosk()

	const handleDelete = async () => {
		await mutateAsync({ id: kioskId })
	}

	return (
		<ConfirmModal
			title="Are you sure?"
			description="This action cannot be undone. This will permanently delete the kiosk."
			actionLabel={isPending ? "Deleting..." : "Delete"}
			onConfirm={handleDelete}
			actionClassName="bg-destructive text-destructive-foreground hover:bg-destructive/90"
		>
			<DropdownMenuItem
				className="!text-destructive"
				onSelect={(e) => {
					e.preventDefault()
				}}
			>
				Delete
			</DropdownMenuItem>
		</ConfirmModal>
	)
}
