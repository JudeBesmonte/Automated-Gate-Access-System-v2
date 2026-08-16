"use client"

import type { Column } from "@tanstack/react-table"

import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from "@/core/components/ui/dropdown-menu"
import {
	ArrowDownIcon,
	ArrowResetIcon,
	ArrowUpIcon,
	ChevronsUpDownIcon,
	EyeNoneIcon
} from "@/core/lib/icons"
import { cn } from "@/core/lib/utils"

interface DataTableColumnHeaderProps<TData, TValue>
	extends React.ComponentProps<typeof DropdownMenuTrigger> {
	column: Column<TData, TValue>
	title: string
}

export function DataTableColumnHeader<TData, TValue>({
	column,
	title,
	className,
	...props
}: DataTableColumnHeaderProps<TData, TValue>) {
	if (!column.getCanSort() && !column.getCanHide()) {
		return <div className={cn(className)}>{title}</div>
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				className={cn(
					"-ml-2.5 flex h-7 items-center gap-1.5 whitespace-nowrap rounded-md px-2 py-1.5 hover:bg-muted/50 focus:outline-none focus:ring-1 focus:ring-ring data-[state=open]:bg-muted/50 [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:text-primary-foreground/60",
					className
				)}
				{...props}
			>
				{title}
				{column.getCanSort() &&
					(column.getIsSorted() === "desc" ? (
						<ArrowDownIcon />
					) : column.getIsSorted() === "asc" ? (
						<ArrowUpIcon />
					) : (
						<ChevronsUpDownIcon />
					))}
			</DropdownMenuTrigger>
			<DropdownMenuContent align="start" className="w-28">
				{column.getCanSort() && (
					<>
						<DropdownMenuCheckboxItem
							className="relative pl-2 pr-8 [&>span:first-child]:left-auto [&>span:first-child]:right-2 [&_svg]:mr-2 [&_svg]:text-muted-foreground"
							checked={column.getIsSorted() === "asc"}
							onClick={() => column.toggleSorting(false)}
						>
							<ArrowUpIcon />
							Asc
						</DropdownMenuCheckboxItem>
						<DropdownMenuCheckboxItem
							className="relative pl-2 pr-8 [&>span:first-child]:left-auto [&>span:first-child]:right-2 [&_svg]:mr-2 [&_svg]:text-muted-foreground"
							checked={column.getIsSorted() === "desc"}
							onClick={() => column.toggleSorting(true)}
						>
							<ArrowDownIcon />
							Desc
						</DropdownMenuCheckboxItem>
						{column.getIsSorted() && (
							<DropdownMenuItem
								className="pl-2 [&_svg]:text-muted-foreground"
								onClick={() => column.clearSorting()}
							>
								<ArrowResetIcon />
								Reset
							</DropdownMenuItem>
						)}
					</>
				)}

				<DropdownMenuSeparator />

				{column.getCanHide() && (
					<DropdownMenuCheckboxItem
						className="relative pl-2 pr-8 [&>span:first-child]:left-auto [&>span:first-child]:right-2 [&_svg]:mr-2 [&_svg]:text-muted-foreground"
						checked={!column.getIsVisible()}
						onClick={() => column.toggleVisibility(false)}
					>
						<EyeNoneIcon />
						Hide
					</DropdownMenuCheckboxItem>
				)}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
