"use server"

import { guard } from "@/core/lib/auth-guard"
import { db } from "@/core/server/db"

export const dashboardStats = guard.action(async () => {
	const [totalProjects, totalVouchers, totalClients] = await Promise.all([
		db.project.count(),
		db.voucher.count(),
		db.user.count({ where: { role: "CLIENT" } })
	])

	return { totalProjects, totalVouchers, totalClients }
})
