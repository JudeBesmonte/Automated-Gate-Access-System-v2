"use client"

import { useState } from "react"

import { ConfirmModal } from "@/core/components/ui/confirm-modal"
import { DropdownMenuItem } from "@/core/components/ui/dropdown-menu"
import { DeleteIcon } from "@/core/lib/icons"

import { useDeleteUser } from "@/features/admin/user/lib/hooks"
import { type DeleteUserSchema } from "@/features/admin/user/server/validations"

export const DeleteUserButton = ({ id }: DeleteUserSchema) => {
	const [open, setOpen] = useState(false)

	const { mutateAsync: deleteUser } = useDeleteUser()

	const handleDelete = async () => {
		setOpen(false)
		await deleteUser({ id })
	}

	return (
		<ConfirmModal
			title="Are you sure you want to delete this user?"
			description="This action cannot be undone. This will permanently delete your user and remove your data from our servers."
			onConfirm={handleDelete}
			actionLabel="Delete"
			variant="destructive"
			open={open}
			onOpenChange={setOpen}
		>
			<DropdownMenuItem
				className="text-red-500"
				onSelect={(e) => e.preventDefault()}
			>
				<DeleteIcon />
				Delete
			</DropdownMenuItem>
		</ConfirmModal>
	)
}
