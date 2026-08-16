import { useTheme } from "next-themes"

import { MagicCard } from "@/core/components/ui/magic-card"
import { Skeleton } from "@/core/components/ui/skeleton"

export const VoucherGroupCardSkeleton = () => {
	const { theme } = useTheme()
	return (
		<MagicCard
			className="flex w-full flex-1 flex-col overflow-hidden rounded-md transition-shadow duration-150"
			gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
		>
			<div className="space-y-4 p-4">
				{/* Header section */}
				<div className="space-y-2">
					<Skeleton className="h-6 w-3/4" />
					<Skeleton className="h-4 w-1/2" />
				</div>

				{/* Content section */}
				<div className="space-y-3">
					{Array.from({ length: 4 }).map((_, index) => (
						<div key={index} className="flex items-center gap-2">
							<Skeleton className="h-4 w-4 rounded-full" />
							<Skeleton className="h-4 w-2/3" />
						</div>
					))}
				</div>
			</div>
		</MagicCard>
	)
}
