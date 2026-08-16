"use server"

import { env } from "process"

import { Depth } from "@/services/ruijie/lib/depth"
import { flattenProjects } from "@/services/ruijie/lib/flatten-projects"
import { flattenVoucherGroups } from "@/services/ruijie/lib/flatten-voucher-groups"
import { flattenVouchers } from "@/services/ruijie/lib/flatten-vouchers"
import type {
	AccessTokenRequest,
	GetProjectRequest,
	GetVoucherGroupRequest,
	GetVoucherRequest
} from "@/services/ruijie/server/types"

import { guard } from "@/core/lib/auth-guard"
import { db } from "@/core/server/db"

const RUIJIE_CLOUD = "https://cloud-as.ruijienetworks.com"

// -- Access Token --

export const getAccessToken = async () => {
	const url = `${RUIJIE_CLOUD}/service/api/oauth20/client/access_token?token=d63dss0a81e4415a889ac5b78fsc904a`
	return (await fetch(url, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			appid: env.RUIJIE_CLIENT_ID,
			secret: env.RUIJIE_CLIENT_SECRET
		})
	}).then((res) => res.json())) as AccessTokenRequest
}

// -- Projects --

export const getRuijieProjects = async () => {
	const { accessToken } = await getAccessToken()
	const url = `${RUIJIE_CLOUD}/service/api/group/single/tree?access_token=${accessToken}&depth=${Depth.BUILDING}`

	return flattenProjects(
		(await fetch(url, {
			method: "GET",
			headers: { "Content-Type": "application/json" }
		}).then((res) => res.json())) as GetProjectRequest
	)
}

// -- Voucher Groups --

export const getRuijieVoucherGroup = async ({
	projectId
}: {
	projectId: string
}) => {
	const { accessToken } = await getAccessToken()
	const url = `${RUIJIE_CLOUD}/service/api/intl/usergroup/list/${projectId}?access_token=${accessToken}`

	return flattenVoucherGroups(
		(await fetch(url, {
			method: "GET",
			headers: { "Content-Type": "application/json" }
		}).then((res) => res.json())) as GetVoucherGroupRequest,
		projectId
	)
}

// -- Vouchers --

export const getRuijieVouchers = async ({
	projectId
}: {
	projectId: string
}) => {
	const { accessToken } = await getAccessToken()
	const url = `${RUIJIE_CLOUD}/service/api/intlSamVoucher/getList/n/${projectId}?access_token=${accessToken}`

	return flattenVouchers(
		(await fetch(url, {
			method: "GET",
			headers: { "Content-Type": "application/json" }
		}).then((res) => res.json())) as GetVoucherRequest,
		projectId
	)
}

// -- Syncing to Local Database --

export const syncProjects = guard.roles(["ADMIN"]).action(async () => {
	const projects = await getRuijieProjects()

	await Promise.all(
		projects.map(async (project) =>
			db.project.upsert({
				where: { id: project.id },
				create: project,
				update: { ...project, image: undefined }
			})
		)
	)

	return { success: true, message: "Projects synced successfully" }
})

export const syncProjectsWithVoucherGroups = guard
	.roles(["ADMIN"])
	.action(async () => {
		const projects = await getRuijieProjects()

		const projectData = await Promise.all(
			projects.map(async (project) => ({
				project,
				voucherGroups: await getRuijieVoucherGroup({ projectId: project.id })
			}))
		)

		const operations = projectData.flatMap(({ project, voucherGroups }) => [
			db.project.upsert({
				where: { id: project.id },
				create: project,
				update: { ...project, image: undefined }
			}),
			...voucherGroups.map((group) =>
				db.voucherGroup.upsert({
					where: { id: group.id },
					create: group,
					update: group
				})
			)
		])

		await db.$transaction(operations)

		return {
			success: true,
			message: `Synced ${projects.length} projects with their voucher groups`
		}
	})

export const syncProjectsWithVoucherGroupsAndVouchers = guard
	.roles(["ADMIN"])
	.action(async () => {
		const projects = await getRuijieProjects()
		const BATCH_SIZE = 200

		for (const project of projects) {
			// Get data for this project
			const [voucherGroups, allVouchers] = await Promise.all([
				getRuijieVoucherGroup({ projectId: project.id }),
				getRuijieVouchers({ projectId: project.id })
			])

			// Upsert project
			await db.project.upsert({
				where: { id: project.id },
				create: project,
				update: { ...project, image: undefined }
			})

			// Process voucher groups
			await db.$transaction(
				voucherGroups.map((group) =>
					db.voucherGroup.upsert({
						where: { id: group.id },
						create: group,
						update: group
					})
				)
			)

			// Pre-process vouchers
			const validVoucherGroupIds = new Set(
				voucherGroups.map((group) => group.id)
			)
			const vouchers = allVouchers.map((voucher) => ({
				...voucher,
				voucherGroupId: validVoucherGroupIds.has(voucher.voucherGroupId ?? "")
					? voucher.voucherGroupId
					: null
			}))

			// Process vouchers in smaller batches with delay
			for (let i = 0; i < vouchers.length; i += BATCH_SIZE) {
				const batch = vouchers.slice(i, i + BATCH_SIZE)

				// Use prisma transaction to process batch
				await db.$transaction(
					batch.map((voucher) =>
						db.voucher.upsert({
							where: { id: voucher.id },
							create: voucher,
							update: voucher
						})
					)
				)

				// Add a small delay between batches to prevent connection pool exhaustion
				if (i + BATCH_SIZE < vouchers.length) {
					await new Promise((resolve) => setTimeout(resolve, 300))
				}
			}
		}

		return {
			success: true,
			message: `Synced ${projects.length} projects with their voucher groups and vouchers`
		}
	})

export const syncProjectVouchers = guard
	.schema<{ projectId: string }>()
	.action(async ({ projectId }) => {
		const vouchers = await getRuijieVouchers({
			projectId
		})

		await db.$transaction(
			vouchers.map((voucher) =>
				db.voucher.upsert({
					where: { id: voucher.id },
					create: voucher,
					update: voucher
				})
			)
		)

		return {
			success: true,
			message: `Synced ${vouchers.length} vouchers for project ${projectId}`
		}
	})
