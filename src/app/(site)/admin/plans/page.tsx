import {
	PageBreadcrumb,
	PageContainer,
	PageContent,
	PageHeader,
	PageHeaderDescription,
	PageHeaderTitle
} from "@/core/components/ui/page"

import { PlanTabs } from "@/features/admin/plans/components/plan-tabs"

export default function PlansPage() {
	const breadcrumbItems = [{ label: "Plans" }]

	return (
		<>
			<PageBreadcrumb items={breadcrumbItems} />
			<PageContainer>
				<PageHeader>
					<PageHeaderTitle>Plan Management</PageHeaderTitle>
					<PageHeaderDescription>
						Create and manage subscription plans for your clients.
					</PageHeaderDescription>
				</PageHeader>

				<PageContent>
					<PlanTabs />
				</PageContent>
			</PageContainer>
		</>
	)
}
