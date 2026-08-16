import type { getVouchers } from "@/features/admin/ruijie/voucher/server/actions"

export interface GetVoucherParams {
	projectId: string
	groupId: string
}

export type GetVouchersResponse = Awaited<ReturnType<typeof getVouchers>>
export type GetVoucherResponse = GetVouchersResponse["vouchers"][number]
