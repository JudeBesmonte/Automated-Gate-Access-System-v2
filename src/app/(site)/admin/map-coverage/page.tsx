import {
	PageBreadcrumb,
	PageContainer,
	PageContent,
	PageHeader,
	PageHeaderDescription,
	PageHeaderTitle
} from "@/core/components/ui/page"

import { CoverageMap } from "@/features/admin/map-coverage/components/coverage-map"

export default function MapCoveragePage() {
	const breadcrumbItems = [{ label: "Map Coverage" }]

	return (
		<>
			<PageBreadcrumb items={breadcrumbItems} />
			<PageContainer>
				<PageHeader>
					<PageHeaderTitle>Map Coverage Management</PageHeaderTitle>
					<PageHeaderDescription>
						Define service coverage areas by drawing boundaries on the map. Only
						locations within these boundaries will be valid for client location
						pins.
					</PageHeaderDescription>
				</PageHeader>

				<PageContent className="pb-10">
					<CoverageMap />
				</PageContent>
			</PageContainer>
		</>
	)
}
