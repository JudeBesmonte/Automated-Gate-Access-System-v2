import {
	PageBreadcrumb,
	PageContainer,
	PageContent,
	PageHeader,
	PageHeaderTitle
} from "@/core/components/ui/page"

import { ChartAreaInteractive } from "@/features/admin/dashboard/components/chart-area-interactive"
import { DataTable } from "@/features/admin/dashboard/components/data-table"
import { SectionCards } from "@/features/admin/dashboard/components/section-cards"

import data from "./data.json"

export default function Page() {
	const breadcrumbItems = [{ label: "Dashboard" }]

	return (
		<>
			<PageBreadcrumb items={breadcrumbItems} />

			<PageContainer>
				<PageHeader>
					<PageHeaderTitle>Dashboard</PageHeaderTitle>
				</PageHeader>
				<PageContent>
					<SectionCards />
					<ChartAreaInteractive />
					<DataTable data={data} />
				</PageContent>
			</PageContainer>
		</>
	)
}
