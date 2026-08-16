"use server"

import { type Prisma, type SubscriptionStatus } from "@prisma/client"

import { guard } from "@/core/lib/auth-guard"
import { catchErr, createErr } from "@/core/lib/errors"
import { dateRangeFilter } from "@/core/lib/utils"
import { db } from "@/core/server/db"

import {
	type PlanParserType,
	type SubscriptionParserType
} from "@/features/admin/plans/lib/search-params"
import {
	createPlanSchema,
	deletePlanSchema,
	scheduleInstallationSchema,
	updatePlanSchema,
	updateSubscriptionStatusSchema
} from "@/features/admin/plans/server/validations"
import { sendSubscriptionSuccessEmail } from "@/services/email/templates/subscription-success"
import { sendSubscriptionTerminatedEmail } from "@/services/email/templates/subscription-terminated"
import { sendSubscriptionSuspendedEmail } from "@/services/email/templates/subscription-suspended"
import { sendInstallationScheduledEmail } from "@/services/email/templates/subscription-installation"
import { initializeBillingCycle } from "@/core/lib/billing-service"
import { sendPaymentReminderForSubscription } from "@/core/lib/billing-service"

export const createPlan = guard
	.roles(["ADMIN"])
	.schema(createPlanSchema)
	.action(
		async ({
			planType,
			name,
			slug,
			monthlyPrice,
			features,
			inclusions,
			addons,
			equipment,
			hasKiosk,
			isActive
		}) => {
			const normalize = (val: unknown): string[] => {
				if (Array.isArray(val))
					return val
						.filter((v): v is string => typeof v === "string" && Boolean(v))
						.map((v) => v.trim())
				if (typeof val === "string")
					return val
						.split("\n")
						.filter(Boolean)
						.map((v) => v.trim())
				return []
			}

			const [plan, error] = await catchErr(
				db.plan.create({
					data: {
						planType,
						name,
						slug,
						monthlyPrice,
						features: normalize(features),
						inclusions: normalize(inclusions),
						addons: normalize(addons),
						equipment: normalize(equipment),
						hasKiosk: !!hasKiosk,
						isActive: !!isActive
					}
				})
			)

			if (error) {
				if (error.code === "UNIQUE_CONSTRAINT_VIOLATION") {
					throw createErr({
						code: "UNIQUE_CONSTRAINT_VIOLATION",
						message: "A plan with this slug already exists"
					})
				}
				throw error
			}

			return { plan }
		}
	)

// Edit an existing plan
export const updatePlan = guard
	.roles(["ADMIN"])
	.schema(updatePlanSchema)
	.action(
		async ({
			id,
			planType,
			name,
			slug,
			monthlyPrice,
			features,
			inclusions,
			addons,
			equipment,
			hasKiosk,
			isActive
		}: {
			id: string
			planType: "EDUCATION" | "GOVERNMENT"
			name: string
			slug: string
			monthlyPrice: number
			features: string[]
			inclusions: string[]
			addons: string[]
			equipment: string[]
			hasKiosk?: boolean
			isActive?: boolean
		}) => {
			const normalize = (val: unknown): string[] => {
				if (Array.isArray(val))
					return val
						.filter((v): v is string => typeof v === "string" && Boolean(v))
						.map((v) => v.trim())
				if (typeof val === "string")
					return val
						.split("\n")
						.filter(Boolean)
						.map((v) => v.trim())
				return []
			}

			const [plan, error] = await catchErr(
				db.plan.update({
					where: { id },
					data: {
						planType,
						name,
						slug,
						monthlyPrice,
						features: normalize(features),
						inclusions: normalize(inclusions),
						addons: normalize(addons),
						equipment: normalize(equipment),
						hasKiosk: !!hasKiosk,
						isActive: !!isActive
					}
				})
			)

			if (error) throw error
			return { plan }
		}
	)

// Delete a plan
export const deletePlan = guard
	.roles(["ADMIN"])
	.schema(deletePlanSchema)
	.action(async ({ id }) => {
		const [, error] = await catchErr(db.plan.delete({ where: { id } }))

		if (error) throw error
		return { success: true }
	})

// Get all plans
export const getAdminPlans = guard
	.roles(["ADMIN"])
	.schema<PlanParserType>()
	.action(async ({ page, perPage, sort, name, createdAt, updatedAt }) => {
		const where: Prisma.PlanWhereInput = {
			...(name && { name: { contains: name, mode: "insensitive" } }),
			...(createdAt && { createdAt: dateRangeFilter([createdAt, createdAt]) }),
			...(updatedAt && { updatedAt: dateRangeFilter([updatedAt, updatedAt]) })
		}

		const orderBy: Prisma.PlanOrderByWithRelationInput[] = sort?.length
			? sort.map(({ id, desc }) => ({ [id]: desc ? "desc" : "asc" }))
			: [{ createdAt: "desc" }]

		const [plans, total] = await Promise.all([
			db.plan.findMany({
				skip: page && perPage ? (page - 1) * perPage : undefined,
				take: perPage,
				where,
				orderBy
			}),
			db.plan.count()
		])

		return { plans, pageCount: Math.ceil(total / perPage) }
	})

export const getAvailablePlans = async () => {
	const plans = await db.plan.findMany({
		where: { isActive: true },
		orderBy: [{ createdAt: "desc" }]
	})

	return { plans }
}

// Get all subscription info with related data
export const getSubscriptions = guard
	.roles(["ADMIN"])
	.schema<SubscriptionParserType>()
	.action(
		async ({
			page,
			perPage,
			sort,
			planName,
			installationDate,
			createdAt,
			updatedAt
		}) => {
			const where: Prisma.SubscriptionWhereInput = {
				...(planName && {
					plan: { name: { contains: planName, mode: "insensitive" } }
				}),
				...(installationDate && {
					installationDate: dateRangeFilter([installationDate, installationDate])
				}),
				...(createdAt && { createdAt: dateRangeFilter([createdAt, createdAt]) }),
				...(updatedAt && { updatedAt: dateRangeFilter([updatedAt, updatedAt]) })
			}

			const orderBy: Prisma.SubscriptionOrderByWithRelationInput[] =
				sort?.length
					? sort.map(({ id, desc }) => ({ [id]: desc ? "desc" : "asc" }))
					: [{ createdAt: "desc" }]

			const [subscriptions, total] = await Promise.all([
				db.subscription.findMany({
					skip: page && perPage ? (page - 1) * perPage : undefined,
					take: perPage,
					where,
					orderBy,
					select: {
						id: true,
						subscriptionStatus: true,
						price: true,
						installationDate: true,
						nextBillingDate: true,
						createdAt: true,
						updatedAt: true,
						subscriber: { select: { name: true, email: true } },
						plan: { select: { name: true } }
					}
				}),
				db.subscription.count()
			])

			return { subscriptions, pageCount: Math.ceil(total / perPage) }
		}
	)

export const updateSubscriptionStatus = guard
	.roles(["ADMIN"])
	.schema(updateSubscriptionStatusSchema)
	.action(async ({ id, status }) => {
		// Validate
		if (
			![
				"PENDING",
				"PROCESSING",
				"FOR_PAYMENT",
				"FOR_INSTALLATION",
				"ACTIVE",
				"SUSPENDED",
				"TERMINATED"
			].includes(status)
		) {
			return { error: "Invalid status value" }
		}

		const [updatedSubscription, error] = await catchErr(
			db.subscription.update({
				where: { id },
				data: { subscriptionStatus: status as SubscriptionStatus },
				include: {
					subscriber: { select: { name: true, email: true } },
					plan: { select: { name: true } }
				}
			})
		)

		if (error) throw error

		// Initialize billing cycle when status becomes ACTIVE
		if (status === "ACTIVE" && updatedSubscription) {
			// Initialize billing cycle
			try {
				await initializeBillingCycle(updatedSubscription.id)
				console.log(`Billing cycle initialized for subscription ${updatedSubscription.id}`)
			} catch (billingError) {
				console.error("Failed to initialize billing cycle:", billingError)
				// Don't throw - subscription activation should still proceed
			}

			// Send subscription success email
			sendSubscriptionSuccessEmail({
				name: updatedSubscription.subscriber.name || "User",
				email: updatedSubscription.subscriber.email,
				planName: updatedSubscription.plan.name,
				price: updatedSubscription.price,
				subscriptionId: updatedSubscription.id
			}).catch((emailError) => {
				console.error("Failed to send subscription success email:", emailError)
			})
		}
		if (status === "TERMINATED" && updatedSubscription) {
			sendSubscriptionTerminatedEmail({
				name: updatedSubscription.subscriber.name || "User",
				email: updatedSubscription.subscriber.email,
				planName: updatedSubscription.plan.name,
				price: updatedSubscription.price,
				subscriptionId: updatedSubscription.id,
				terminationDate: new Date().toLocaleDateString('en-US', {
					year: 'numeric',
					month: 'long',
					day: 'numeric'
				}),
				reason: "Administrative decision"
			}).catch((emailError) => {
				console.error("Failed to send subscription terminated email:", emailError)
			})
		}

		// Send subscription suspended email when status becomes SUSPENDED
		if (status === "SUSPENDED" && updatedSubscription) {
			sendSubscriptionSuspendedEmail({
				name: updatedSubscription.subscriber.name || "User",
				email: updatedSubscription.subscriber.email,
				planName: updatedSubscription.plan.name,
				price: updatedSubscription.price,
				subscriptionId: updatedSubscription.id,
				suspensionDate: new Date().toLocaleDateString('en-US', {
					year: 'numeric',
					month: 'long',
					day: 'numeric'
				}),
				reason: "Account review required"
			}).catch((emailError) => {
				console.error("Failed to send subscription suspended email:", emailError)
			})
		}

		return updatedSubscription
	})

export const scheduleInstallation = guard
	.roles(["ADMIN"])
	.schema(scheduleInstallationSchema)
	.action(async ({ id, installationDate, notes }) => {
		const [updatedSubscription, error] = await catchErr(
			db.subscription.update({
				where: { id },
				data: {
					subscriptionStatus: "FOR_INSTALLATION",
					installationDate: new Date(installationDate)
				},
				include: {
					subscriber: { select: { name: true, email: true } },
					subscriberDetail: { select: { siteAddress: true, contactNumber: true } },
					plan: { select: { name: true } }
				}
			})
		)

		if (error) throw error

		// Send installation scheduled email
		if (updatedSubscription) {
			sendInstallationScheduledEmail({
				name: updatedSubscription.subscriber.name || "User",
				email: updatedSubscription.subscriber.email,
				planName: updatedSubscription.plan.name,
				price: updatedSubscription.price,
				subscriptionId: updatedSubscription.id,
				installationDate: new Date(installationDate).toLocaleDateString('en-US', {
					weekday: 'long',
					year: 'numeric',
					month: 'long',
					day: 'numeric'
				}),
				siteAddress: updatedSubscription.subscriberDetail.siteAddress || undefined,
				contactNumber: updatedSubscription.subscriberDetail.contactNumber
			}).catch((emailError) => {
				console.error("Failed to send installation scheduled email:", emailError)
			})
		}

		return updatedSubscription
	})

// Add this new action for manually sending payment reminders
export const sendPaymentReminder = guard
	.roles(["ADMIN"])
	.schema<{ subscriptionId: string }>()
	.action(async ({ subscriptionId }) => {
		const result = await sendPaymentReminderForSubscription(subscriptionId)

		if (!result.success) {
			throw new Error(result.error || "Failed to send payment reminder")
		}

		return { success: true, message: "Payment reminder sent successfully" }
	})
