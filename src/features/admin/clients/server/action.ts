"use server"

import { UserRole, type Prisma } from "@prisma/client"
import { z } from "zod"

import { guard } from "@/core/lib/auth-guard"
import { dateRangeFilter } from "@/core/lib/utils"
import { db } from "@/core/server/db"

import { type ClientsSearchParams } from "@/features/admin/clients/lib/search-params"

export const getClients = guard
	.schema<ClientsSearchParams>()
	.action(
		async ({
			page = 1,
			perPage = 10,
			sort = [],
			name,
			email,
			createdAt,
			updatedAt
		}) => {
			const where: Prisma.UserWhereInput = {
				role: UserRole.CLIENT,
				...(name && { name: { contains: name, mode: "insensitive" } }),
				...(email && { email: { contains: email, mode: "insensitive" } }),
				...(createdAt && { createdAt: dateRangeFilter([createdAt, createdAt]) }),
				...(updatedAt && { updatedAt: dateRangeFilter([updatedAt, updatedAt]) })
			}

			const orderBy: Prisma.UserOrderByWithRelationInput[] = sort?.length
				? sort.map(({ id, desc }) => ({ [id]: desc ? "desc" : "asc" }))
				: [{ createdAt: "desc" }]

			const [clients, total] = await Promise.all([
				db.user.findMany({
					skip: (page - 1) * perPage,
					take: perPage,
					where,
					orderBy,
					select: {
						id: true,
						name: true,
						email: true,
						image: true,
						role: true,
						createdAt: true,
						updatedAt: true
					}
				}),
				db.user.count({ where })
			])

			return { clients, pageCount: Math.ceil(total / perPage) }
		}
	)

export const getClientDetailsById = guard
	.schema(z.object({ clientId: z.string() }))
	.action(async ({ clientId }) => {
		if (!clientId) return null

		const user = await db.user.findUnique({
			where: { id: clientId, role: UserRole.CLIENT },
			select: {
				id: true,
				name: true,
				email: true,
				image: true,
				role: true,
				createdAt: true,
				updatedAt: true,
				subscriptions: {
					orderBy: { updatedAt: "desc" },
					select: {
						id: true,
						price: true,
						discount: true,
						installationDate: true,
						subscriptionStatus: true,
						createdAt: true,
						updatedAt: true,
						planId: true,
						subscriberId: true,
						plan: {
							select: {
								id: true,
								name: true,
								slug: true,
								monthlyPrice: true,
								features: true,
								inclusions: true,
								addons: true,
								equipment: true,
								hasKiosk: true
							}
						}
					}
				}
			}
		})

		return { ...user }
	})

export const getClientById = guard
	.schema(z.object({ clientId: z.string() }))
	.action(async ({ clientId }) => {
		if (!clientId) return null

		const user = await db.user.findUnique({
			where: { id: clientId, role: UserRole.CLIENT },
			select: {
				id: true,
				name: true,
				email: true,
				image: true,
				role: true,
				createdAt: true,
				updatedAt: true
			}
		})

		return { ...user }
	})
