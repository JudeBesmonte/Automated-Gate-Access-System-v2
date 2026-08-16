"use client"

import { useMemo } from "react"
import {
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
	type ColumnDef
} from "@tanstack/react-table"
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
	DropdownMenuTrigger
} from "@/core/components/ui/dropdown-menu"
import { MoreHorizontalIcon } from "@/core/lib/icons"
import { formatDate, formatPeso } from "@/core/lib/utils"

import { invoicesSearchParamsParser } from "@/features/client/invoices/lib/search-params"

// Mock data for now
const mockInvoices = [
	{
		id: "INV-001",
		invoiceNumber: "INV-2024-001",
		status: "PAID",
		amount: 1500.0,
		createdAt: "2024-03-01",
		dueDate: "2024-03-15",
		description: "Monthly Subscription - March 2024"
	},
	{
		id: "INV-002",
		invoiceNumber: "INV-2024-002",
		status: "PENDING",
		amount: 1500.0,
		createdAt: "2024-04-01",
		dueDate: "2024-04-15",
		description: "Monthly Subscription - April 2024"
	},
	{
		id: "INV-003",
		invoiceNumber: "INV-2024-003",
		status: "OVERDUE",
		amount: 1500.0,
		createdAt: "2024-02-01",
		dueDate: "2024-02-15",
		description: "Monthly Subscription - February 2024"
	}
]

export const InvoiceTable = () => {
	const [params] = useQueryStates(invoicesSearchParamsParser)

	const columns = useMemo<ColumnDef<(typeof mockInvoices)[number]>[]>(
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
				id: "invoiceNumber",
				accessorKey: "invoiceNumber",
				header: ({ column }) => (
					<DataTableColumnHeader column={column} title="Invoice #" />
				),
				meta: {
					label: "Invoice Number",
					placeholder: "Search invoices...",
					variant: "text"
				},
				enableColumnFilter: true
			},
			{
				id: "status",
				accessorKey: "status",
				header: ({ column }) => (
					<DataTableColumnHeader column={column} title="Status" />
				),
				cell: ({ row }) => {
					const status = row.getValue("status") as string
					return (
						<Badge
							variant={
								status === "PAID"
									? "default"
									: status === "PENDING"
										? "secondary"
										: "destructive"
							}
						>
							{status}
						</Badge>
					)
				},
				meta: {
					label: "Status",
					placeholder: "Filter by status...",
					variant: "select",
					options: [
						{ label: "Paid", value: "PAID" },
						{ label: "Pending", value: "PENDING" },
						{ label: "Overdue", value: "OVERDUE" }
					]
				},
				enableColumnFilter: true
			},
			{
				id: "amount",
				accessorKey: "amount",
				header: ({ column }) => (
					<DataTableColumnHeader column={column} title="Amount" />
				),
				cell: ({ row }) => {
					const amount = row.getValue("amount") as number
					return formatPeso(amount)
				}
			},
			{
				id: "dueDate",
				accessorKey: "dueDate",
				header: ({ column }) => (
					<DataTableColumnHeader column={column} title="Due Date" />
				),
				cell: ({ row }) => {
					const date = row.getValue("dueDate") as string
					return formatDate(date)
				}
			},
			{
				id: "actions",
				cell: ({ row }) => {
					return (
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									variant="ghost"
									className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
								>
									<MoreHorizontalIcon className="h-4 w-4" />
									<span className="sr-only">Open menu</span>
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end" className="w-[160px]">
								<DropdownMenuItem>View Details</DropdownMenuItem>
								<DropdownMenuItem>Download PDF</DropdownMenuItem>
								<DropdownMenuItem>Send Reminder</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					)
				}
			}
		],
		[]
	)

	const table = useReactTable({
		data: mockInvoices,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		state: {
			pagination: {
				pageIndex: params.page - 1,
				pageSize: params.perPage
			},
			sorting: params.sort
		},
		pageCount: Math.ceil(mockInvoices.length / params.perPage),
		manualPagination: true,
		manualSorting: true
	})

	return (
		<DataTable table={table} rowCount={10}>
			<DataTableToolbar table={table} />
		</DataTable>
	)
}
