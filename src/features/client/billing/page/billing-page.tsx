"use client"

import { useState } from "react"
import type { DateRange } from "react-day-picker"

import { SidebarLayout } from "@/core/components/layouts/clientSidebarLayout"

import { BillingHistory } from "@/features/client/billing/components/billing-history"
import { Summary } from "@/features/client/billing/components/summary"
import { DatePicker } from "@/features/client/billing/components/ui/date-picker"
import { Pagination } from "@/features/client/billing/components/ui/pagination"
import { mockData } from "@/features/client/billing/server/mock-data"

export function BillingPage() {
	const [date, setDate] = useState<DateRange | undefined>({
		from: new Date(2025, 1, 20),
		to: new Date(2025, 1, 25)
	})
	const [currentPage, setCurrentPage] = useState(1)
	const itemsPerPage = 10

	const totalPages = Math.ceil(mockData.length / itemsPerPage)
	const currentTransactions = mockData.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage
	)

	return (
		<SidebarLayout showSidebar={true}>
			<h1 className="mb-6 text-3xl font-bold">Transaction History</h1>
			<div className="grid gap-6 md:grid-cols-[1fr_300px]">
				<div className="space-y-6">
					<div className="flex flex-col gap-4 sm:flex-row sm:items-center">
						<DatePicker date={date} setDate={setDate} />
					</div>
					<BillingHistory currentTransactions={currentTransactions} />
					<Pagination
						currentPage={currentPage}
						totalPages={totalPages}
						setCurrentPage={setCurrentPage}
					/>
				</div>
				<Summary />
			</div>
		</SidebarLayout>
	)
}

export default BillingPage
