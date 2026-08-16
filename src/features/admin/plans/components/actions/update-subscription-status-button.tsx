"use client"

import { type SubscriptionStatus } from "@prisma/client"

import {
	DropdownMenuItem,
	DropdownMenuSeparator
} from "@/core/components/ui/dropdown-menu"

import { useUpdateSubscriptionStatus, useSendPaymentReminder } from "@/features/admin/plans/lib/hooks"
import { ScheduleInstallationModal } from "./schedule-installation-modal"

interface UpdateSubscriptionStatusButtonProps {
	id: string
	currentStatus: SubscriptionStatus
	customerName?: string
	planName?: string
}

export const UpdateSubscriptionStatusButton = ({
	id,
	currentStatus,
	customerName = "User",
	planName = "Plan"
}: UpdateSubscriptionStatusButtonProps) => {
	const { mutate: updateStatus, isPending } = useUpdateSubscriptionStatus()
	const { mutate: sendReminder, isPending: isReminderPending } = useSendPaymentReminder()

	const handleStatusUpdate = (status: SubscriptionStatus) => {
		updateStatus({ id, status })
	}

	const handleSendReminder = () => {
		sendReminder({ subscriptionId: id })
	}

	// Exclude FOR_INSTALLATION from regular status updates since it has special handling
	const statuses: SubscriptionStatus[] = [
		"FOR_PAYMENT",
		"ACTIVE",
		"SUSPENDED",
		"TERMINATED"
	]

	return (
		<>
			{statuses
				.filter((status) => status !== currentStatus)
				.map((status) => (
					<DropdownMenuItem
						key={status}
						disabled={isPending}
						onClick={() => handleStatusUpdate(status)}
					>
						Update to {status.toLowerCase()}
					</DropdownMenuItem>
				))}
			<DropdownMenuSeparator />
			<ScheduleInstallationModal
				id={id}
				currentStatus={currentStatus}
				customerName={customerName}
				planName={planName}
			/>
		</>
	)
}
