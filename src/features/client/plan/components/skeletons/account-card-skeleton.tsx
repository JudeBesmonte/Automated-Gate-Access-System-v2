import { Card, CardContent } from "@/core/components/ui/card"
import { Skeleton } from "@/core/components/ui/skeleton"

export const AccountCardSkeleton = () => {
	return (
		<div className="space-y-6">
			<div>
				<h2 className="mb-4 text-xl font-semibold">Account</h2>
				<Card>
					<CardContent className="flex items-center justify-between p-6">
						<div className="flex items-center space-x-4">
							<Skeleton className="h-16 w-16 rounded-full" />
							<div>
								<Skeleton className="mb-2 h-4 w-48" />
								<Skeleton className="mb-2 h-4 w-32" />
								<Skeleton className="h-4 w-40" />
							</div>
						</div>
						<Skeleton className="h-8 w-20 rounded" />
					</CardContent>
				</Card>
			</div>
		</div>
	)
}
