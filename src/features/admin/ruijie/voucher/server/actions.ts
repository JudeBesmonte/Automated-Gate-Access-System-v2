"use server"

import { type Prisma } from "@prisma/client"

import { guard } from "@/core/lib/auth-guard"
import { catchErr } from "@/core/lib/errors"
import { dateRangeFilter } from "@/core/lib/utils"
import { db } from "@/core/server/db"

import { type ParserType } from "@/features/admin/ruijie/voucher/lib/search-params"
import type { GetVoucherParams } from "@/features/admin/ruijie/voucher/server/type"

export const getVoucherBreadcrumbs = guard
	.schema<GetVoucherParams>()
	.action(async ({ projectId, groupId }) => {
		const [project, projectErr] = await catchErr(
			db.project.findUnique({
				where: { id: projectId },
				select: { name: true }
			})
		)

		if (projectErr) throw projectErr
		if (!project) throw new Error("Project not found")

		const [voucherGroup, voucherGroupErr] = await catchErr(
			db.voucherGroup.findUnique({
				where: { id: groupId },
				select: { name: true }
			})
		)

		if (voucherGroupErr) throw voucherGroupErr
		if (!voucherGroup) throw new Error("Voucher group not found")

		return { projectName: project.name, voucherGroupName: voucherGroup.name }
	})

export const getVouchers = guard
	.roles(["ADMIN"])
	.schema<ParserType>()
	.action(
		async ({ page, perPage, sort, code, status, createdAt, updatedAt }) => {
			const where: Prisma.VoucherWhereInput = {
				...(code && { code: { contains: code, mode: "insensitive" } }),
				...(status.length > 0 && { status: { in: status.map(String) } }),
				...(createdAt && { createdAt: dateRangeFilter(createdAt) }),
				...(updatedAt && { updatedAt: dateRangeFilter(updatedAt) })
			}

			const orderBy: Prisma.VoucherGroupOrderByWithRelationInput[] =
				sort?.length
					? sort.map(({ id, desc }) => ({
							...(id === "project" && {
								project: { name: desc ? "desc" : "asc" }
							}),
							...(id === "voucherGroup" && {
								voucherGroup: { name: desc ? "desc" : "asc" }
							}),
							...(id !== "project" &&
								id !== "voucherGroup" && { [id]: desc ? "desc" : "asc" })
						}))
					: [{ createdAt: "desc" }]

			const [vouchers, total] = await Promise.all([
				db.voucher.findMany({
					skip: page && perPage ? (page - 1) * perPage : undefined,
					take: perPage,
					where,
					orderBy,
					include: {
						project: { select: { name: true } },
						voucherGroup: { select: { name: true } }
					}
				}),
				db.voucher.count({ where })
			])

			return { vouchers, pageCount: Math.ceil(total / perPage) }
		}
	)

export const getVouchersByGroup = guard
	.roles(["ADMIN"])
	.schema<GetVoucherParams>()
	.action(async ({ projectId, groupId }) => {
		const vouchers = await db.voucher.findMany({
			where: {
				projectId,
				voucherGroupId: groupId
			}
		})

		if (!vouchers.length) throw new Error("Vouchers not found")

		return vouchers
	})
