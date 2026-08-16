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

import { AddProjectForm } from "@/features/admin/ruijie/project/components/forms/add-project-form"

export const AddProjectButton = () => {
	const [open, setOpen] = useState(false)

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button>Add Projects</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Add New Project</DialogTitle>
					<DialogDescription>
						Enter the details for the new project.
					</DialogDescription>
				</DialogHeader>
				<AddProjectForm onSuccess={() => setOpen(false)} />
			</DialogContent>
		</Dialog>
	)
}
