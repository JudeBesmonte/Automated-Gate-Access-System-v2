import { queryOptions, useQuery, useSuspenseQuery } from "@tanstack/react-query"

import { type ParserType } from "@/features/admin/ruijie/voucher-group/lib/search-params"
import {
	getProjectVoucherGroups,
	getVoucherGroupBreadcrumbs,
	getVoucherGroups
} from "@/features/admin/ruijie/voucher-group/server/actions"

export const useVoucherGroups = (params: ParserType) => {
	return useQuery({
		queryKey: ["voucherGroups", params],
		queryFn: () => getVoucherGroups(params)
	})
}

export const useProjectVoucherGroups = ({
	projectId
}: {
	projectId: string
}) => {
	return useQuery({
		queryKey: ["voucherGroups", projectId],
		queryFn: () => getProjectVoucherGroups({ projectId })
	})
}

export const voucherGroupBreadcrumbQueryOptions = ({
	projectId
}: {
	projectId: string
}) =>
	queryOptions({
		queryKey: ["voucherGroupBreadcrumb", projectId],
		queryFn: () => getVoucherGroupBreadcrumbs({ projectId })
	})

export const useVoucherGroupBreadcrumb = ({
	projectId
}: {
	projectId: string
}) => useSuspenseQuery(voucherGroupBreadcrumbQueryOptions({ projectId }))
