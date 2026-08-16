"use client"

import { useQuery } from "@tanstack/react-query"

import { getClientDetailsById } from "@/features/admin/clients/server/action"

export const useClientSubscriptions = (clientId?: string) => {
	return useQuery({
		queryKey: ["clientSubscriptions", clientId],
		queryFn: async () => {
			if (!clientId) return null
			const client = await getClientDetailsById({ clientId })
			// Get the first subscription since that's what we need for the sidebar
			return client?.subscriptions ?? null
		},
		enabled: !!clientId
	})
}
