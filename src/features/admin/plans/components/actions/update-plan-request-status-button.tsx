"use client"

import { type SubscriptionStatus } from "@prisma/client"

import { Button } from "@/core/components/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from "@/core/components/ui/dropdown-menu"
import { MoreHorizontalIcon } from "@/core/lib/icons"

import { useUpdateSubscriptionStatus } from "@/features/admin/plans/lib/hooks"

interface UpdatePlanRequestStatusButtonProps {
	id: string
	currentStatus: SubscriptionStatus
}

export function UpdatePlanRequestStatusButton({
	id,
	currentStatus
}: UpdatePlanRequestStatusButtonProps) {
	const { mutate } = useUpdateSubscriptionStatus()

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="h-8 w-8 p-0">
					<span className="sr-only">Open menu</span>
					<MoreHorizontalIcon className="h-4 w-4" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem
					onClick={() => mutate({ id, status: "FOR_PAYMENT" })}
					disabled={currentStatus === "FOR_PAYMENT"}
				>
					Set for Payment
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={() => mutate({ id, status: "FOR_INSTALLATION" })}
					disabled={currentStatus === "FOR_INSTALLATION"}
				>
					Set for Installation
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={() => mutate({ id, status: "ACTIVE" })}
					disabled={currentStatus === "ACTIVE"}
				>
					Set as Active
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={() => mutate({ id, status: "SUSPENDED" })}
					disabled={currentStatus === "SUSPENDED"}
				>
					Set as Suspended
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={() => mutate({ id, status: "TERMINATED" })}
					disabled={currentStatus === "TERMINATED"}
				>
					Set as Terminated
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
