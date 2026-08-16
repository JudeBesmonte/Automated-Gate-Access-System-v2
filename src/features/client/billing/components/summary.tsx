import Link from "next/link"

import { Button } from "@/core/components/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from "@/core/components/ui/card"

import { mockData } from "@/features/client/billing/server/mock-data"

export function Summary() {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Summary</CardTitle>
				<CardDescription>Your transaction overview</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="space-y-4">
					<div>
						<p className="text-sm font-medium">Total Transactions</p>
						<p className="text-2xl font-bold">{mockData.length}</p>
					</div>
					<div>
						<p className="text-sm font-medium">Current Bill</p>
						<p className="text-2xl font-bold text-red-500">$1500</p>
					</div>
					<div>
						<p className="text-sm font-medium">Due Date</p>
						<p className="text-xl font-semibold">2025-2-23</p>
					</div>

					<Link href="/client/payment" passHref className="w-full">
						<Button className="w-full">Pay Now</Button>
					</Link>
				</div>
			</CardContent>
		</Card>
	)
}
