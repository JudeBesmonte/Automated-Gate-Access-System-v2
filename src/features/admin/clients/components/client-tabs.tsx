"use client"

import { AnimatedTabs } from "@/core/components/ui/animated-tabs"
import { type Tab } from "@/core/hooks/use-tabs"

import { ClientBillingHistory } from "@/features/admin/clients/components/forms/client-billing-history"
import { ClientDetails } from "@/features/admin/clients/components/forms/client-details"
import { ClientPlans } from "@/features/admin/clients/components/forms/client-plans"
import { type ClientDetail } from "@/features/admin/clients/lib/types"

export function ClientTabs({ client }: { client: ClientDetail }) {
	const tabs: Tab[] = [
		{ label: "Details", value: "details" },
		{ label: "Plans", value: "plans" },
		{ label: "Payment History", value: "billing" }
	]

	const renderContent = (tab: Tab) => {
		return (
			<div className="p-6">
				{tab.value === "details" && <ClientDetails client={client} />}
				{tab.value === "plans" && <ClientPlans client={client} />}
				{tab.value === "billing" && <ClientBillingHistory />}
			</div>
		)
	}

	return (
		<div className="w-full">
			<AnimatedTabs tabs={tabs} renderContent={renderContent} />
		</div>
	)
}
