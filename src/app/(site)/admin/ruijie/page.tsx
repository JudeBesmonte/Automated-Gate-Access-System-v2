import {
	PageBreadcrumb,
	PageContainer,
	PageContent,
	PageHeader,
	PageHeaderDescription,
	PageHeaderTitle
} from "@/core/components/ui/page"

import { ProjectList } from "@/features/admin/ruijie/project/components/project-list"

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
					<ProjectList />
				</PageContent>
			</PageContainer>
		</>
	)
}
