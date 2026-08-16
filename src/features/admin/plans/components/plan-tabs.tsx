"use client"

import { AnimatedTabs } from "@/core/components/ui/animated-tabs"
import { type Tab } from "@/core/hooks/use-tabs"

import { PlansDataTable } from "@/features/admin/plans/components/plans-data-table"
import { SubscriptionDataTable } from "@/features/admin/plans/components/subscription-data-table"

export function PlanTabs() {
	const tabs: Tab[] = [
		{ label: "Plans", value: "plans" },
		{ label: "Plan Requests", value: "requests" }
	]

	const renderContent = (tab: Tab) => {
		return (
			<div className="mt-4">
				{tab.value === "plans" && <PlansDataTable />}
				{tab.value === "requests" && <SubscriptionDataTable />}
			</div>
		)
	}

	return <AnimatedTabs tabs={tabs} renderContent={renderContent} />
}
