import { type Prisma, type SubscriptionStatus } from "@prisma/client"
import { z } from "zod"

import { guard } from "@/core/lib/auth-guard"
import { db } from "@/core/server/db"
import { type SubscriptionResponse } from "@/features/client/subscription-list/server/types"

interface SortItem {
    id: string
    desc: boolean
}

export const getClientSubscriptions = guard
    .schema(
        z.object({
            userId: z.string(),
            page: z.number().optional(),
            perPage: z.number().optional(),
            sort: z
                .array(
                    z.object({
                        id: z.string(),
                        desc: z.boolean()
                    })
                )
                .optional(),
            name: z.string().optional(),
            status: z.string().optional(),
            billingCycle: z.string().optional()
        })
    )
    .action(async ({
        userId,
        page = 1,
        perPage = 10,
        sort,
        name,
        status
    }: {
        userId: string
        page?: number
        perPage?: number
        sort?: SortItem[]
        name?: string
        status?: string
    }) => {
        const where: Prisma.SubscriptionWhereInput = {
            subscriberId: userId,
            ...(name && {
                plan: {
                    name: {
                        contains: name,
                        mode: "insensitive"
                    }
                }
            }),
            ...(status && {
                subscriptionStatus: status as SubscriptionStatus
            })
        }

        const [subscriptions, total] = await Promise.all([
            db.subscription.findMany({
                where,
                include: {
                    plan: {
                        select: {
                            id: true,
                            name: true,
                            slug: true,
                            monthlyPrice: true,
                            features: true,
                            inclusions: true,
                            addons: true,
                            equipment: true,
                            hasKiosk: true
                        }
                    }
                },
                orderBy: sort?.map((s: SortItem) => ({
                    [s.id]: s.desc ? "desc" : "asc"
                })) ?? [{ createdAt: "desc" }],
                skip: (page - 1) * perPage,
                take: perPage
            }),
            db.subscription.count({ where })
        ])

        return {
            data: subscriptions,
            total,
            pageCount: Math.ceil(total / perPage)
        } satisfies SubscriptionResponse
    }) 