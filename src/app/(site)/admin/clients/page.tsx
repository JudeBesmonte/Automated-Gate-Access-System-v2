import {
	PageBreadcrumb,
	PageContainer,
	PageContent,
	PageHeader,
	PageHeaderDescription,
	PageHeaderTitle
} from "@/core/components/ui/page"

import { ClientsTable } from "@/features/admin/clients/components/clients-table"

export default function Page() {
	const breadcrumbItems = [{ label: "Client" }]
	return (
		<>
			<PageBreadcrumb items={breadcrumbItems} />
			<PageContainer>
				<PageHeader>
					<PageHeaderTitle>Clients</PageHeaderTitle>
					<PageHeaderDescription>
						Manage your clients and their kiosk networks.
					</PageHeaderDescription>
				</PageHeader>
				<PageContent>
					<ClientsTable />
				</PageContent>
			</PageContainer>
		</>
	)
}
