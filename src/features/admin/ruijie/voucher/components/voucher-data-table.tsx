"use client"

import { useMemo } from "react"
import { type ColumnDef } from "@tanstack/react-table"
import { useQueryStates } from "nuqs"
import { LuCircle, LuCircleCheck, LuCircleX } from "react-icons/lu"

import { SyncVouchersButton } from "@/services/ruijie/components/sync-vouchers-button"

import { DataTableColumnHeader } from "@/core/components/data-table/column-header"
import { DataTableSortList } from "@/core/components/data-table/sort-list"
import { DataTable } from "@/core/components/data-table/table"
import { DataTableToolbar } from "@/core/components/data-table/toolbar"
import { Badge } from "@/core/components/ui/badge"
import { Checkbox } from "@/core/components/ui/checkbox"
import { useDataTable } from "@/core/hooks/use-data-table"
import { CalendarIcon } from "@/core/lib/icons"
import { formatDate, formatTime } from "@/core/lib/utils"

import { useVouchers } from "@/features/admin/ruijie/voucher/lib/hooks"
import { parser } from "@/features/admin/ruijie/voucher/lib/search-params"
import type { GetVoucherResponse } from "@/features/admin/ruijie/voucher/server/type"

export const VoucherDataTable = () => {
	const [params] = useQueryStates(parser)
	const { data, isLoading } = useVouchers(params)

	const columns = useMemo<ColumnDef<GetVoucherResponse>[]>(
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
				accessorKey: "voucherCode",
				header: ({ column }) => (
					<DataTableColumnHeader column={column} title="Code" />
				),
				meta: {
					label: "Code",
					placeholder: "Search vouchers...",
					variant: "text"
				},
				enableColumnFilter: true
			},
			{
				accessorKey: "timePeriod",
				header: ({ column }) => (
					<DataTableColumnHeader column={column} title="Unused" />
				),
				cell: ({ cell }) => {
					const timePeriod = cell.getValue() as number
					const formattedTime = formatTime(timePeriod)
					return formattedTime
				},
				meta: { label: "Unused" }
			},
			{
				accessorKey: "usedTime",
				header: ({ column }) => (
					<DataTableColumnHeader column={column} title="Used" />
				),
				cell: ({ cell }) => {
					const timePeriod = cell.getValue() as number
					const formattedTime = formatTime(timePeriod)
					return formattedTime
				},
				meta: { label: "Used" }
			},
			{
				id: "status",
				accessorKey: "status",
				header: ({ column }) => (
					<DataTableColumnHeader column={column} title="Status" />
				),
				cell: ({ cell }) => {
					const status = cell.getValue() as string

					const voucherStatusMap = {
						"1": { label: "Unused", Icon: LuCircle, variant: "outline" },
						"2": { label: "In Use", Icon: LuCircleCheck, variant: "default" },
						"3": { label: "Expired", Icon: LuCircleX, variant: "destructive" }
					} as const

					const active = status
						? (status as keyof typeof voucherStatusMap)
						: "1"
					const { label, Icon, variant } = voucherStatusMap[active]

					return (
						<Badge className="font-medium capitalize" variant={variant}>
							{Icon && <Icon className="mr-1" />}
							{label.toLowerCase()}
						</Badge>
					)
				},
				meta: {
					label: "Status",
					variant: "multiSelect",
					options: [
						{ label: "Unused", value: "1", icon: LuCircle },
						{ label: "In Use", value: "2", icon: LuCircleCheck },
						{ label: "Expired", value: "3", icon: LuCircleX }
					]
				},
				enableColumnFilter: true,
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
				accessorKey: "voucherGroup",
				header: ({ column }) => (
					<DataTableColumnHeader column={column} title="Voucher Group" />
				),
				cell: ({ cell }) => {
					const voucherGroup = cell.getValue() as { name: string }
					return voucherGroup ? voucherGroup.name : null
				},
				meta: { label: "Voucher Group" },
				size: 0
			},
			{
				id: "createdAt",
				accessorKey: "createdAt",
				header: ({ column }) => (
					<DataTableColumnHeader column={column} title="Created At" />
				),
				cell: ({ cell }) => formatDate(cell.getValue() as Date),
				meta: { label: "Created At", variant: "dateRange", icon: CalendarIcon },
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
			}
		],
		[]
	)

	const { table } = useDataTable({
		data: data?.vouchers ?? [],
		columns: columns,
		pageCount: data?.pageCount ?? 0,
		initialState: { columnVisibility: { usedTime: false, timePeriod: false } },
		manualPagination: true,
		manualSorting: true,
		manualFiltering: true,
		getRowId: (row) => row.id
	})

	return (
		<DataTable table={table} isLoading={isLoading} rowCount={10}>
			<DataTableToolbar table={table}>
				<SyncVouchersButton />
				<DataTableSortList table={table} align="end" />
			</DataTableToolbar>
		</DataTable>
	)
}
