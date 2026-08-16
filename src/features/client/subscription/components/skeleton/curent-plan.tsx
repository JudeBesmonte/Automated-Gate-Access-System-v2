import { Card, CardContent, CardHeader } from "@/core/components/ui/card"
import { Skeleton } from "@/core/components/ui/skeleton"

export function CurrentPlanSkeleton() {
	return (
		<Card>
			<CardHeader className="space-y-2">
				<Skeleton className="h-5 w-32" />
				<Skeleton className="h-4 w-48" />
			</CardHeader>
			<CardContent className="grid gap-4">
				<div className="flex items-center space-x-4">
					<Skeleton className="h-6 w-20" />
					<Skeleton className="h-6 w-16" />
				</div>
				<div className="flex items-center space-x-4">
					<Skeleton className="h-5 w-5 rounded-full" />
					<div className="space-y-2">
						<Skeleton className="h-4 w-16" />
						<Skeleton className="h-4 w-24" />
					</div>
				</div>
			</CardContent>
		</Card>
	)
}
