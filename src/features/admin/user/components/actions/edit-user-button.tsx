"use client"

import { useState } from "react"

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from "@/core/components/ui/dialog"
import { DropdownMenuItem } from "@/core/components/ui/dropdown-menu"
import { EditUserIcon } from "@/core/lib/icons"

import { EditUserForm } from "@/features/admin/user/components/forms/edit-user-form"
import type { GetUserResponse } from "@/features/admin/user/server/types"

export const EditUserButton = ({ user }: { user: GetUserResponse }) => {
	const [open, setOpen] = useState(false)

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<DropdownMenuItem
					onSelect={(event) => {
						event.preventDefault()
					}}
				>
					<EditUserIcon />
					Edit
				</DropdownMenuItem>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Edit User</DialogTitle>
					<DialogDescription>
						Enter the details for the new user.
					</DialogDescription>
				</DialogHeader>
				<EditUserForm user={user} setOpen={setOpen} />
			</DialogContent>
		</Dialog>
	)
}
