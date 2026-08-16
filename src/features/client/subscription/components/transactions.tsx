import Link from "next/link"
import { CreditCard } from "lucide-react"

import {
	Avatar,
	AvatarFallback,
	AvatarImage
} from "@/core/components/ui/avatar"
import { Button } from "@/core/components/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from "@/core/components/ui/card"

const transactions = [
	{ date: "June 15, 2023", amount: "$29.99" },
	{ date: "May 15, 2023", amount: "$29.99" },
	{ date: "April 15, 2023", amount: "$29.99" }
]

export function TransactionsCard() {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Recent Transactions</CardTitle>
				<CardDescription>Your last 3 payments</CardDescription>
			</CardHeader>
			<CardContent className="grid gap-6">
				{transactions.map((transaction, index) => (
					<div key={index} className="flex items-center space-x-4">
						<Avatar>
							<AvatarImage
								src="/placeholder.svg?height=40&width=40"
								alt="Credit card"
							/>
							<AvatarFallback>
								<CreditCard className="h-4 w-4" />
							</AvatarFallback>
						</Avatar>
						<div className="space-y-0.5">
							<p className="text-sm font-medium">Monthly subscription</p>
							<p className="text-xs text-muted-foreground">
								{transaction.date}
							</p>
						</div>
						<div className="ml-auto font-medium">{transaction.amount}</div>
					</div>
				))}
			</CardContent>
			<CardFooter>
				<Link href="/client/transaction" passHref className="w-full">
					<Button variant="outline" className="w-full">
						View All Transactions
					</Button>
				</Link>
			</CardFooter>
		</Card>
	)
}
