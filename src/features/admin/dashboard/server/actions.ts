"use server"

import { guard } from "@/core/lib/auth-guard"
import { db } from "@/core/server/db"

export const dashboardStats = guard.action(async () => {
	const totalClients = await db.user.count({ where: { role: "CLIENT" } })

	return { totalClients }
})
