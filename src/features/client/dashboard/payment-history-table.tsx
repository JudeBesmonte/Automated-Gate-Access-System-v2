"use client"

import Link from "next/link"
import { useState } from "react"
import type { ColumnDef } from "@tanstack/react-table"
import {
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
	type ColumnFiltersState,
	type SortingState
} from "@tanstack/react-table"
import { AlertCircle, ArrowUpDown, CheckCircle, Clock } from "lucide-react"

import { DataTable } from "@/core/components/data-table/table"
import { Badge } from "@/core/components/ui/badge"
import { Button } from "@/core/components/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from "@/core/components/ui/card"

export type Payment = {
	id: string
	date: string
	amount: number
	status: "paid" | "pending" | "failed"
	description: string
	method: string
}

interface PaymentHistoryTableProps {
	data: Payment[]
}

export function PaymentHistoryTable({ data }: PaymentHistoryTableProps) {
	const [sorting, setSorting] = useState<SortingState>([])
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

	const getStatusIcon = (status: string) => {
		switch (status) {
			case "paid":
				return <CheckCircle className="h-4 w-4 text-green-600" />
			case "pending":
				return <Clock className="h-4 w-4 text-yellow-600" />
			case "failed":
				return <AlertCircle className="h-4 w-4 text-red-600" />
			default:
				return null
		}
	}

	const getStatusBadge = (status: string) => {
		switch (status) {
			case "paid":
				return (
					<Badge variant="secondary" className="bg-green-100 text-green-800">
						Paid
					</Badge>
				)
			case "pending":
				return (
					<Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
						Pending
					</Badge>
				)
			case "failed":
				return <Badge variant="destructive">Failed</Badge>
			default:
				return <Badge variant="outline">{status}</Badge>
		}
	}

	const columns: ColumnDef<Payment>[] = [
		{
			accessorKey: "date",
			header: ({ column }) => {
				return (
					<Button
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
						className="h-8 px-2 lg:px-3"
					>
						Date
						<ArrowUpDown className="ml-2 h-4 w-4" />
					</Button>
				)
			},
			cell: ({ row }) => {
				const date = new Date(row.getValue("date"))
				return <div className="font-medium">{date.toLocaleDateString()}</div>
			}
		},
		{
			accessorKey: "description",
			header: "Description",
			cell: ({ row }) => {
				return (
					<div className="max-w-[300px] truncate">
						{row.getValue("description")}
					</div>
				)
			}
		},
		{
			accessorKey: "method",
			header: "Payment Method",
			cell: ({ row }) => {
				return (
					<div className="text-muted-foreground">{row.getValue("method")}</div>
				)
			}
		},
		{
			accessorKey: "status",
			header: "Status",
			cell: ({ row }) => {
				const status = row.getValue("status") as string
				return (
					<div className="flex items-center gap-2">
						{getStatusIcon(status)}
						{getStatusBadge(status)}
					</div>
				)
			}
		},
		{
			accessorKey: "amount",
			header: ({ column }) => {
				return (
					<Button
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
						className="ml-auto h-8 px-2 lg:px-3"
					>
						Amount
						<ArrowUpDown className="ml-2 h-4 w-4" />
					</Button>
				)
			},
			cell: ({ row }) => {
				const amount = Number.parseFloat(row.getValue("amount"))
				const formatted = new Intl.NumberFormat("en-US", {
					style: "currency",
					currency: "USD"
				}).format(amount)
				return <div className="text-right font-medium">{formatted}</div>
			}
		}
	]

	const table = useReactTable({
		data,
		columns,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		state: {
			sorting,
			columnFilters
		}
	})

	return (
		<Card className="rounded-md">
			<CardHeader>
				<CardTitle>Payment History</CardTitle>
				<CardDescription>
					Your recent payment transactions and billing history
				</CardDescription>
			</CardHeader>
			<CardContent>
				<DataTable table={table} />
			</CardContent>
			<CardFooter>
				<Button variant="outline" className="ml-auto" asChild>
					<Link href="/client/invoices">View All Payments</Link>
				</Button>
			</CardFooter>
		</Card>
	)
}
