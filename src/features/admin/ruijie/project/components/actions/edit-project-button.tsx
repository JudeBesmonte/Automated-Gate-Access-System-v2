"use client"

import { useState } from "react"
import { EditIcon } from "lucide-react"

import { buttonVariants } from "@/core/components/ui/button"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from "@/core/components/ui/dialog"
import { cn } from "@/core/lib/utils"

import { EditProjectForm } from "@/features/admin/ruijie/project/components/forms/edit-project-form"
import { type EditProjectSchema } from "@/features/admin/ruijie/project/server/validations"

export const EditProjectButton = ({
	project
}: {
	project: EditProjectSchema
}) => {
	const [open, setOpen] = useState(false)
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger
				className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "px-2")}
			>
				<EditIcon className="size-4! shrink-0" />
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Edit Project Details</DialogTitle>
					<DialogDescription>
						Update the project details below.
					</DialogDescription>
				</DialogHeader>
				{project && (
					<EditProjectForm project={project} onSuccess={() => setOpen(false)} />
				)}
			</DialogContent>
		</Dialog>
	)
}
