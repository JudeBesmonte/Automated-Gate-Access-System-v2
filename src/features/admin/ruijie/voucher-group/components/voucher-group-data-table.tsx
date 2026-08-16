"use client"

import { useMemo } from "react"
import { type ColumnDef } from "@tanstack/react-table"
import { useQueryStates } from "nuqs"

import { SyncVoucherGroupsButton } from "@/services/ruijie/components/sync-voucher-groups-button"

import { DataTableColumnHeader } from "@/core/components/data-table/column-header"
import { DataTableSortList } from "@/core/components/data-table/sort-list"
import { DataTable } from "@/core/components/data-table/table"
import { DataTableToolbar } from "@/core/components/data-table/toolbar"
import { Button } from "@/core/components/ui/button"
import { Checkbox } from "@/core/components/ui/checkbox"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuTrigger
} from "@/core/components/ui/dropdown-menu"
import { useDataTable } from "@/core/hooks/use-data-table"
import { CalendarIcon, MoreHorizontalIcon } from "@/core/lib/icons"
import { formatDate } from "@/core/lib/utils"

import { useVoucherGroups } from "@/features/admin/ruijie/voucher-group/lib/hooks"
import { parser } from "@/features/admin/ruijie/voucher-group/lib/search-params"
import type { GetVoucherGroupResponse } from "@/features/admin/ruijie/voucher-group/server/types"

export const VoucherGroupDataTable = () => {
	const [params] = useQueryStates(parser)
	const { data, isLoading } = useVoucherGroups(params)

	const columns = useMemo<ColumnDef<GetVoucherGroupResponse>[]>(
		() => [
			{
				id: "select",
				header: ({ table }) => (
					<div className="flex w-4 items-center justify-center">
						<Checkbox
							className="bg-accent text-accent-foreground data-[state=checked]:bg-accent data-[state=checked]:text-primary dark:bg-muted dark:data-[state=checked]:text-muted-foreground"
							checked={
								table.getIsAllPageRowsSelected() ||
								(table.getIsSomePageRowsSelected() && "indeterminate")
							}
							onCheckedChange={(value) =>
								table.toggleAllPageRowsSelected(!!value)
							}
							aria-label="Select all"
						/>
					</div>
				),
				cell: ({ row }) => (
					<div className="flex w-4 items-center justify-center">
						<Checkbox
							checked={row.getIsSelected()}
							onCheckedChange={(value) => row.toggleSelected(!!value)}
							aria-label="Select row"
						/>
					</div>
				),
				enableSorting: false,
				enableHiding: false,
				size: 40
			},
			{
				id: "name",
				accessorKey: "name",
				header: ({ column }) => (
					<DataTableColumnHeader column={column} title="Name" />
				),
				meta: {
					label: "Name",
					placeholder: "Search voucher groups...",
					variant: "text"
				},
				enableColumnFilter: true
			},
			{
				id: "vouchersCount",
				accessorKey: "vouchersCount",
				header: ({ column }) => (
					<DataTableColumnHeader column={column} title="Vouchers" />
				),
				cell: ({ cell }) => {
					const count = cell.getValue() as number
					return count > 0 ? count : null
				},
				meta: { label: "Vouchers" },
				size: 0
			},
			{
				accessorKey: "project",
				header: ({ column }) => (
					<DataTableColumnHeader column={column} title="Project" />
				),
				cell: ({ cell }) => {
					const project = cell.getValue() as { name: string }
					return project ? project.name : null
				},
				meta: { label: "Project" }
			},
			{
				id: "createdAt",
				accessorKey: "createdAt",
				header: ({ column }) => (
					<DataTableColumnHeader column={column} title="Created At" />
				),
				cell: ({ cell }) => formatDate(cell.getValue() as Date),
				meta: {
					label: "Created At",
					variant: "dateRange",
					icon: CalendarIcon
				},
				enableColumnFilter: true
			},
			{
				id: "updatedAt",
				accessorKey: "updatedAt",
				header: ({ column }) => (
					<DataTableColumnHeader column={column} title="Updated At" />
				),
				cell: ({ cell }) => formatDate(cell.getValue() as Date),
				meta: { label: "Updated At" }
			},
			{
				id: "actions",
				enableHiding: false,
				cell: () => {
					return (
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="ghost" className="h-6 w-6 rounded-sm p-0">
									<span className="sr-only">Open menu</span>
									<MoreHorizontalIcon />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								<DropdownMenuLabel>Action</DropdownMenuLabel>
							</DropdownMenuContent>
						</DropdownMenu>
					)
				},
				size: 40
			}
		],
		[]
	)

	const { table } = useDataTable({
		data: data?.voucherGroups ?? [],
		columns: columns,
		pageCount: data?.pageCount ?? 0,
		manualPagination: true,
		manualSorting: true,
		manualFiltering: true,
		getRowId: (row) => row.id
	})

	return (
		<DataTable table={table} isLoading={isLoading} rowCount={10}>
			<DataTableToolbar table={table}>
				<SyncVoucherGroupsButton />
				<DataTableSortList table={table} align="end" />
			</DataTableToolbar>
		</DataTable>
	)
}
