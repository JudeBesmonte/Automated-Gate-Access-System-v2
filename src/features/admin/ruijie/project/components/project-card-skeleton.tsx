import {
	Card,
	CardContent,
	CardFooter,
	CardHeader
} from "@/core/components/ui/card"
import { Skeleton } from "@/core/components/ui/skeleton"

export const ProjectCardSkeleton = () => {
	return (
		<Card className="flex w-full min-w-[270px] max-w-[285px] flex-1 flex-col overflow-hidden">
			<CardHeader className="relative p-0">
				<Skeleton className="h-32 w-full rounded-b-none" />
				<Skeleton className="absolute left-2 top-1 h-5 w-16" />
			</CardHeader>

			<CardContent className="grid flex-grow gap-3 p-3">
				<div className="space-y-1">
					<Skeleton className="h-5 w-3/4" />
					<div className="space-y-1">
						<Skeleton className="h-4 w-full" />
						<Skeleton className="h-4 w-5/6" />
						<Skeleton className="h-4 w-4/6" />
					</div>
				</div>

				<div className="flex flex-col gap-1">
					<div className="flex items-center gap-1">
						<Skeleton className="size-3" />
						<Skeleton className="h-4 w-24" />
					</div>
					<div className="flex items-center gap-1">
						<Skeleton className="size-3" />
						<Skeleton className="h-4 w-24" />
					</div>
					<div className="flex items-center gap-1">
						<Skeleton className="size-3" />
						<Skeleton className="h-4 w-24" />
					</div>
				</div>
			</CardContent>

			<CardFooter className="flex items-center justify-between gap-2 p-3 pt-0">
				<Skeleton className="h-8 w-full" />
			</CardFooter>
		</Card>
	)
}
