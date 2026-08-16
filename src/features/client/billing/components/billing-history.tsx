import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from "@/core/components/ui/table"

import { type mockData } from "@/features/client/billing/server/mock-data"

export const BillingHistory = ({
	currentTransactions
}: {
	currentTransactions: typeof mockData
}) => {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Date</TableHead>
					<TableHead>Description</TableHead>
					<TableHead className="text-right">Amount</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{currentTransactions.map((transaction) => (
					<TableRow key={transaction.id}>
						<TableCell>{transaction.date}</TableCell>
						<TableCell>{transaction.description}</TableCell>
						<TableCell className="text-right text-green-500">
							{transaction.amount.toFixed(2)}
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	)
}
