import { Download, Filter } from "lucide-react"

import { Badge } from "@/core/components/ui/badge"
import { Button } from "@/core/components/ui/button"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from "@/core/components/ui/table"

// Mock data for billing history
const billingHistory = [
	{
		id: "INV-001",
		date: "Dec 01, 2023",
		amount: "$999.00",
		status: "paid",
		plan: "Enterprise Plan",
		paymentMethod: "Credit Card (Visa ending in 4242)"
	},
	{
		id: "INV-002",
		date: "Dec 01, 2023",
		amount: "$299.00",
		status: "paid",
		plan: "API Access Add-on",
		paymentMethod: "Credit Card (Visa ending in 4242)"
	},
	{
		id: "INV-003",
		date: "Nov 01, 2023",
		amount: "$999.00",
		status: "paid",
		plan: "Enterprise Plan",
		paymentMethod: "Credit Card (Visa ending in 4242)"
	},
	{
		id: "INV-004",
		date: "Nov 01, 2023",
		amount: "$299.00",
		status: "paid",
		plan: "API Access Add-on",
		paymentMethod: "Credit Card (Visa ending in 4242)"
	},
	{
		id: "INV-005",
		date: "Oct 01, 2023",
		amount: "$999.00",
		status: "paid",
		plan: "Enterprise Plan",
		paymentMethod: "Credit Card (Visa ending in 4242)"
	},
	{
		id: "INV-006",
		date: "Oct 01, 2023",
		amount: "$299.00",
		status: "paid",
		plan: "API Access Add-on",
		paymentMethod: "Credit Card (Visa ending in 4242)"
	}
]

export function ClientBillingHistory() {
	return (
		<div>
			<div className="mb-6 flex items-center justify-between">
				<h2 className="text-xl font-semibold">Payment History</h2>
				<div className="flex gap-2">
					<Button variant="outline">
						<Filter className="mr-2 h-4 w-4" />
						Filter
					</Button>
					<Button variant="outline">
						<Download className="mr-2 h-4 w-4" />
						Export
					</Button>
				</div>
			</div>

			<div className="rounded-md border">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Invoice</TableHead>
							<TableHead>Date</TableHead>
							<TableHead>Plan</TableHead>
							<TableHead>Amount</TableHead>
							<TableHead>Status</TableHead>
							<TableHead>Payment Method</TableHead>
							<TableHead className="w-[100px]"></TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{billingHistory.map((invoice) => (
							<TableRow key={invoice.id}>
								<TableCell className="font-medium">{invoice.id}</TableCell>
								<TableCell>{invoice.date}</TableCell>
								<TableCell>{invoice.plan}</TableCell>
								<TableCell>{invoice.amount}</TableCell>
								<TableCell>
									<Badge
										defaultValue={
											invoice.status === "paid" ? "success" : "secondary"
										}
									>
										{invoice.status}
									</Badge>
								</TableCell>
								<TableCell className="max-w-[200px] truncate">
									{invoice.paymentMethod}
								</TableCell>
								<TableCell>
									<Button variant="ghost" size="sm">
										<Download className="h-4 w-4" />
									</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</div>
	)
}
