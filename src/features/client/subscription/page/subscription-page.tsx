import type { Metadata } from "next"

import { SidebarLayout } from "@/core/components/layouts/clientSidebarLayout"

import { BillingCard } from "@/features/client/subscription/components/billing"
import { CurrentPlanCard } from "@/features/client/subscription/components/current-plan"
import { TransactionsCard } from "@/features/client/subscription/components/transactions"

export const metadata: Metadata = {
	title: "Subscription Status",
	description: "View your current subscription plan and recent transactions."
}

export default function SubscriptionPage() {
	return (
		<SidebarLayout showSidebar={true}>
			<h1 className="mb-6 text-3xl font-bold">Subscription Status</h1>
			<div className="grid gap-6 md:grid-cols-3">
				<CurrentPlanCard />
				<BillingCard />
				<TransactionsCard />
			</div>
		</SidebarLayout>
	)
}
