"use client"

import { useState } from "react"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle
} from "@/core/components/ui/alert-dialog"

interface DeleteAlertProps {
	open: boolean
	onOpenChange: (open: boolean) => void
	onConfirm: () => Promise<void>
}

export function DeleteAlert({
	open,
	onOpenChange,
	onConfirm
}: DeleteAlertProps) {
	const [isLoading, setIsLoading] = useState(false)

	async function handleConfirm() {
		try {
			setIsLoading(true)
			await onConfirm()
			toast.success("Kiosk deleted successfully")
			onOpenChange(false)
		} catch (error) {
			toast.error(
				error instanceof Error ? error.message : "Failed to delete kiosk"
			)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<AlertDialog open={open} onOpenChange={onOpenChange}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
					<AlertDialogDescription>
						This will permanently delete this kiosk and all associated data
						including maintenance records and OOTD assignments.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction
						onClick={handleConfirm}
						disabled={isLoading}
						className="bg-red-600 hover:bg-red-700"
					>
						{isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
						Delete
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
