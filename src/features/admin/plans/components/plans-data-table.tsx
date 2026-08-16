"use client"

import { useMemo } from "react"
import { type ColumnDef } from "@tanstack/react-table"
import { useQueryStates } from "nuqs"

import { DataTableColumnHeader } from "@/core/components/data-table/column-header"
import { DataTableSortList } from "@/core/components/data-table/sort-list"
import { DataTable } from "@/core/components/data-table/table"
import { DataTableToolbar } from "@/core/components/data-table/toolbar"
import { Badge } from "@/core/components/ui/badge"
import { Button } from "@/core/components/ui/button"
import { Checkbox } from "@/core/components/ui/checkbox"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger
} from "@/core/components/ui/dropdown-menu"
import { useDataTable } from "@/core/hooks/use-data-table"
import { CalendarIcon, MoreHorizontalIcon } from "@/core/lib/icons"
import { formatDate, formatPeso } from "@/core/lib/utils"

import { CreatePlanButton } from "@/features/admin/plans/components/actions/create-plan-button"
import { DeletePlanModal } from "@/features/admin/plans/components/actions/delete-plan-modal"
import { UpdatePlanButton } from "@/features/admin/plans/components/actions/update-plan-button"
import { useAdminPlans } from "@/features/admin/plans/lib/hooks"
import { planParser } from "@/features/admin/plans/lib/search-params"
import { type GetPlanResponse } from "@/features/admin/plans/server/types"

export const PlansDataTable = () => {
	const [params] = useQueryStates(planParser)
	const { data, isLoading } = useAdminPlans(params)

	const columns = useMemo<ColumnDef<GetPlanResponse>[]>(
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
					placeholder: "Search plans...",
					variant: "text"
				},
				enableColumnFilter: true
			},
			{
				id: "monthlyPrice",
				accessorKey: "monthlyPrice",
				header: ({ column }) => (
					<DataTableColumnHeader column={column} title="Price" />
				),
				cell: ({ cell }) => {
					const price = cell.getValue() as number
					if (price > 0) {
						return (
							<>
								<span>₱</span>
								<span className="ml-1">{formatPeso(price)}</span>
							</>
						)
					}
					return null
				},
				meta: { label: "Price" },
				size: 0
			},
			{
				id: "planType",
				accessorKey: "planType",
				header: ({ column }) => (
					<DataTableColumnHeader column={column} title="Type" />
				),
				cell: ({ row }) => (
					<Badge variant="outline">{row.getValue("planType")}</Badge>
				),
				meta: {
					label: "Type",
					placeholder: "Filter by type...",
					variant: "multiSelect",
					options: [
						{ label: "Education", value: "EDUCATION" },
						{ label: "Government", value: "GOVERNMENT" }
					]
				},
				enableColumnFilter: true
			},
			{
				accessorKey: "features",
				header: ({ column }) => (
					<DataTableColumnHeader column={column} title="Features" />
				),
				cell: ({ row }) => {
					const features = row.original.features
					if (!features || features.length === 0) {
						return null
					}
					return (
						<div className="flex flex-wrap gap-1">
							{features.slice(0, 2).map((feature, i) => (
								<Badge key={i} variant="outline" className="mr-1 max-w-60">
									<span className="truncate">{feature}</span>
								</Badge>
							))}
							{features.length > 2 && (
								<Badge variant="outline">+{features.length - 2} more</Badge>
							)}
						</div>
					)
				},
				meta: { label: "Features" },
				size: 0,
				enableSorting: false
			},
			{
				accessorKey: "hasKiosk",
				header: ({ column }) => (
					<DataTableColumnHeader column={column} title="Kiosk" />
				),
				cell: ({ cell }) => {
					const hasKiosk = cell.getValue() as boolean
					return (
						<Badge variant={hasKiosk ? "default" : "secondary"}>
							{hasKiosk ? "Enabled" : "Disabled"}
						</Badge>
					)
				},
				meta: { label: "Kiosk" },
				size: 0
			},
			{
				accessorKey: "isActive",
				header: ({ column }) => (
					<DataTableColumnHeader column={column} title="Status" />
				),
				cell: ({ cell }) => {
					const isActive = cell.getValue() as boolean
					return (
						<Badge variant={isActive ? "default" : "secondary"}>
							{isActive ? "Active" : "Inactive"}
						</Badge>
					)
				},
				meta: { label: "Status" },
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
				enableColumnFilter: true,
				size: 0
			},
			{
				id: "updatedAt",
				accessorKey: "updatedAt",
				header: ({ column }) => (
					<DataTableColumnHeader column={column} title="Updated At" />
				),
				cell: ({ cell }) => formatDate(cell.getValue() as Date),
				meta: { label: "Updated At" },
				size: 0
			},
			{
				id: "actions",
				enableHiding: false,
				cell: ({ row }) => {
					const plan = row.original
					if (!plan) return null

					return (
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="ghost" className="h-6 w-6 rounded-sm p-0">
									<span className="sr-only">Open menu</span>
									<MoreHorizontalIcon />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								<UpdatePlanButton plan={plan} />
								<DeletePlanModal id={plan.id} name={plan.name} />
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
		data: data?.plans ?? [],
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
				<CreatePlanButton />
				<DataTableSortList table={table} align="end" />
			</DataTableToolbar>
		</DataTable>
	)
}
