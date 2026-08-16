"use client"

import { useState } from "react"
import { Plus } from "lucide-react"

import { Button } from "@/core/components/ui/button"
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from "@/core/components/ui/dialog"

import { AddKioskForm } from "@/features/kiosk/components/forms/add-kiosk-form"

interface AddKioskButtonProps {
	projectId: string
}

export function AddKioskButton({ projectId }: AddKioskButtonProps) {
	const [open, setOpen] = useState(false)

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="outline" size="icon" className="h-8 w-8 border-dashed">
					<Plus className="h-5 w-5" />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Add Kiosk</DialogTitle>
				</DialogHeader>
				<AddKioskForm projectId={projectId} onSuccess={() => setOpen(false)} />
			</DialogContent>
		</Dialog>
	)
}
