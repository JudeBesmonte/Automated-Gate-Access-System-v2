"use client"

import { useMemo } from "react"
import { type ColumnDef } from "@tanstack/react-table"
import { useQueryStates } from "nuqs"

import { SyncProjectsButton } from "@/services/ruijie/components/sync-projects-button"

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

import { useProjects } from "@/features/admin/ruijie/project/lib/hooks"
import { projectSearchParamsParser } from "@/features/admin/ruijie/project/lib/search-params"
import type { GetProjectResponse } from "@/features/admin/ruijie/project/server/types"

export const ProjectDataTable = () => {
	const [searchParams] = useQueryStates(projectSearchParamsParser)
	const { data, isLoading } = useProjects(searchParams)

	const columns = useMemo<ColumnDef<GetProjectResponse>[]>(
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
					placeholder: "Search projects...",
					variant: "text"
				},
				enableColumnFilter: true
			},
			{
				id: "voucherGroupsCount",
				accessorKey: "voucherGroupsCount",
				header: ({ column }) => (
					<DataTableColumnHeader column={column} title="Voucher Groups" />
				),
				cell: ({ cell }) => {
					const count = cell.getValue() as number
					return count > 0 ? count : null
				},
				meta: { label: "Total Voucher Groups" },
				size: 0
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
				meta: { label: "Total Vouchers" },
				size: 0
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
		data: data?.projects ?? [],
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
				<SyncProjectsButton />
				<DataTableSortList table={table} align="end" />
			</DataTableToolbar>
		</DataTable>
	)
}
