import { Card, CardContent } from "@/core/components/ui/card"
import { Skeleton } from "@/core/components/ui/skeleton"

export const KioskCardSkeleton = () => {
	return (
		<Card className="overflow-hidden">
			<CardContent className="p-6">
				<div className="flex items-start gap-6">
					<Skeleton className="h-[70px] w-[100px] rounded-lg" />
					<div className="flex-1 space-y-2">
						<div className="flex items-center justify-between">
							<Skeleton className="h-2 w-[100px]" />
							<Skeleton className="h-2 w-[60px]" />
							<Skeleton className="h-2 w-[120px]" />
						</div>
						<Skeleton className="h-2 w-[200px]" />
						<Skeleton className="h-2 w-[150px]" />
					</div>
					<Skeleton className="h-8 w-8 rounded-md" />
				</div>
			</CardContent>
		</Card>
	)
}
