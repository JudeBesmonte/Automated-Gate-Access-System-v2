import { Skeleton } from "@/core/components/ui/skeleton"

export const NavUserSkeleton = () => {
	return (
		<>
			<Skeleton className="h-8 w-8 shrink-0 rounded-lg" />
			<div className="grid flex-1 gap-1.5 text-left text-sm leading-tight">
				<Skeleton className="h-3.5 w-4/5" />
				<Skeleton className="h-2 w-3/5" />
			</div>
		</>
	)
}
