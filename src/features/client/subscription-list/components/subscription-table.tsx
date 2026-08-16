"use client"

import { useMemo } from "react"
import { SubscriptionStatus } from "@prisma/client"
import { type ColumnDef } from "@tanstack/react-table"
import { useSession } from "next-auth/react"
import { useQueryStates } from "nuqs"

import { DataTableColumnHeader } from "@/core/components/data-table/column-header"
import { DataTable } from "@/core/components/data-table/table"
import { DataTableToolbar } from "@/core/components/data-table/toolbar"
import { Badge } from "@/core/components/ui/badge"
import { Button } from "@/core/components/ui/button"
import { Checkbox } from "@/core/components/ui/checkbox"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from "@/core/components/ui/dropdown-menu"
import { useClientSubscriptions } from "@/core/hooks/use-client-subscriptions"
import { useDataTable } from "@/core/hooks/use-data-table"
import { MoreHorizontalIcon } from "@/core/lib/icons"
import { formatDate } from "@/core/lib/utils"

import { subscriptionsSearchParamsParser } from "@/features/client/subscription-list/lib/search-params"

interface Subscription {
	id: string
	price: number
	discount: number
	installationDate: Date | null
	subscriptionStatus: SubscriptionStatus
	createdAt: Date
	updatedAt: Date
	planId: string
	subscriberId: string
	plan: {
		id: string
		name: string
		slug: string
		monthlyPrice: number
		features: string[]
		inclusions: string[]
		addons: string[]
		equipment: string[]
		hasKiosk: boolean
	} | null
}

const getStatusColor = (status: string) => {
	switch (status) {
		case "active":
			return "bg-green-100 text-green-800"
		case "suspended":
			return "bg-amber-100 text-amber-800"
		case "terminated":
			return "bg-red-100 text-red-800"
		case "pending":
		case "for_payment":
		case "processing":
		case "for_installation":
			return "bg-blue-100 text-blue-800"
		default:
			return "bg-gray-100 text-gray-800"
	}
}

const getStatusText = (status: string) => {
	switch (status) {
		case "active":
			return "Active"
		case "suspended":
			return "Suspended"
		case "terminated":
			return "Terminated"
		case "pending":
			return "Pending"
		case "for_payment":
			return "For Payment"
		case "processing":
			return "Processing"
		case "for_installation":
			return "For Installation"
		default:
			return status.charAt(0).toUpperCase() + status.slice(1)
	}
}

export const SubscriptionTable = () => {
	const [params] = useQueryStates(subscriptionsSearchParamsParser)
	const { data: session } = useSession()
	const { data: subscriptions, isLoading } = useClientSubscriptions(
		session?.user?.id
	)

	const subscriptionData = subscriptions ?? []

	const columns = useMemo<ColumnDef<Subscription>[]>(
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
				accessorFn: (row) => row.plan?.name ?? "",
				header: ({ column }) => (
					<DataTableColumnHeader column={column} title="Plan" />
				),
				cell: ({ row }) => {
					const plan = row.original.plan
					return <div className="font-medium">{plan?.name}</div>
				},
				meta: {
					label: "Plan",
					placeholder: "Search by plan name...",
					variant: "text",
					paramId: "name"
				},
				enableColumnFilter: true
			},
			{
				id: "status",
				accessorKey: "subscriptionStatus",
				header: ({ column }) => (
					<DataTableColumnHeader column={column} title="Status" />
				),
				cell: ({ row }) => {
					const status = row.getValue("status")
					return (
						<Badge
							variant="outline"
							className={getStatusColor((status as string).toLowerCase())}
						>
							{getStatusText((status as string).toLowerCase())}
						</Badge>
					)
				},
				meta: {
					label: "Status",
					placeholder: "Filter by status...",
					variant: "select",
					options: [
						{ label: "Active", value: "ACTIVE" },
						{ label: "Suspended", value: "SUSPENDED" },
						{ label: "Terminated", value: "TERMINATED" },
						{ label: "Pending", value: "PENDING" },
						{ label: "For Payment", value: "FOR_PAYMENT" },
						{ label: "Processing", value: "PROCESSING" },
						{ label: "For Installation", value: "FOR_INSTALLATION" }
					],
					paramId: "status"
				},
				enableColumnFilter: true
			},
			{
				id: "price",
				accessorKey: "price",
				header: ({ column }) => (
					<DataTableColumnHeader column={column} title="Price" />
				),
				cell: ({ row }) => {
					const price = row.getValue("price")
					const discount = row.original.discount
					const finalPrice = Number(price) - (Number(price) * discount) / 100
					return <div>${finalPrice.toFixed(2)}/mo</div>
				}
			},
			{
				id: "installationDate",
				accessorKey: "installationDate",
				header: ({ column }) => (
					<DataTableColumnHeader column={column} title="Installation Date" />
				),
				cell: ({ row }) => {
					const date = row.getValue("installationDate")
					return date
						? formatDate(new Date(date as string).toISOString())
						: "Not installed"
				}
			},
			{
				id: "actions",
				cell: ({ row }) => {
					const status = row.original.subscriptionStatus
					return (
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="ghost" size="icon" className="h-8 w-8">
									<MoreHorizontalIcon className="h-4 w-4" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								<DropdownMenuLabel>Actions</DropdownMenuLabel>
								<DropdownMenuItem
									disabled={status === SubscriptionStatus.TERMINATED}
								>
									Manage Subscription
								</DropdownMenuItem>
								<DropdownMenuItem>Download Invoice</DropdownMenuItem>
								<DropdownMenuSeparator />
								<DropdownMenuItem
									className="text-red-600 focus:text-red-600"
									disabled={status === SubscriptionStatus.TERMINATED}
								>
									Cancel Subscription
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					)
				}
			}
		],
		[]
	)

	const { table } = useDataTable({
		data: subscriptionData,
		columns,
		pageCount: Math.ceil(subscriptionData.length / params.perPage),
		manualPagination: true,
		manualSorting: true,
		manualFiltering: true,
		getRowId: (row) => row.id
	})

	return (
		<DataTable
			table={table}
			isLoading={isLoading}
			rowCount={subscriptionData.length}
		>
			<DataTableToolbar table={table} />
		</DataTable>
	)
}
