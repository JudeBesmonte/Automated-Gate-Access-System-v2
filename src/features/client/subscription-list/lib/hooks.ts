"use client"

import { useQuery } from "@tanstack/react-query"

import { getClientSubscriptions } from "@/features/client/subscription-list/server/actions"
import { type SubscriptionsSearchParams } from "@/features/client/subscription-list/lib/search-params"

export const useClientSubscriptionList = (
    userId: string,
    params: SubscriptionsSearchParams
) => {
    return useQuery({
        queryKey: ["clientSubscriptions", userId, params],
        queryFn: () =>
            getClientSubscriptions({
                userId,
                ...params
            }),
        enabled: !!userId
    })
} 