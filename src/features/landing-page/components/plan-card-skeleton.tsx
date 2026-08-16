import { Card, CardContent, CardHeader } from "@/core/components/ui/card"
import { Skeleton } from "@/core/components/ui/skeleton"

export function PlanCardSkeleton() {
	return (
		<Card className="relative w-80 flex-1 overflow-hidden rounded-3xl">
			<div className="flex h-full flex-col">
				<CardHeader
					className="rounded-t-3xl p-4 md:p-8"
					style={{ backgroundColor: "hsla(335, 74.9%, 56.9%, 0.07)" }}
				>
					<Skeleton className="h-6 w-24" />
					<Skeleton className="mt-4 h-8 w-32" />
					<Skeleton className="mt-2 h-4 w-20" />
				</CardHeader>

				<CardContent className="flex flex-1 flex-col justify-between border-t border-border pt-8">
					<div className="space-y-4">
						{Array.from({ length: 4 }).map((_, index) => (
							<div key={index} className="flex items-start gap-2">
								<Skeleton className="h-5 w-5 rounded-full" />
								<Skeleton className="h-4 flex-1" />
							</div>
						))}
					</div>

					<Skeleton className="mt-6 h-10 w-full" />
				</CardContent>
			</div>
		</Card>
	)
}
