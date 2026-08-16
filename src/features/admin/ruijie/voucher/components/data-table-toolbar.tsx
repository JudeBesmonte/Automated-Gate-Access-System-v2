"use client"

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from "@/core/components/ui/dropdown-menu"
import { Input } from "@/core/components/ui/input"
import { ShimmerButton } from "@/core/components/ui/shimmer-button"

import {
	exportAllVouchers,
	exportGlobalVouchers,
	exportVoucherGroups,
	exportVoucherTable
} from "@/features/admin/ruijie/voucher/server/export"
import type { GetVoucherParams } from "@/features/admin/ruijie/voucher/server/type"

interface ToolbarProps extends GetVoucherParams {
	globalFilter: string
	setGlobalFilter: (filter: string) => void
}
export const DataTableToolbar = ({
	globalFilter,
	setGlobalFilter,
	projectId,
	groupId
}: ToolbarProps) => {
	const handleExport = async (type: "table" | "groups" | "all" | "global") => {
		try {
			let csv = ""
			switch (type) {
				case "table":
					csv = await exportVoucherTable({
						projectId,
						groupId
					})
					break
				case "groups":
					csv = await exportVoucherGroups({ projectId })
					break
				case "all":
					csv = await exportAllVouchers({ projectId })
					break
				case "global":
					csv = await exportGlobalVouchers()
					break
			}

			const blob = new Blob([csv], { type: "text/csv" })
			const url = URL.createObjectURL(blob)
			const link = document.createElement("a")
			link.href = url
			link.download = `${type}-export.csv`
			document.body.appendChild(link)
			link.click()
			document.body.removeChild(link)
		} catch (error) {
			console.error("Export failed:", error)
		}
	}
	return (
		<div className="flex items-center justify-between">
			<div className="flex flex-1 items-center space-x-2">
				<Input
					placeholder="Search vouchers..."
					value={globalFilter}
					onChange={(e) => setGlobalFilter(e.target.value)}
					className="h-8 w-[150px] lg:w-[250px]"
				/>
			</div>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<ShimmerButton borderRadius="10px" className="h-8 gap-1">
						<span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
							Export
						</span>
					</ShimmerButton>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuItem onSelect={() => handleExport("table")}>
						Export Voucher Table
					</DropdownMenuItem>
					<DropdownMenuItem onSelect={() => handleExport("groups")}>
						Export Voucher Groups
					</DropdownMenuItem>
					<DropdownMenuItem onSelect={() => handleExport("all")}>
						Export All Vouchers from Project
					</DropdownMenuItem>
					<DropdownMenuItem onSelect={() => handleExport("global")}>
						Export Global Vouchers
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	)
}
