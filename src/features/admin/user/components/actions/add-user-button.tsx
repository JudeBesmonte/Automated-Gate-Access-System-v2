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

import { AddUserForm } from "@/features/admin/user/components/forms/add-user-form"

export const AddUserButton = () => {
	const [open, setOpen] = useState(false)

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button size={"sm"}>
					<AddIcon />
					Add User
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Add New User</DialogTitle>
					<DialogDescription>
						Enter the details for the new user.
					</DialogDescription>
				</DialogHeader>
				<AddUserForm setOpen={setOpen} />
			</DialogContent>
		</Dialog>
	)
}
