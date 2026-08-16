import * as React from "react"

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger
} from "@/core/components/ui/alert-dialog"
import { type ButtonProps } from "@/core/components/ui/button"
import { LoadingIcon } from "@/core/lib/icons"
import { cn } from "@/core/lib/utils"

type ConfirmModalProps = {
	onConfirm: () => Promise<void> | void
	children: React.ReactNode
	actionLabel: string
	title: string
	description: string
	variant?: ButtonProps["variant"]
	open?: boolean
	onOpenChange?: (open: boolean) => void
	actionClassName?: string
}

export const ConfirmModal = ({
	onConfirm,
	title,
	description,
	children,
	actionLabel,
	open: controlledOpen,
	onOpenChange: controlledOnOpenChange,
	actionClassName
}: ConfirmModalProps) => {
	const [internalOpen, setInternalOpen] = React.useState(false)
	const [isLoading, setIsLoading] = React.useState(false)

	const open = controlledOpen ?? internalOpen
	const onOpenChange = controlledOnOpenChange ?? setInternalOpen

	const handleConfirm = async () => {
		try {
			setIsLoading(true)
			await onConfirm()
			onOpenChange(false)
		} catch (error) {
			// Error handling should be done in the onConfirm function
			console.error(error)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<AlertDialog open={open} onOpenChange={onOpenChange}>
			<AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>{title}</AlertDialogTitle>
					<AlertDialogDescription>{description}</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel className="rounded-md">Cancel</AlertDialogCancel>
					<AlertDialogAction
						variant="destructive"
						className={cn("rounded-md", actionClassName)}
						onClick={(e) => {
							e.preventDefault()
							void handleConfirm()
						}}
						disabled={isLoading}
					>
						{isLoading && <LoadingIcon className="animate-spin" />}
						{actionLabel}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
