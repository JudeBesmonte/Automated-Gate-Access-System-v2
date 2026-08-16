import { type BillingInterval, type PlanType, type SubscriptionStatus } from "@prisma/client"

export interface Subscription {
    id: string
    planType: PlanType
    billingInterval: BillingInterval
    price: number
    discount: number
    installationDate: Date | null
    subscriptionStatus: SubscriptionStatus
    createdAt: Date
    updatedAt: Date
    planId: string
    subscriberId: string
    subscriberDetailId: string
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
    } | null
}

export interface SubscriptionResponse {
    data: Subscription[]
    total: number
    pageCount: number
} 