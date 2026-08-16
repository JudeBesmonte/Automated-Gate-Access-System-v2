import { queryOptions, useQuery, useSuspenseQuery } from "@tanstack/react-query"

import type { ParserType } from "@/features/admin/ruijie/voucher/lib/search-params"
import {
	getVoucherBreadcrumbs,
	getVouchers,
	getVouchersByGroup
} from "@/features/admin/ruijie/voucher/server/actions"
import type { GetVoucherParams } from "@/features/admin/ruijie/voucher/server/type"

export const voucherBreadcrumbQueryOptions = ({
	projectId,
	groupId
}: GetVoucherParams) =>
	queryOptions({
		queryKey: ["voucherBreadcrumb", projectId, groupId],
		queryFn: () => getVoucherBreadcrumbs({ projectId, groupId })
	})

export const useVoucherBreadcrumb = ({
	projectId,
	groupId
}: GetVoucherParams) =>
	useSuspenseQuery(voucherBreadcrumbQueryOptions({ projectId, groupId }))

export const useVouchersByGroup = ({ projectId, groupId }: GetVoucherParams) =>
	useQuery({
		queryKey: ["vouchers", projectId, groupId],
		queryFn: async () => getVouchersByGroup({ projectId, groupId })
	})

export const useVouchers = (params: ParserType) => {
	return useQuery({
		queryKey: ["vouchers", params],
		queryFn: async () => getVouchers(params)
	})
}
