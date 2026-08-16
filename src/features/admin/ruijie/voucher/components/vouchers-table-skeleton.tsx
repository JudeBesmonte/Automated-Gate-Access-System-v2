"use client"

import { Skeleton } from "@/core/components/ui/skeleton"

export const VouchersTableSkeleton = () => {
	return (
		<div className="w-full space-y-4">
			{/* Toolbar Section */}
			<div className="flex items-center justify-between">
				<div className="flex flex-1 items-center space-x-2">
					<Skeleton className="h-8 w-[300px] lg:w-[400px]" />
					<Skeleton className="h-8 w-24" />
				</div>
				<Skeleton className="h-8 w-20" />
			</div>

			{/* Table Section */}
			<div className="rounded-md border">
				{/* Table Header */}
				<div className="flex items-center justify-between space-x-4 p-4">
					<Skeleton className="h-4 w-4" />
					<Skeleton className="h-4 w-32" />
					<Skeleton className="h-4 w-20" />
					<Skeleton className="h-4 w-24" />
					<Skeleton className="ml-auto h-4 w-16" />
				</div>

				{/* Table Rows */}
				{Array.from({ length: 5 }).map((_, i) => (
					<div
						key={i}
						className="flex items-center justify-between space-x-4 p-4"
					>
						<Skeleton className="h-4 w-4" />
						<Skeleton className="h-4 w-32" />
						<Skeleton className="h-4 w-20" />
						<Skeleton className="h-4 w-24" />
						<Skeleton className="ml-auto h-4 w-16" />
					</div>
				))}
			</div>
		</div>
	)
}
