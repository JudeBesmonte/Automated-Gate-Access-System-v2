import { dehydrate, HydrationBoundary } from "@tanstack/react-query"

import {
	PageContainer,
	PageContent,
	PageHeader,
	PageHeaderDescription,
	PageHeaderTitle
} from "@/core/components/ui/page"
import { getQueryClient } from "@/core/lib/get-query-client"

import { VoucherBreadcrumb } from "@/features/admin/ruijie/voucher/components/voucher-breadcrumbs"
import { VouchersTable } from "@/features/admin/ruijie/voucher/components/vouchers-table"
import { voucherBreadcrumbQueryOptions } from "@/features/admin/ruijie/voucher/lib/hooks"
import type { GetVoucherParams } from "@/features/admin/ruijie/voucher/server/type"

export default async function Page({
	params
}: {
	params: Promise<GetVoucherParams>
}) {
	const queryClient = getQueryClient()
	const { projectId, groupId } = await params

	void queryClient.prefetchQuery(
		voucherBreadcrumbQueryOptions({ projectId, groupId })
	)

	const { projectName, voucherGroupName } = await queryClient.fetchQuery(
		voucherBreadcrumbQueryOptions({ projectId, groupId })
	)

	if (!projectName || !voucherGroupName) return <div>resource not found...</div>

	return (
		<>
			<HydrationBoundary state={dehydrate(queryClient)}>
				<VoucherBreadcrumb projectId={projectId} groupId={groupId} />
			</HydrationBoundary>

			<PageContainer>
				<PageHeader>
					<PageHeaderTitle>Vouchers</PageHeaderTitle>
					<PageHeaderDescription>
						Monitor vouchers and voucher usages
					</PageHeaderDescription>
				</PageHeader>

				<PageContent>
					<VouchersTable projectId={projectId} groupId={groupId} />
				</PageContent>
			</PageContainer>
		</>
	)
}
