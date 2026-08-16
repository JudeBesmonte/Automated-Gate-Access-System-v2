"use client"

import { Card, CardContent, CardHeader } from "@/core/components/ui/card"
import { Skeleton } from "@/core/components/ui/skeleton"

export default function SubscriptionDetailsSkeleton() {
	return (
		<Card>
			<CardHeader>
				<Skeleton className="h-6 w-1/2" />
			</CardHeader>
			<CardContent className="space-y-4">
				<Skeleton className="h-4 w-full" />
				<Skeleton className="h-4 w-full" />
				<Skeleton className="h-4 w-full" />
				<Skeleton className="h-10 w-full" />
			</CardContent>
		</Card>
	)
}
