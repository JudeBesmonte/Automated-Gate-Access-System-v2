// src/features/payment-history/server/actions.ts
"use server"

import {
	Prisma,
	PaymentStatus as PrismaPaymentStatusEnum,
	PaymentType as PrismaPaymentTypeEnum
} from "@prisma/client"

import { guard } from "@/core/lib/auth-guard"
import { dateRangeFilter } from "@/core/lib/utils"
import { db } from "@/core/server/db"

import { type PaymentsSearchParams } from "@/features/payment-history/lib/search-params"
import type {
	GetPaymentResponse,
	GetPaymentsPaginatedResponse
} from "@/features/payment-history/server/types"

const IS_DEVELOPMENT = process.env.NODE_ENV === "development"

export const getPayments = guard
	.roles(["ADMIN"])
	.schema<PaymentsSearchParams>()
	.action(
		async ({
			page = 1,
			perPage = 10,
			sort,
			name,
			email,
			type,
			status,
			date
		}): Promise<GetPaymentsPaginatedResponse> => {
			try {
				if (IS_DEVELOPMENT) {
					console.log("[Action: getPayments] Input Params:", {
						page,
						perPage,
						sort,
						name,
						email,
						type,
						status,
						date
					})
				}

				const whereConditions: Prisma.PaymentHistoryWhereInput[] = []

				const trimmedName = name?.trim()
				if (trimmedName) {
					whereConditions.push({
						OR: [
							{ billingName: { contains: trimmedName, mode: "insensitive" } },
							{
								subscriptionInfo: {
									plan: { name: { contains: trimmedName, mode: "insensitive" } }
								}
							},
							{
								subscriptionInfo: {
									subscriber: {
										name: { contains: trimmedName, mode: "insensitive" }
									}
								}
							}
						]
					})
				}

				const trimmedEmail = email?.trim()
				if (trimmedEmail) {
					whereConditions.push({
						billingEmail: { contains: trimmedEmail, mode: "insensitive" }
					})
				}

				if (type) {
					whereConditions.push({ type: type as PrismaPaymentTypeEnum })
				}

				if (status) {
					whereConditions.push({ status: status as PrismaPaymentStatusEnum })
				}

				if (date) {
					const dateFilterApplied = dateRangeFilter(date)
					if (
						dateFilterApplied &&
						(dateFilterApplied.gte ||
							dateFilterApplied.lte ||
							dateFilterApplied.lt ||
							dateFilterApplied.gt)
					) {
						whereConditions.push({ paymentDate: dateFilterApplied })
					}
				}

				const where: Prisma.PaymentHistoryWhereInput =
					whereConditions.length > 0 ? { AND: whereConditions } : {}

				if (IS_DEVELOPMENT) {
					console.log(
						"[Action: getPayments] Prisma WHERE clause:",
						JSON.stringify(where, null, 2)
					)
				}

				const orderBy: Prisma.PaymentHistoryOrderByWithRelationInput[] = []
				if (sort && sort.length > 0) {
					sort.forEach(({ id, desc }) => {
						const direction = desc ? "desc" : "asc"
						switch (id) {
							case "billingName":
							case "billingEmail":
							case "status":
							case "type":
							case "amount":
							case "paymentDate":
							case "createdAt":
								orderBy.push({ [id]: direction })
								break
							case "planName":
								orderBy.push({
									subscriptionInfo: { plan: { name: direction } }
								})
								break
							case "subscriptionPrice":
								orderBy.push({ subscriptionInfo: { price: direction } })
								break
							case "subscriberName":
								orderBy.push({
									subscriptionInfo: { subscriber: { name: direction } }
								})
								break
						}
					})
				}
				if (orderBy.length === 0) {
					orderBy.push({ createdAt: "desc" })
				}

				if (IS_DEVELOPMENT) {
					console.log(
						"[Action: getPayments] Prisma ORDER BY clause:",
						JSON.stringify(orderBy, null, 2)
					)
				}

				const validPage = Math.max(1, Number(page) || 1)
				const validPerPage = Math.max(1, Math.min(100, Number(perPage) || 10))
				const skip = (validPage - 1) * validPerPage

				// Perform database queries in parallel
				const [paymentsData, total] = await db.$transaction([
					db.paymentHistory.findMany({
						skip,
						take: validPerPage,
						where,
						orderBy,
						include: {
							subscriptionInfo: {
								include: {
									plan: true,
									subscriber: true
								}
							}
						}
					}),
					db.paymentHistory.count({ where })
				])

				if (IS_DEVELOPMENT) {
					console.log(
						`[Action: getPayments] Fetched ${paymentsData.length} of ${total} total payments.`
					)
					if (paymentsData.length > 0) {
						// Avoid stringifying large objects in logs unless absolutely necessary for deep debugging
						// console.log("[Action: getPayments] Sample fetched payment (server):", JSON.stringify(paymentsData[0], null, 2));
						console.log(
							"[Action: getPayments] First payment ID (server):",
							paymentsData[0]?.id
						)
					}
				}

				const payments = paymentsData as unknown as GetPaymentResponse[]

				return {
					payments,
					pageCount: Math.ceil(total / validPerPage),
					total
				}
			} catch (error) {
				// Always log errors, regardless of environment
				console.error("[Action: getPayments] Error during execution:", error)
				const message =
					error instanceof Error ? error.message : "An unknown error occurred."
				// In production, you might want to throw a more generic error or use a dedicated error reporting service.
				throw new Error(`Failed to fetch payments: ${message}`)
			}
		}
	)
