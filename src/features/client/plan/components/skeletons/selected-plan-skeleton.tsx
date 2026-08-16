"use client"

import { Card, CardContent } from "@/core/components/ui/card"
import { Skeleton } from "@/core/components/ui/skeleton"

export const SelectedPlanSkeleton = () => {
	return (
		<div>
			<h2 className="mb-4 text-xl font-semibold">Selected Plan</h2>
			<Card>
				<CardContent className="flex items-center justify-between p-6">
					<div className="flex items-center space-x-4">
						<Skeleton className="h-6 w-6 rounded-full" />
						<div>
							<Skeleton className="w-35 mb-2 h-4" />
							<Skeleton className="mb-2 h-4 w-32" />
						</div>
					</div>
					<Skeleton className="h-8 w-20 rounded" />
				</CardContent>
			</Card>
		</div>
	)
}
