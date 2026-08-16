"use server"

import { type Voucher } from "@prisma/client"

import { guard } from "@/core/lib/auth-guard"
import { db } from "@/core/server/db"

interface VoucherWithRelations extends Voucher {
	project: { name: string }
	voucherGroup: { name: string } | null
}

export const exportVoucherTable = guard
	.roles(["ADMIN"])
	.schema<{ projectId: string; voucherGroupId: string }>()
	.action(async ({ projectId, voucherGroupId }): Promise<string> => {
		const vouchers = await db.voucher.findMany({
			where: { projectId, voucherGroupId },
			include: {
				project: { select: { name: true } },
				voucherGroup: { select: { name: true } }
			}
		})

		return generateVoucherCSV(vouchers)
	})

export const exportVoucherGroups = guard
	.roles(["ADMIN"])
	.schema<{ projectId: string }>()
	.action(async ({ projectId }): Promise<string> => {
		const groups = await db.voucherGroup.findMany({
			where: { projectId },
			include: {
				project: { select: { name: true } },
				_count: { select: { vouchers: true } }
			}
		})

		const csvRows = [
			["Project Name", "Group Name", "Created At", "Voucher Count"],
			...groups.map((g) =>
				[
					g.project.name,
					g.name,
					g.createdAt.toISOString(),
					g._count.vouchers
				].join(",")
			)
		]

		return csvRows.join("\n")
	})

export const exportAllVouchers = guard
	.roles(["ADMIN"])
	.schema<{ projectId: string }>()
	.action(async ({ projectId }): Promise<string> => {
		const vouchers = await db.voucher.findMany({
			where: { projectId },
			include: {
				project: { select: { name: true } },
				voucherGroup: { select: { name: true } }
			}
		})

		return generateVoucherCSV(vouchers)
	})
export const exportGlobalVouchers = guard
	.roles(["ADMIN"])
	.action(async (): Promise<string> => {
		const vouchers = await db.voucher.findMany({
			include: {
				project: { select: { name: true } },
				voucherGroup: { select: { name: true } }
			}
		})

		return generateVoucherCSV(vouchers)
	})

const generateVoucherCSV = (vouchers: VoucherWithRelations[]): string => {
	const csvRows = [
		[
			"Project Name",
			"Voucher Group",
			"Code",
			"Status",
			"Used Time",
			"Time Period",
			"Max Clients",
			"QR Code URL",
			"Package Name",
			"Price",
			"Created At"
		],
		...vouchers.map((v) =>
			[
				v.project.name,
				v.voucherGroup?.name ?? "N/A",
				v.voucherCode,
				v.status,
				v.usedTime,
				v.timePeriod,
				v.maxClients,
				v.qrcodeUrl,
				v.packageName,
				v.packagePrice,
				v.createdAt.toISOString()
			].join(",")
		)
	]

	return csvRows.join("\n")
}
