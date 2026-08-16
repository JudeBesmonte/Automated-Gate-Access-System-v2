"use client"

import { useMemo } from "react"
import { type SubscriptionStatus } from "@prisma/client"
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

import { useGetSubscriptions } from "@/features/admin/plans/lib/hooks"
import { subscriptionParser } from "@/features/admin/plans/lib/search-params"
import { type GetSubscriptionResponse } from "@/features/admin/plans/server/types"

import { UpdateSubscriptionStatusButton } from "./actions/update-subscription-status-button"

export const SubscriptionDataTable = () => {
	const [params] = useQueryStates(subscriptionParser)
	const { data, isLoading } = useGetSubscriptions(params)

	const columns = useMemo<ColumnDef<GetSubscriptionResponse>[]>(
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
				size: 120
			},
			{
				id: "subscriber.name",
				accessorKey: "subscriber.name",
				header: ({ column }) => (
					<DataTableColumnHeader column={column} title="Client Name" />
				),
				meta: { label: "Client Name" }
			},
			{
				id: "plan.name",
				accessorKey: "plan.name",
				header: ({ column }) => (
					<DataTableColumnHeader column={column} title="Plan Name" />
				),
				meta: {
					label: "Plan Name",
					placeholder: "Search plans...",
					variant: "text"
				},
				enableColumnFilter: true
			},
			{
				id: "price",
				accessorKey: "price",
				header: ({ column }) => (
					<DataTableColumnHeader column={column} title="Monthly Payment" />
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
				meta: { label: "Monthly Payment" },
				size: 0
			},
			{
				accessorKey: "subscriptionStatus",
				header: ({ column }) => (
					<DataTableColumnHeader column={column} title="Status" />
				),
				cell: ({ cell }) => {
					const status = cell.getValue() as SubscriptionStatus

					const variants = {
						PENDING: "secondary",
						PROCESSING: "secondary",
						FOR_PAYMENT: "destructive",
						FOR_INSTALLATION: "secondary",
						ACTIVE: "default",
						SUSPENDED: "destructive",
						TERMINATED: "outline"
					} as const

					return <Badge variant={variants[status]}>{status}</Badge>
				},
				meta: { label: "Status" },
				size: 0
			},
			{
				id: "installationDate",
				accessorKey: "installationDate",
				header: ({ column }) => (
					<DataTableColumnHeader column={column} title="Installation Date" />
				),
				cell: ({ cell }) => formatDate(cell.getValue() as Date),
				meta: {
					label: "Installation Date",
					variant: "dateRange",
					icon: CalendarIcon
				},
				enableColumnFilter: true,
				size: 0
			},
			{
				id: "nextBillingDate",
				accessorKey: "nextBillingDate",
				header: ({ column }) => (
					<DataTableColumnHeader column={column} title="Next Billing Date" />
				),
				cell: ({ cell }) => {
					const date = cell.getValue() as Date | null
					return date ? formatDate(date) : "N/A"
				},
				meta: {
					label: "Next Billing Date",
					variant: "dateRange",
					icon: CalendarIcon
				},
				enableColumnFilter: true,
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
					const subscription = row.original
					if (!subscription) return null

					return (
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="ghost" className="h-6 w-6 rounded-sm p-0">
									<span className="sr-only">Open menu</span>
									<MoreHorizontalIcon />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								<UpdateSubscriptionStatusButton
									id={subscription.id}
									currentStatus={subscription.subscriptionStatus}
									customerName={subscription.subscriber.name || undefined}
									planName={subscription.plan.name}
								/>
							</DropdownMenuContent>
						</DropdownMenu>
					)
				},
				size: 20
			}
		],
		[]
	)

	const { table } = useDataTable({
		data: data?.subscriptions ?? [],
		columns: columns,
		pageCount: data?.pageCount ?? 0,
		initialState: { columnVisibility: { updatedAt: false } },
		manualPagination: true,
		manualSorting: true,
		manualFiltering: true,
		getRowId: (row) => row.id
	})

	return (
		<DataTable table={table} isLoading={isLoading} rowCount={10}>
			<DataTableToolbar table={table}>
				<DataTableSortList table={table} align="end" />
			</DataTableToolbar>
		</DataTable>
	)
}
