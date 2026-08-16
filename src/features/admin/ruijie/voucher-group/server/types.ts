import { type getVoucherGroups } from "@/features/admin/ruijie/voucher-group/server/actions"

export type GetVoucherGroupsResponse = Awaited<
	ReturnType<typeof getVoucherGroups>
>
export type GetVoucherGroupResponse =
	GetVoucherGroupsResponse["voucherGroups"][number]
