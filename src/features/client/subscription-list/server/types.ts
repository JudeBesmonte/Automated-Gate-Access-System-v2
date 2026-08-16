import { type Subscription } from "@prisma/client"

export interface SubscriptionWithPlan extends Subscription {
    plan: {
        id: string
        name: string
        slug: string
        monthlyPrice: number
        features: string[]
        inclusions: string[]
        addons: string[]
        equipment: string[]
        hasKiosk: boolean
    }
}

export interface SubscriptionResponse {
    data: SubscriptionWithPlan[]
    total: number
    pageCount: number
} 