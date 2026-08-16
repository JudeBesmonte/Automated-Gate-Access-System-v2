"use client"

import { useSyncProjectsWithVoucherGroupsAndVouchers } from "@/services/ruijie/lib/hooks"

import { Button } from "@/core/components/ui/button"
import { SyncButtonIcon } from "@/core/lib/icons"

export function SyncVouchersButton() {
	const { mutate, isPending } = useSyncProjectsWithVoucherGroupsAndVouchers()

	const handleSync = () => mutate()

	return (
		<Button size={"sm"} onClick={handleSync} disabled={isPending}>
			<SyncButtonIcon
				className={isPending ? "animate-spin duration-700" : ""}
			/>
			Sync Vouchers
		</Button>
	)
}
