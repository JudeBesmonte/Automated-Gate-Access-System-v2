import type { Metadata } from "next"

import {
	PageBreadcrumb,
	PageContainer,
	PageContent,
	PageHeader,
	PageHeaderTitle
} from "@/core/components/ui/page"

import Dashboard from "@/features/client/dashboard/client-dashbaord"

export const metadata: Metadata = {
	title: "Subscription Status",
	description: "View your current subscription plan and recent transactions."
}

export default function Page() {
	const breadcrumbItems = [{ label: "Dashboard" }]

	return (
		<>
			<PageBreadcrumb items={breadcrumbItems} />

			<PageContainer>
				<PageHeader>
					<PageHeaderTitle>Dashboard</PageHeaderTitle>
				</PageHeader>
				<PageContent className="">
					<Dashboard />
				</PageContent>
			</PageContainer>
		</>
	)
}
