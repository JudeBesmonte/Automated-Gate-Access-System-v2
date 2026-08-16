import type * as React from "react"
import { flexRender, type Table as TanstackTable } from "@tanstack/react-table"

import { DataTablePagination } from "@/core/components/data-table/pagination"
import { Skeleton } from "@/core/components/ui/skeleton"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from "@/core/components/ui/table"
import { getCommonPinningStyles } from "@/core/lib/data-table"
import { cn } from "@/core/lib/utils"

interface DataTableProps<TData> extends React.ComponentProps<"div"> {
	table: TanstackTable<TData>
	actionBar?: React.ReactNode
	isLoading?: boolean
	rowCount?: number
}

export function DataTable<TData>({
	table,
	actionBar,
	children,
	className,
	isLoading = false,
	rowCount = 10,
	...props
}: DataTableProps<TData>) {
	return (
		<div className={cn("flex w-full flex-col gap-2.5", className)} {...props}>
			{children}
			<div className="overflow-auto rounded-md border">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<TableHead
										key={header.id}
										colSpan={header.colSpan}
										style={{
											...getCommonPinningStyles({ column: header.column })
										}}
									>
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
						{isLoading ? (
							Array.from({ length: rowCount }).map((_, i) => (
								<TableRow
									key={`skeleton-${i}`}
									className="hover:bg-transparent"
								>
									{table.getVisibleFlatColumns().map((column) => (
										<TableCell
											key={`skeleton-${i}-${column.id}`}
											style={{
												...getCommonPinningStyles({ column })
											}}
										>
											<Skeleton className="h-6 w-full" />
										</TableCell>
									))}
								</TableRow>
							))
						) : table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && "selected"}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell
											key={cell.id}
											className="py-2"
											style={{
												...getCommonPinningStyles({ column: cell.column })
											}}
										>
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
									colSpan={table.getAllColumns().length}
									className="h-24 text-center"
								>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>

			{isLoading ? (
				<div className="flex w-full items-center justify-between gap-4 overflow-auto p-1 sm:gap-8">
					<Skeleton className="h-7 w-40 shrink-0 bg-accent" />
					<div className="flex items-center gap-4 sm:gap-6 lg:gap-8">
						<div className="flex items-center gap-2">
							<Skeleton className="h-7 w-24 bg-accent" />
							<Skeleton className="h-7 w-[4.5rem] bg-accent" />
						</div>
						<div className="flex items-center justify-center text-sm font-medium">
							<Skeleton className="h-7 w-20 bg-accent" />
						</div>
						<div className="flex items-center gap-2">
							<Skeleton className="hidden size-7 bg-accent lg:block" />
							<Skeleton className="size-7 bg-accent" />
							<Skeleton className="size-7 bg-accent" />
							<Skeleton className="hidden size-7 bg-accent lg:block" />
						</div>
					</div>
				</div>
			) : (
				<DataTablePagination table={table} />
			)}

			{actionBar &&
				table.getFilteredSelectedRowModel().rows.length > 0 &&
				actionBar}
		</div>
	)
}
