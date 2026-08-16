import type { Voucher } from "@prisma/client"

import type { GetVoucherRequest, List } from "@/services/ruijie/server/types"

/**
 * Creates a Voucher object from the raw voucher data
 *
 * @param {List} voucher - The raw voucher data
 * @param {string} projectId - The project ID
 * @returns {Voucher} A new Voucher object with mapped properties
 */
function createVoucher(voucher: List, projectId: string): Voucher {
	const voucherGroupId = voucher.userGroupId?.trim() || null

	return {
		id: voucher.uuid,
		voucherCode: voucher.voucherCode ?? "",
		status: voucher.status ?? "",
		maxClients: voucher.maxClients ?? 0,
		timePeriod: voucher.timePeriod ?? 0,
		usedTime: voucher.usedTime ?? 0,
		usedQuota: voucher.usedQuota ?? 0,
		packagePrice: voucher.packagePrice ?? 0,
		packageName: voucher.packageName ?? voucher.userGroupName ?? "",
		firstName: voucher.firstName ?? "",
		lastName: voucher.lastName ?? "",
		email: voucher.email ?? "",
		phone: voucher.phone ?? "",
		comment: voucher.comment ?? "",
		qrcodeUrl: voucher.qrcodeUrl,
		bindMac: voucher.bindMac,
		disableStatus: voucher.disableStatus,
		createdAt: new Date(voucher.createTime),
		updatedAt: new Date(),
		projectId,
		voucherGroupId
	}
}

/**
 * Flattens the voucher response into an array of Voucher objects
 *
 * @param {GetVoucherRequest} req - The request object containing voucher data
 * @param {string} projectId - The project ID
 * @returns {Voucher[]} Array of flattened Voucher objects
 */
export function flattenVouchers(
	req: GetVoucherRequest,
	projectId: string
): Voucher[] {
	if (!req.voucherData?.list) return []
	return req.voucherData.list.map((voucher) =>
		createVoucher(voucher, projectId)
	)
}
