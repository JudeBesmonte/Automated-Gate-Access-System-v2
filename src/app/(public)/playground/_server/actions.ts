"use server"

import type { Project } from "@prisma/client"
import type { Session } from "next-auth"

import { guard } from "@/core/lib/auth-guard"
import { catchErr, createErr } from "@/core/lib/errors"
import { db } from "@/core/server/db"

export const mySession = guard.action(async ({ session }) => {
	return { session }
})

export const getProjects = guard.roles(["ADMIN"]).action(async () => {
	const projects = await db.project
		.findMany({
			orderBy: { name: "asc" },
			include: {
				voucherGroups: {
					select: { _count: { select: { vouchers: true } } }
				},
				_count: { select: { voucherGroups: true } }
			}
		})
		.then((projects) =>
			projects.map((project) => ({
				...project,
				voucherGroupCount: project._count.voucherGroups,
				totalVouchersCount: project.voucherGroups.reduce(
					(sum, group) => sum + group._count.vouchers,
					0
				),
				voucherGroups: undefined,
				_count: undefined
			}))
		)

	return { projects, count: projects.length }
})

export const getProject = guard
	.roles(["ADMIN"])
	.schema<{ projectId: string }>()
	.action(async ({ projectId }) => {
		const project = await db.project.findUnique({
			where: { id: projectId }
		})

		if (!project)
			throw createErr({
				code: "NOT_FOUND",
				name: "Project Not Found",
				message: `Project with ID ${projectId} could not be found`
			})
		return { project }
	})

export const editProjectImageUrl = guard
	.roles(["ADMIN"])
	.schema<{ projectId: string; imageUrl: string }>()
	.action(async ({ projectId, imageUrl }) => {
		const [project, error] = await catchErr(
			db.project.update({
				where: { id: projectId },
				data: { image: imageUrl }
			})
		)

		if (error) throw error

		return { project }
	})

/**
 * Batch fetch multiple resources in a single request to reduce authentication overhead
 */
export const batchFetch = guard
	.roles(["ADMIN"])
	.schema<{ projectId: string }>()
	.action(async ({ session, projectId }) => {
		const results: {
			session?: Session | null
			project?: Project | null
			projects?: Project[]
		} = {}

		results.session = session

		results.projects = await db.project.findMany({
			...(projectId && { where: { id: projectId } }),
			orderBy: { name: "asc" }
		})

		const project = await db.project.findUnique({
			where: { id: projectId }
		})

		if (!project) {
			throw createErr({
				code: "NOT_FOUND",
				name: "Project Not Found",
				message: `Project with ID ${projectId} could not be found`
			})
		}

		results.project = project

		return results
	})
