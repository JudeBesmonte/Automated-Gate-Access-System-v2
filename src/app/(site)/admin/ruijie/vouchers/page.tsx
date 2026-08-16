import {
	PageBreadcrumb,
	PageContainer,
	PageContent,
	PageHeader,
	PageHeaderDescription,
	PageHeaderTitle
} from "@/core/components/ui/page"

import { VoucherDataTable } from "@/features/admin/ruijie/voucher/components/voucher-data-table"

export default async function Page() {
	const breadcrumbItems = [{ label: "Projects" }]

	return (
		<>
			<PageBreadcrumb items={breadcrumbItems} />

			<PageContainer>
				<PageHeader>
					<PageHeaderTitle>Vouchers</PageHeaderTitle>
					<PageHeaderDescription>View and sync vouchers</PageHeaderDescription>
				</PageHeader>

				<PageContent>
					<VoucherDataTable />
				</PageContent>
			</PageContainer>
		</>
	)
}
