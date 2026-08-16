import { dehydrate, HydrationBoundary } from "@tanstack/react-query"

import {
	PageContainer,
	PageContent,
	PageHeader,
	PageHeaderDescription,
	PageHeaderTitle
} from "@/core/components/ui/page"
import { getQueryClient } from "@/core/lib/get-query-client"

import { VoucherGroupBreadcrumb } from "@/features/admin/ruijie/voucher-group/components/voucher-group-breadcrumb"
import { VoucherGroupList } from "@/features/admin/ruijie/voucher-group/components/voucher-group-list"
import { voucherGroupBreadcrumbQueryOptions } from "@/features/admin/ruijie/voucher-group/lib/hooks"

export default async function VoucherGroupPage({
	params
}: {
	params: Promise<{ projectId: string }>
}) {
	const queryClient = getQueryClient()
	const { projectId } = await params

	await queryClient.prefetchQuery(
		voucherGroupBreadcrumbQueryOptions({ projectId })
	)

	return (
		<>
			<HydrationBoundary state={dehydrate(queryClient)}>
				<VoucherGroupBreadcrumb projectId={projectId} />
			</HydrationBoundary>

			<PageContainer>
				<PageHeader>
					<PageHeaderTitle>Voucher Groups</PageHeaderTitle>
					<PageHeaderDescription>Manage voucher groups</PageHeaderDescription>
				</PageHeader>

				<PageContent>
					<VoucherGroupList projectId={projectId} />
				</PageContent>
			</PageContainer>
		</>
	)
}
