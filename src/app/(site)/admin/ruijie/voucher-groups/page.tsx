import {
	PageBreadcrumb,
	PageContainer,
	PageContent,
	PageHeader,
	PageHeaderDescription,
	PageHeaderTitle
} from "@/core/components/ui/page"

import { VoucherGroupDataTable } from "@/features/admin/ruijie/voucher-group/components/voucher-group-data-table"

export default async function Page() {
	const breadcrumbItems = [{ label: "Voucher Groups" }]

	return (
		<>
			<PageBreadcrumb items={breadcrumbItems} />

			<PageContainer>
				<PageHeader>
					<PageHeaderTitle>Voucher Groups</PageHeaderTitle>
					<PageHeaderDescription>
						Create, configure and monitor your digital signage deployments
						across locations
					</PageHeaderDescription>
				</PageHeader>

				<PageContent>
					<VoucherGroupDataTable />
				</PageContent>
			</PageContainer>
		</>
	)
}
