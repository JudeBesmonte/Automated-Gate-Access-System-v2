import {
	PageBreadcrumb,
	PageContainer,
	PageContent,
	PageHeader,
	PageHeaderDescription,
	PageHeaderTitle
} from "@/core/components/ui/page"

import { ProjectDataTable } from "@/features/admin/ruijie/project/components/projects-data-table"

export default async function Page() {
	const breadcrumbItems = [{ label: "Projects" }]

	return (
		<>
			<PageBreadcrumb items={breadcrumbItems} />

			<PageContainer>
				<PageHeader>
					<PageHeaderTitle>Project Management</PageHeaderTitle>
					<PageHeaderDescription>
						Create, configure and monitor your digital signage deployments
						across locations
					</PageHeaderDescription>
				</PageHeader>

				<PageContent>
					<ProjectDataTable />
				</PageContent>
			</PageContainer>
		</>
	)
}
