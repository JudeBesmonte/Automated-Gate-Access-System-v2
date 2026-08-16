"use client"

import { useMemo } from "react"
// Import SortingState from TanStack Table, which is ColumnSort[]
// ColumnSort is { id: string; desc: boolean; }
import { type ColumnDef, type SortingState } from "@tanstack/react-table"
import { format } from "date-fns"
import { useQueryStates } from "nuqs"

import { DataTableColumnHeader } from "@/core/components/data-table/column-header"
import { DataTable } from "@/core/components/data-table/table"
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
import { useDataTable } from "@/core/hooks/use-data-table"
import { MoreHorizontalIcon } from "@/core/lib/icons"

import { useGetPayments } from "../lib/hooks"
import {
	paymentsSearchParamsParser,
	type PaymentsSearchParams
} from "../lib/search-params"
import {
	PaymentStatus,
	PaymentType,
	type GetPaymentResponse
} from "../server/types"
import { PaymentDataTableToolbar } from "./payment-data-table-toolbar"

// This is the type that `searchParams.sort` currently resolves to.
// Due to `ExtendedColumnSort<unknown>`, it might be effectively { id: never; desc: boolean; }[] | null.
type NuqsSortParamTypeFromParser = PaymentsSearchParams["sort"]

export const PaymentDataTable = () => {
	const [searchParams, setSearchParams] = useQueryStates(
		paymentsSearchParamsParser
	)

	const { data: paginatedData, isLoading, error } = useGetPayments()

	const payments = useMemo(() => paginatedData?.payments ?? [], [paginatedData])
	const pageCount = useMemo(
		() => paginatedData?.pageCount ?? 0,
		[paginatedData]
	)
	const totalCount = useMemo(() => paginatedData?.total ?? 0, [paginatedData])

	const columns = useMemo<ColumnDef<GetPaymentResponse>[]>(
		() => [
			{
				id: "select",
				header: ({ table }) => (
					<div className="flex w-4 items-center justify-center">
						<Checkbox
							className="bg-accent text-accent-foreground data-[state=checked]:bg-accent data-[state=checked]:text-primary dark:bg-muted dark:data-[state=checked]:text-muted-foreground"
							checked={
								table.getIsAllPageRowsSelected() ||
								(table.getIsSomePageRowsSelected() ? "indeterminate" : false)
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
				accessorKey: "billingName",
				header: ({ column }) => (
					<DataTableColumnHeader column={column} title="Billing Name" />
				),
				cell: ({ row }) => <span>{row.getValue("billingName") as string}</span>,
				meta: { label: "Billing Name", variant: "text" },
				enableSorting: true
			},
			{
				accessorKey: "status",
				header: ({ column }) => (
					<DataTableColumnHeader column={column} title="Status" />
				),
				cell: ({ row }) => {
					const status = row.getValue("status") as PaymentStatus
					return (
						<Badge variant={"default"} className="capitalize">
							{status.toLowerCase()}
						</Badge>
					)
				},
				meta: {
					label: "Status",
					variant: "multiSelect",
					options: Object.values(PaymentStatus).map((s) => ({
						label: s.charAt(0) + s.slice(1).toLowerCase(),
						value: s
					}))
				},
				enableSorting: true
			},
			{
				accessorKey: "type",
				header: ({ column }) => (
					<DataTableColumnHeader column={column} title="Method" />
				),
				cell: ({ row }) => {
					const type = row.getValue("type") as PaymentType
					return (
						<span className="capitalize">
							{type.toLowerCase().replace("_", " ")}
						</span>
					)
				},
				meta: {
					label: "Payment Method",
					variant: "multiSelect",
					options: Object.values(PaymentType).map((pt) => ({
						label: pt.charAt(0) + pt.slice(1).toLowerCase().replace("_", " "),
						value: pt
					}))
				},
				enableSorting: true
			},
			{
				accessorKey: "billingEmail",
				header: ({ column }) => (
					<DataTableColumnHeader column={column} title="Billing Email" />
				),
				cell: ({ row }) => (
					<span>{row.getValue("billingEmail") as string}</span>
				),
				meta: { label: "Billing Email", variant: "text" },
				enableSorting: true
			},
			{
				id: "planName",
				accessorFn: (row) => row.subscriptionInfo?.plan?.name ?? "N/A",
				header: ({ column }) => (
					<DataTableColumnHeader column={column} title="Plan Name" />
				),
				cell: ({ getValue }) => <span>{getValue() as string}</span>,
				meta: { label: "Plan Name", variant: "text" },
				enableSorting: true
			},
			{
				id: "subscriptionPrice",
				accessorFn: (row) => row.subscriptionInfo?.price,
				header: ({ column }) => (
					<DataTableColumnHeader column={column} title="Sub Price" />
				),
				cell: ({ getValue }) => {
					const price = getValue() as number | null | undefined
					return price != null ? (
						<span>${price.toFixed(2)}</span>
					) : (
						<span>N/A</span>
					)
				},
				meta: { label: "Subscription Price", variant: "text" },
				enableSorting: true
			},
			{
				id: "subscriberName",
				accessorFn: (row) => row.subscriptionInfo?.subscriber?.name ?? "N/A",
				header: ({ column }) => (
					<DataTableColumnHeader column={column} title="Subscriber" />
				),
				cell: ({ getValue }) => <span>{getValue() as string}</span>,
				meta: { label: "Subscriber Name", variant: "text" },
				enableSorting: true
			},
			{
				accessorKey: "amount",
				header: ({ column }) => (
					<DataTableColumnHeader column={column} title="Amount Paid" />
				),
				cell: ({ row }) => (
					<span>
						${(parseFloat(row.getValue("amount") as string) || 0).toFixed(2)}
					</span>
				),
				meta: { label: "Amount Paid", variant: "text" },
				enableSorting: true
			},
			{
				accessorKey: "paymentDate",
				header: ({ column }) => (
					<DataTableColumnHeader column={column} title="Payment Date" />
				),
				cell: ({ cell }) => {
					const dateValue = cell.getValue()
					if (!dateValue) return <span>-</span>
					try {
						const date =
							typeof dateValue === "string"
								? new Date(dateValue)
								: (dateValue as Date)
						return <span>{format(date, "PPP")}</span>
					} catch {
						return <span>Invalid Date</span>
					}
				},
				meta: { label: "Payment Date", variant: "dateRange" },
				enableSorting: true
			},
			{
				id: "actions",
				enableHiding: false,
				cell: ({ row }) => {
					const payment = row.original
					return (
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="ghost" size="icon" className="h-8 w-8 p-0">
									<span className="sr-only">Open menu</span>
									<MoreHorizontalIcon className="h-4 w-4" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end" className="w-40">
								<DropdownMenuLabel>Actions</DropdownMenuLabel>
								<DropdownMenuItem
									onClick={() => navigator.clipboard.writeText(payment.id)}
								>
									Copy Payment ID
								</DropdownMenuItem>
								<DropdownMenuSeparator />
								<DropdownMenuItem>View Details</DropdownMenuItem>
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
		data: payments,
		columns,
		pageCount: pageCount,
		initialState: {
			pagination: {
				pageIndex: searchParams.page - 1,
				pageSize: searchParams.perPage
			},
			// Cast `searchParams.sort` to `SortingState` (ColumnSort[]).
			// This tells TypeScript to trust that, at runtime, the structure will be compatible
			// because the Zod schema in the parser ensures `id` is a string.
			columnFilters: [
				...(searchParams.name
					? [{ id: "billingName", value: searchParams.name }]
					: []),
				...(searchParams.email
					? [{ id: "billingEmail", value: searchParams.email }]
					: []),
				...(searchParams.status
					? [{ id: "status", value: [searchParams.status] }]
					: []),
				...(searchParams.type
					? [{ id: "type", value: [searchParams.type] }]
					: []),
				...(searchParams.date && (searchParams.date[0] || searchParams.date[1])
					? [{ id: "paymentDate", value: searchParams.date }]
					: [])
			]
		},
		onPaginationChange: (updater) => {
			const currentPagination = {
				pageIndex: searchParams.page - 1,
				pageSize: searchParams.perPage
			}
			const newPagination =
				typeof updater === "function" ? updater(currentPagination) : updater
			void setSearchParams({
				page: newPagination.pageIndex + 1,
				perPage: newPagination.pageSize
			})
		},
		onSortingChange: (updater) => {
			// `currentSortingFromNuqs` is `NuqsSortParamTypeFromParser`
			const currentSortingFromNuqs = searchParams.sort ?? []
			let newSortingFromTable: SortingState // This is `ColumnSort[]`

			if (typeof updater === "function") {
				// The updater expects `SortingState`. We cast `currentSortingFromNuqs`
				// because we know its runtime structure (from Zod) is compatible.
				newSortingFromTable = updater(
					currentSortingFromNuqs as unknown as SortingState
				)
			} else {
				newSortingFromTable = updater // `updater` itself is `SortingState`
			}

			// `newSortingFromTable` is `ColumnSort[]`.
			// We cast it to `NuqsSortParamTypeFromParser` when setting it back.
			// This tells TypeScript that the structure produced by TanStack Table
			// is acceptable for the nuqs parser (due to Zod validation).
			void setSearchParams({
				sort:
					newSortingFromTable.length > 0
						? (newSortingFromTable as unknown as NuqsSortParamTypeFromParser)
						: null
			})
		},
		onColumnFiltersChange: (updater) => {
			const currentColumnFilters = table.getState().columnFilters
			const newFilters =
				typeof updater === "function" ? updater(currentColumnFilters) : updater

			const updates: Partial<PaymentsSearchParams> = {
				name: "",
				email: "",
				status: null,
				type: null,
				date: [null, null]
			}
			newFilters.forEach((filter) => {
				const fVal = filter.value
				switch (filter.id) {
					case "billingName":
					case "planName":
					case "subscriberName":
						if (!updates.name && typeof fVal === "string") updates.name = fVal
						break
					case "billingEmail":
						if (typeof fVal === "string") updates.email = fVal
						break
					case "status":
						updates.status = (
							Array.isArray(fVal) ? fVal[0] : fVal
						) as PaymentStatus
						break
					case "type":
						updates.type = (Array.isArray(fVal) ? fVal[0] : fVal) as PaymentType
						break
					case "paymentDate":
						updates.date = fVal as [Date | null, Date | null]
						break
				}
			})
			void setSearchParams({ ...updates, page: 1 })
		},
		manualPagination: true,
		manualSorting: true,
		manualFiltering: true,
		getRowId: (row) => row.id
	})

	if (error) {
		return (
			<div className="flex items-center justify-center p-8">
				<div className="text-center">
					<p className="text-destructive">Error loading payments</p>
					<p className="text-sm text-muted-foreground">
						{error instanceof Error
							? error.message
							: "An unknown error occurred"}
					</p>
				</div>
			</div>
		)
	}

	return (
		<div className="space-y-4">
			<PaymentDataTableToolbar table={table} />
			<DataTable
				className="rounded-md border"
				table={table}
				isLoading={isLoading}
				rowCount={totalCount}
			/>
		</div>
	)
}
