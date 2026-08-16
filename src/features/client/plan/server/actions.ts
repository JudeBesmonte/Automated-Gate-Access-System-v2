"use server"

import { guard } from "@/core/lib/auth-guard"
import { db } from "@/core/server/db"

import "@/features/client/plan/server/validations"

// Fetch a single pricing plan by Name
export const getPlan = guard
	.roles(["CLIENT"])
	.schema<{ planSlug: string }>()
	.action(async ({ planSlug }) => {
		const plan = await db.plan.findFirst({
			where: { slug: planSlug }
		}) as {
			id: string,
			name: string,
			planType: string,
			monthlyPrice: number,
			features: string[],
			inclusions: string[],
			addons: string[],
			equipment: string[],
			hasKiosk: boolean,
			slug: string,
			isActive: boolean,
			createdAt: Date,
			updatedAt: Date
		}

		if (!plan) throw new Error("Plan not found")
		if (!plan) throw new Error("Plan not found")

		return {
			id: plan.id,
			name: plan.name,
			planType: plan.planType,
			monthlyPrice: plan.monthlyPrice,
			features: plan.features,
			inclusions: plan.inclusions,
			addons: plan.addons,
			equipment: plan.equipment,
			hasKiosk: plan.hasKiosk,
			slug: plan.slug,
			isActive: plan.isActive,
			createdAt: plan.createdAt,
			updatedAt: plan.updatedAt
		}
	})
