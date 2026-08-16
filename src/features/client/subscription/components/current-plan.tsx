import { DollarSign } from "lucide-react"

import { Badge } from "@/core/components/ui/badge"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from "@/core/components/ui/card"

export function CurrentPlanCard() {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Current Plan</CardTitle>
				<CardDescription>Your subscription details</CardDescription>
			</CardHeader>
			<CardContent className="grid gap-4">
				<div className="flex items-center space-x-4">
					<Badge variant="secondary" className="text-sm">
						Premium Plan
					</Badge>
					{/* <Badge variant="outline" className="text-sm">
						Monthly
					</Badge> */}
				</div>
				<div className="flex items-center space-x-4">
					<DollarSign className="text-muted-foreground" />
					<div className="space-y-0.5">
						<p className="text-sm font-medium">Amount</p>
						<p className="text-sm text-muted-foreground">$29.99 / month</p>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}
