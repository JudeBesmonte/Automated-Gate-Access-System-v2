"use client"

import { PaymentDataTable } from "./payment-data-table"

export function PaymentDashboard() {
	return (
		<div className="container mx-auto space-y-8 py-6">
			<PaymentDataTable />
		</div>
	)
}
