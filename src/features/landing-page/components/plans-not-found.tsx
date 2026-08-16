import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle
} from "@/core/components/ui/card"

export const PlanNotFound = () => {
	return (
		<Card className="relative w-full animate-pulse border-2 border-dotted bg-sidebar py-8">
			<CardHeader>
				<CardTitle className="text-center text-lg">No plans yet</CardTitle>
				<CardDescription className="text-center">
					Please check back later for available plans.
				</CardDescription>
			</CardHeader>
		</Card>
	)
}
