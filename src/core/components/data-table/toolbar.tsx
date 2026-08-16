"use client"

import * as React from "react"
import type { Column, Table } from "@tanstack/react-table"

import { DataTableDateFilter } from "@/core/components/data-table/date-filter"
import { DataTableFacetedFilter } from "@/core/components/data-table/faceted-filter"
import { DataTableSliderFilter } from "@/core/components/data-table/slider-filter"
import { DataTableViewOptions } from "@/core/components/data-table/view-options"
import { Button } from "@/core/components/ui/button"
import { Input } from "@/core/components/ui/input"
import { SearchIcon, XIcon } from "@/core/lib/icons"
import { cn } from "@/core/lib/utils"

interface DataTableToolbarProps<TData> extends React.ComponentProps<"div"> {
	table: Table<TData>
}

export function DataTableToolbar<TData>({
	table,
	children,
	className,
	...props
}: DataTableToolbarProps<TData>) {
	const isFiltered = table.getState().columnFilters.length > 0

	const columns = React.useMemo(
		() => table.getAllColumns().filter((column) => column.getCanFilter()),
		[table]
	)

	const onReset = React.useCallback(() => {
		table.resetColumnFilters()
	}, [table])

	return (
		<div
			role="toolbar"
			aria-orientation="horizontal"
			className={cn(
				"flex w-full flex-wrap items-start justify-between gap-2 p-1",
				className
			)}
			{...props}
		>
			<div className="flex flex-1 flex-wrap items-center gap-2">
				{columns.map((column) => (
					<DataTableToolbarFilter key={column.id} column={column} />
				))}
				{isFiltered && (
					<Button
						aria-label="Reset filters"
						variant="outline"
						size="sm"
						className="border-dashed"
						onClick={onReset}
					>
						<XIcon />
						Reset
					</Button>
				)}
			</div>
			<div className="flex flex-row-reverse items-center gap-2">
				{children}
				<DataTableViewOptions table={table} />
			</div>
		</div>
	)
}
interface DataTableToolbarFilterProps<TData> {
	column: Column<TData>
}

function DataTableToolbarFilter<TData>({
	column
}: DataTableToolbarFilterProps<TData>) {
	{
		const columnMeta = column.columnDef.meta

		const onFilterRender = React.useCallback(() => {
			if (!columnMeta?.variant) return null

			switch (columnMeta.variant) {
				case "text":
					return (
						<div className="relative">
							<SearchIcon className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 transform text-muted-foreground" />
							<Input
								placeholder={columnMeta.placeholder ?? columnMeta.label}
								value={(column.getFilterValue() as string) ?? ""}
								onChange={(event) => column.setFilterValue(event.target.value)}
								className="h-8 w-40 pl-8 lg:w-56"
							/>
						</div>
					)

				case "number":
					return (
						<div className="relative">
							<Input
								type="number"
								inputMode="numeric"
								placeholder={columnMeta.placeholder ?? columnMeta.label}
								value={(column.getFilterValue() as string) ?? ""}
								onChange={(event) => column.setFilterValue(event.target.value)}
								className={cn("h-8 w-[120px]", columnMeta.unit && "pr-8")}
							/>
							{columnMeta.unit && (
								<span className="absolute bottom-0 right-0 top-0 flex items-center rounded-r-md bg-accent px-2 text-sm text-muted-foreground">
									{columnMeta.unit}
								</span>
							)}
						</div>
					)

				case "range":
					return (
						<DataTableSliderFilter
							column={column}
							title={columnMeta.label ?? column.id}
						/>
					)

				case "date":
				case "dateRange":
					return (
						<DataTableDateFilter
							column={column}
							title={columnMeta.label ?? column.id}
							multiple={columnMeta.variant === "dateRange"}
						/>
					)

				case "select":
				case "multiSelect":
					return (
						<DataTableFacetedFilter
							column={column}
							title={columnMeta.label ?? column.id}
							options={columnMeta.options ?? []}
							multiple={columnMeta.variant === "multiSelect"}
						/>
					)

				default:
					return null
			}
		}, [column, columnMeta])

		return onFilterRender()
	}
}
