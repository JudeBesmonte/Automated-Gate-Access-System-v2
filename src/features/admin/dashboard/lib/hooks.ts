"use client"

import { useQuery } from "@tanstack/react-query"

import { dashboardStats } from "@/features/admin/dashboard/server/actions"

export function useDashboardStats() {
	return useQuery({
		queryKey: ["dashboard", "total-projects"],
		queryFn: () => dashboardStats()
	})
}
