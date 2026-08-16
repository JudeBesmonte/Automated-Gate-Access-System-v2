import {
	defaultShouldDehydrateQuery,
	isServer,
	QueryCache,
	QueryClient
} from "@tanstack/react-query"
import { toast } from "sonner"

import type { ErrOptions } from "@/core/lib/errors"

type Meta = {
	error: {
		name?: string
		message?: string
		displayMode?: "name" | "message" | "both"
	}
}

function makeQueryClient() {
	return new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: 60 * 1000 * 5, // 5 minutes
				gcTime: 60 * 1000 * 5,
				retry: 1,
				refetchOnWindowFocus: process.env.NODE_ENV === "production"
			},
			dehydrate: {
				// include pending queries in dehydration
				shouldDehydrateQuery: (query) =>
					defaultShouldDehydrateQuery(query) || query.state.status === "pending"
			}
		},
		queryCache: new QueryCache({
			onError: (error: ErrOptions, query) => {
				const meta = query?.meta as Meta

				const errorName = meta?.error?.name ?? error.name
				const errorMessage = meta?.error?.message ?? error.message
				const displayMode = meta?.error?.displayMode ?? "message"

				if (displayMode === "name") {
					toast.error(errorName)
				} else if (displayMode === "both") {
					toast.error(errorName, { description: errorMessage })
				} else {
					toast.error(errorMessage)
				}
			}
		})
	})
}

let browserQueryClient: QueryClient | undefined = undefined

export function getQueryClient() {
	// Server: always make a new query client
	if (isServer) return makeQueryClient()
	// Browser: make a new query client if we don't already have one
	browserQueryClient ??= makeQueryClient()
	return browserQueryClient
}
