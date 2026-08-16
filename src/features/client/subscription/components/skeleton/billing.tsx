import {
	Card,
	CardContent,
	CardFooter,
	CardHeader
} from "@/core/components/ui/card"
import { Skeleton } from "@/core/components/ui/skeleton"

export function BillingSkeleton() {
	return (
		<Card>
			<CardHeader>
				<Skeleton className="h-5 w-32" />
			</CardHeader>
			<CardContent className="grid gap-4">
				<div className="flex items-center space-x-4">
					<Skeleton className="h-5 w-5 rounded-full" />
					<div className="space-y-2">
						<Skeleton className="h-4 w-24" />
						<Skeleton className="h-4 w-32" />
					</div>
				</div>

				<div className="flex items-center space-x-4">
					<Skeleton className="h-5 w-5 rounded-full" />
					<div className="space-y-2">
						<Skeleton className="h-4 w-16" />
						<Skeleton className="h-4 w-24" />
					</div>
				</div>

				<div className="space-y-2">
					<Skeleton className="h-4 w-20" />
					<Skeleton className="h-2 w-full rounded-full" />
					<Skeleton className="h-3 w-36" />
				</div>
			</CardContent>
			<CardFooter>
				<Skeleton className="h-10 w-full" />
			</CardFooter>
		</Card>
	)
}
