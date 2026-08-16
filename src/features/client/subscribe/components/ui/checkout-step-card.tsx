import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from "@/core/components/ui/card"
import { cn } from "@/core/lib/utils"

export function CheckoutStepCard({
	title,
	description,
	className,
	children
}: {
	title: string
	description?: string
	className?: {
		card?: string
		header?: string
		title?: string
		description?: string
		content?: string
	}
	children: React.ReactNode
}) {
	return (
		<Card className={cn(className?.card)}>
			<CardHeader className={cn("pb-4", className?.header)}>
				<CardTitle className={cn("text-xl", className?.title)}>
					{title}
				</CardTitle>
				{description && (
					<CardDescription className={cn(className?.description)}>
						{description}
					</CardDescription>
				)}
			</CardHeader>
			<CardContent className={cn("space-y-4", className?.content)}>
				{children}
			</CardContent>
		</Card>
	)
}
