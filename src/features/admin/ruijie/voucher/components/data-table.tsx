"use client"

import { useState } from "react"
import {
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	useReactTable,
	type ColumnDef,
	type ColumnFiltersState
} from "@tanstack/react-table"

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from "@/core/components/ui/table"

import { DataTableToolbar } from "@/features/admin/ruijie/voucher/components/data-table-toolbar"
import type { GetVoucherParams } from "@/features/admin/ruijie/voucher/server/type"

interface DataTableProps<TData> extends GetVoucherParams {
	columns: ColumnDef<TData>[]
	data: TData[]
}

export function DataTable<TData>({
	columns,
	data,
	projectId,
	groupId
}: DataTableProps<TData>) {
	const [globalFilter, setGlobalFilter] = useState("")
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

	const table = useReactTable({
		data,
		columns,
		state: { globalFilter, columnFilters },
		onGlobalFilterChange: setGlobalFilter,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel()
	})

	return (
		<div className="flex w-full flex-col gap-4">
			<DataTableToolbar
				globalFilter={globalFilter}
				setGlobalFilter={setGlobalFilter}
				projectId={projectId}
				groupId={groupId}
			/>

			<div className="rounded-md border">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<TableHead key={header.id}>
										{header.isPlaceholder
											? null
											: flexRender(
													header.column.columnDef.header,
													header.getContext()
												)}
									</TableHead>
								))}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow key={row.id}>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center"
								>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
		</div>
	)
}
