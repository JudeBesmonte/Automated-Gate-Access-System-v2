import { Skeleton } from "@/core/components/ui/skeleton"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from "@/core/components/ui/table"
import { cn } from "@/core/lib/utils"

interface DataTableSkeletonProps extends React.ComponentProps<"div"> {
	columnCount: number
	rowCount?: number
	cellWidths?: string[]
	withViewOptions?: boolean
	withPagination?: boolean
	shrinkZero?: boolean
}

export function DataTableSkeleton({
	columnCount,
	rowCount = 10,
	cellWidths = ["auto"],
	withViewOptions = true,
	withPagination = true,
	shrinkZero = false,
	className,
	...props
}: DataTableSkeletonProps) {
	const cozyCellWidths = Array.from(
		{ length: columnCount },
		(_, index) => cellWidths[index % cellWidths.length] ?? "auto"
	)

	return (
		<div
			className={cn("flex w-full flex-col gap-2.5 overflow-auto", className)}
			{...props}
		>
			<div className="flex w-full items-center justify-between gap-2 overflow-auto p-1">
				<div className="flex flex-1 items-center justify-between gap-2">
					<div className="flex gap-2">
						<Skeleton className="h-8 w-56 border-dashed bg-accent" />
						<Skeleton className="h-8 w-[4.5rem] border-dashed bg-accent" />
					</div>
					<div className="flex gap-2">
						<Skeleton className="h-8 w-[4.5rem] border-dashed bg-accent" />
						<Skeleton className="h-8 w-[4.5rem] border-dashed bg-accent" />
					</div>
				</div>
				{withViewOptions ? (
					<Skeleton className="ml-auto hidden h-8 w-32 bg-accent lg:flex" />
				) : null}
			</div>

			<div className="overflow-auto rounded-md border">
				<Table>
					<TableHeader className="bg-muted/20">
						{Array.from({ length: 1 }).map((_, i) => (
							<TableRow key={i} className="hover:bg-transparent">
								{Array.from({ length: columnCount }).map((_, j) => (
									<TableHead
										key={j}
										style={{
											width: cozyCellWidths[j],
											minWidth: shrinkZero ? cozyCellWidths[j] : "auto"
										}}
									>
										<Skeleton className="h-7 w-full bg-muted/40" />
									</TableHead>
								))}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{Array.from({ length: rowCount }).map((_, i) => (
							<TableRow key={i} className="hover:bg-transparent">
								{Array.from({ length: columnCount }).map((_, j) => (
									<TableCell
										key={j}
										style={{
											width: cozyCellWidths[j],
											minWidth: shrinkZero ? cozyCellWidths[j] : "auto"
										}}
									>
										<Skeleton className="h-6 w-full" />
									</TableCell>
								))}
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
			{withPagination ? (
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
			) : null}
		</div>
	)
}
