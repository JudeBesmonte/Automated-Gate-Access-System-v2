import type { VoucherGroup } from "@prisma/client"

import type {
	GetVoucherGroupRequest,
	VoucherGroup as Group
} from "@/services/ruijie/server/types"

/**
 * Creates a VoucherGroup object from Ruijie API response data
 *
 * @param {Group} group - The voucher group data from API
 * @returns {VoucherGroup} A new VoucherGroup object with mapped properties
 */
function createVoucherGroup(group: Group, projectId: string): VoucherGroup {
	return {
		id: group.id.toString(),
		profileId: group.authProfileId,
		name: group.name ?? "",
		timePeriod: group.timePeriod ?? 0,
		price: group.price ?? 0,
		noOfDevice: group.noOfDevice ?? 0,
		bindMac: group.bindMac ?? 0,
		isBindSsid: group.isBindSsid ?? 0,
		bindSsid: group.bindSsid ?? "",
		projectId,
		createdAt: new Date(group.createTime),
		updatedAt: new Date(group.updateTime)
	}
}

/**
 * Flattens voucher groups data from API response into Prisma VoucherGroup objects
 *
 * @param {GetVoucherGroupRequest} req - The API response containing voucher groups
 * @param {string} projectId - The project ID these voucher groups belong to
 * @returns {VoucherGroup[]} Array of VoucherGroup objects
 */
export function flattenVoucherGroups(
	req: GetVoucherGroupRequest,
	projectId: string
): VoucherGroup[] {
	if (!req.data) return []
	return req.data.map((group) => createVoucherGroup(group, projectId))
}
