import Link from "next/link"
import { CalendarIcon, DollarSign } from "lucide-react"

import { Button } from "@/core/components/ui/button"
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle
} from "@/core/components/ui/card"
import { Progress } from "@/core/components/ui/progress"

export function BillingCard() {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Amount to Pay</CardTitle>
			</CardHeader>
			<CardContent className="grid gap-4">
				<div className="flex items-center space-x-4">
					<CalendarIcon className="text-muted-foreground" />
					<div className="space-y-0.5">
						<p className="text-sm font-medium">Next payment due</p>
						<p className="text-sm text-muted-foreground">July 15, 2023</p>
					</div>
				</div>
				<div className="flex items-center space-x-4">
					<DollarSign className="text-muted-foreground" />
					<div className="space-y-0.5">
						<p className="text-sm font-medium">Amount</p>
						<p className="text-sm text-muted-foreground">$29.99 / month</p>
					</div>
				</div>
				<div className="space-y-2">
					<p className="text-sm font-medium">Billing cycle</p>
					<Progress value={90} />
					<p className="text-xs text-muted-foreground">
						10 days left in billing cycle
					</p>
				</div>
			</CardContent>
			<CardFooter>
				<Link href="/client/payment" passHref className="w-full">
					<Button className="w-full">Pay</Button>
				</Link>
			</CardFooter>
		</Card>
	)
}
