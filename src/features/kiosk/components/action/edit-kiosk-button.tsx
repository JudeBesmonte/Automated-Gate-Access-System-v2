"use client"

import { useState } from "react"

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from "@/core/components/ui/dialog"
import { DropdownMenuItem } from "@/core/components/ui/dropdown-menu"

import { EditKioskForm } from "@/features/kiosk/components/forms/edit-kiosk-form"

interface EditKioskButtonProps {
	kioskId: string
}

export function EditKioskButton({ kioskId }: EditKioskButtonProps) {
	const [open, setOpen] = useState(false)

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<DropdownMenuItem onSelect={(e) => e.preventDefault()}>
					Edit Kiosk
				</DropdownMenuItem>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Edit Kiosk</DialogTitle>
				</DialogHeader>
				<EditKioskForm kioskId={kioskId} onSuccess={() => setOpen(false)} />
			</DialogContent>
		</Dialog>
	)
}
