import type { Metadata } from "next"

import {
	PageBreadcrumb,
	PageContainer,
	PageContent,
	PageHeader,
	PageHeaderTitle
} from "@/core/components/ui/page"

import { SubscriptionTable } from "@/features/client/subscription-list/components/subscription-table"

export const metadata: Metadata = {
	title: "Subscriptions",
	description: "View and manage your subscriptions"
}

export default function SubscriptionsPage() {
	const breadcrumbItems = [
		{ label: "Dashboard", href: "/client" },
		{ label: "Subscriptions" }
	]

	return (
		<>
			<PageBreadcrumb items={breadcrumbItems} />
			<PageContainer>
				<PageHeader>
					<PageHeaderTitle>Subscriptions</PageHeaderTitle>
				</PageHeader>
				<PageContent className="w-full">
					<p className="text-muted-foreground mb-6">
						View and manage your subscription plans and add-ons
					</p>
					<SubscriptionTable />
				</PageContent>
			</PageContainer>
		</>
	)
}
