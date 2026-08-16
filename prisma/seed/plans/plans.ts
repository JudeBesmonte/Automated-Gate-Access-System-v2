import type { PrismaClient } from "@prisma/client"

import { plans } from "./plan-data"

export async function seedPlans(prisma: PrismaClient) {
	console.log("🌱 Seeding plans...")
	let count = 0

	for (const plan of plans) {
		await prisma.plan.upsert({
			where: { slug: plan.slug },
			update: plan,
			create: plan
		})
		count++
	}

	console.log(`✅ Created ${count} plans`)
	return { total: count, items: plans }
}
