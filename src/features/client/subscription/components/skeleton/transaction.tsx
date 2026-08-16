import {
	Card,
	CardContent,
	CardFooter,
	CardHeader
} from "@/core/components/ui/card"
import { Skeleton } from "@/core/components/ui/skeleton"

export function TransactionsSkeleton() {
	return (
		<Card>
			<CardHeader className="space-y-2">
				<Skeleton className="h-5 w-36" />
				<Skeleton className="h-4 w-24" />
			</CardHeader>
			<CardContent className="grid gap-6">
				{Array.from({ length: 3 }).map((_, index) => (
					<div key={index} className="flex items-center space-x-4">
						<Skeleton className="h-10 w-10 rounded-full" />
						<div className="space-y-2">
							<Skeleton className="h-4 w-32" />
							<Skeleton className="h-3 w-24" />
						</div>
						<Skeleton className="ml-auto h-4 w-16" />
					</div>
				))}
			</CardContent>
			<CardFooter>
				<Skeleton className="h-10 w-full" />
			</CardFooter>
		</Card>
	)
}
