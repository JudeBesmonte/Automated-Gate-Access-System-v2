import {
	PageBreadcrumb,
	PageContainer,
	PageContent,
	PageHeader,
	PageHeaderDescription,
	PageHeaderTitle
} from "@/core/components/ui/page"

import { UsersDataTable } from "@/features/admin/user/components/users-data-table"

export default async function Page() {
	const breadcrumbItems = [{ label: "Users" }]

	return (
		<>
			<PageBreadcrumb items={breadcrumbItems} />

			<PageContainer>
				<PageHeader>
					<PageHeaderTitle>User Management</PageHeaderTitle>
					<PageHeaderDescription>
						Monitor staff and assign roles
					</PageHeaderDescription>
				</PageHeader>

				<PageContent>
					<UsersDataTable />
				</PageContent>
			</PageContainer>
		</>
	)
}
