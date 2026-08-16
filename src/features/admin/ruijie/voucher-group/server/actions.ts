"use server"

import { type Prisma } from "@prisma/client"

import { guard } from "@/core/lib/auth-guard"
import { catchErr } from "@/core/lib/errors"
import { dateRangeFilter } from "@/core/lib/utils"
import { db } from "@/core/server/db"

import { type ParserType } from "@/features/admin/ruijie/voucher-group/lib/search-params"

export const getVoucherGroupBreadcrumbs = guard
	.schema<{ projectId: string }>()
	.action(async ({ projectId }) => {
		const [project, projectErr] = await catchErr(
			db.project.findUnique({
				where: { id: projectId },
				select: { name: true }
			})
		)

		if (projectErr) throw projectErr
		if (!project) throw new Error("Project not found")

		return { projectName: project.name }
	})

export const getVoucherGroups = guard
	.roles(["ADMIN"])
	.schema<ParserType>()
	.action(async ({ page, perPage, sort, name, createdAt, updatedAt }) => {
		const where: Prisma.VoucherGroupWhereInput = {
			...(name && { name: { contains: name, mode: "insensitive" } }),
			...(createdAt && { createdAt: dateRangeFilter([createdAt, createdAt]) }),
			...(updatedAt && { updatedAt: dateRangeFilter([updatedAt, updatedAt]) })
		}

		const orderBy: Prisma.VoucherGroupOrderByWithRelationInput[] = sort?.length
			? sort.map(({ id, desc }) => ({
				...(id === "vouchersCount" && {
					vouchers: { _count: desc ? "desc" : "asc" }
				}),
				...(id === "project" && { project: { name: desc ? "desc" : "asc" } }),
				...(id !== "vouchersCount" &&
					id !== "project" && { [id]: desc ? "desc" : "asc" })
			}))
			: [{ createdAt: "desc" }]

		const [voucherGroups, total] = await Promise.all([
			db.voucherGroup
				.findMany({
					skip: page && perPage ? (page - 1) * perPage : undefined,
					take: perPage,
					where,
					orderBy,
					include: {
						project: { select: { name: true } },
						_count: { select: { vouchers: true } }
					}
				})
				.then((voucherGroups) =>
					voucherGroups.map((voucherGroup) => ({
						...voucherGroup,
						vouchersCount: voucherGroup._count.vouchers
					}))
				),
			db.voucherGroup.count({ where })
		])

		return { voucherGroups, pageCount: Math.ceil(total / perPage) }
	})

export const getProjectVoucherGroups = guard
	.roles(["ADMIN"])
	.schema<{ projectId: string }>()
	.action(async ({ projectId }) => {
		const voucherGroups = await db.voucherGroup.findMany({
			where: { projectId },
			orderBy: { name: "asc" },
			include: {
				_count: { select: { vouchers: true } }
			}
		})

		if (!voucherGroups.length) {
			throw new Error("No voucher groups found")
		}

		const formattedGroups = voucherGroups.map(({ _count, ...group }) => ({
			...group,
			vouchersCount: _count.vouchers
		}))

		return {
			voucherGroups: formattedGroups,
			count: formattedGroups.length
		}
	})
