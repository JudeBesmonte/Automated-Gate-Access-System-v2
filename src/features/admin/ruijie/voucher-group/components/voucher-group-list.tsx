"use client"

import { useMemo, useState } from "react"
import { useIsClient } from "usehooks-ts"

import { SyncButton } from "@/services/ruijie/components/sync-button"

import { Separator } from "@/core/components/ui/separator"
import { useSidebar } from "@/core/components/ui/sidebar"
import { cn } from "@/core/lib/utils"

import { VoucherGroupCard } from "@/features/admin/ruijie/voucher-group/components/voucher-group-card"
import { VoucherGroupFilter } from "@/features/admin/ruijie/voucher-group/components/voucher-group-filter"
import { VoucherGroupCardSkeleton } from "@/features/admin/ruijie/voucher-group/components/voucher-group-skeleton"
import { useProjectVoucherGroups } from "@/features/admin/ruijie/voucher-group/lib/hooks"

export const VoucherGroupList = ({ projectId }: { projectId: string }) => {
	const { open } = useSidebar()
	const isClient = useIsClient()

	const { data, isLoading } = useProjectVoucherGroups({ projectId })
	const voucherGroups = data?.voucherGroups

	const [filters, setFilters] = useState({
		search: ""
	})

	const filteredVoucherGroups = useMemo(() => {
		if (!voucherGroups) return []

		const searchTerm = filters.search.toLowerCase()
		return voucherGroups.filter((group) =>
			group.name.toLowerCase().includes(searchTerm)
		)
	}, [filters.search, voucherGroups])

	if (!isClient) return null

	return (
		<>
			<div className="mb-4 flex w-full flex-1 justify-between">
				<VoucherGroupFilter filters={filters} setFilters={setFilters} />
				<SyncButton />
			</div>

			<Separator className="mb-4 shadow-sm" />

			{!isLoading && filteredVoucherGroups.length === 0 && (
				<div className="w-full flex-1 rounded-xl border-2 border-dashed bg-card p-16 text-center text-muted-foreground">
					No voucher groups found.
				</div>
			)}

			<div
				className={cn(
					"grid w-full grid-cols-1 gap-6",
					open
						? "md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3"
						: "md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4"
				)}
			>
				{isLoading
					? Array.from({ length: 6 }).map((_, index) => (
							<VoucherGroupCardSkeleton key={index} />
						))
					: filteredVoucherGroups.map((group) => (
							<VoucherGroupCard key={group.id} {...group} />
						))}
			</div>
		</>
	)
}
