// src/features/payment-history/components/payment-data-table-toolbar.tsx
"use client"

import { Table } from "@tanstack/react-table"
import { XIcon } from "lucide-react"
import { useQueryStates } from "nuqs"

import { Button } from "@/core/components/ui/button"
import { Input } from "@/core/components/ui/input"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from "@/core/components/ui/select"

import { paymentsSearchParamsParser } from "../lib/search-params"
import { PaymentStatus } from "../server/types"
import { DatePickerWithRange } from "./date-range-picker"

interface PaymentDataTableToolbarProps<TData> {
	table: Table<TData>
}

// Define a unique string value for the "clear filter" option
const CLEAR_FILTER_VALUE = "__CLEAR__"

export function PaymentDataTableToolbar<TData>({
	table
}: PaymentDataTableToolbarProps<TData>) {
	const [searchParams, setSearchParams] = useQueryStates(
		paymentsSearchParamsParser
	)

	const isFiltered =
		!!searchParams.name ||
		!!searchParams.email ||
		!!searchParams.status ||
		!!searchParams.type ||
		(!!searchParams.date && (!!searchParams.date[0] || !!searchParams.date[1]))

	const resetFilters = () => {
		void setSearchParams({
			name: "",
			email: "",
			status: null,
			type: null,
			date: [null, null],
			page: 1
		})
	}

	return (
		<div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
			<div className="flex flex-wrap items-center gap-2">
				<Input
					placeholder="Filter by client name..."
					value={searchParams.name ?? ""}
					onChange={(event) =>
						void setSearchParams({ name: event.target.value || null, page: 1 })
					}
					className="h-9 w-full sm:w-auto lg:w-[200px]"
				/>
				<Input
					placeholder="Filter by email..."
					value={searchParams.email ?? ""}
					onChange={(event) =>
						void setSearchParams({ email: event.target.value || null, page: 1 })
					}
					className="h-9 w-full sm:w-auto lg:w-[200px]"
				/>
				<DatePickerWithRange
					value={searchParams.date}
					onDateChange={(dateRange) =>
						void setSearchParams({ date: dateRange ?? [null, null], page: 1 })
					}
					className="h-9"
				/>

				<Select
					// If searchParams.status is null, use CLEAR_FILTER_VALUE to select "All Statuses"
					// Otherwise, use the status value. If status is null and no placeholder is desired
					// when cleared, you might use an empty string here, but then the "All Statuses"
					// item wouldn't be pre-selected when the filter is clear.
					// For consistency, let's map null to CLEAR_FILTER_VALUE for the Select's value.
					value={searchParams.status ?? CLEAR_FILTER_VALUE}
					onValueChange={(value) => {
						let newStatus: PaymentStatus | null
						if (value === CLEAR_FILTER_VALUE) {
							newStatus = null // Clear the filter
						} else {
							newStatus = value as PaymentStatus
						}
						void setSearchParams({ status: newStatus, page: 1 })
					}}
				>
					<SelectTrigger className="h-9 w-full sm:w-auto lg:w-[180px]">
						<SelectValue placeholder="Filter by status" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value={CLEAR_FILTER_VALUE}>All Statuses</SelectItem>
						{Object.values(PaymentStatus).map((statusValue) => (
							<SelectItem key={statusValue} value={statusValue}>
								{statusValue.charAt(0) + statusValue.slice(1).toLowerCase()}
							</SelectItem>
						))}
					</SelectContent>
				</Select>

				{isFiltered && (
					<Button
						variant="ghost"
						onClick={resetFilters}
						className="h-9 px-2 lg:px-3"
					>
						Reset
						<XIcon className="ml-2 h-4 w-4" />
					</Button>
				)}
			</div>
		</div>
	)
}
