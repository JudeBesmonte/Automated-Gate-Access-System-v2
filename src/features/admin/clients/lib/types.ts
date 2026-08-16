import { type SubscriptionStatus, type UserRole } from "@prisma/client"

// Main client type used in the table - focuses on user data
export interface Client {
	id: string
	name: string
	email: string
	image?: string
	role: UserRole
	createdAt: Date
	updatedAt: Date
}

// Complete plan type with all properties
export interface PlanDetails {
	id: string
	name: string
	slug: string
	planType: "EDUCATION" | "GOVERNMENT"
	billingInterval: "MONTHLY" | "YEARLY"
	discount: number
	monthlyPrice: number
	yearlyPrice?: number | null
	installationFee: number
	features: string[]
	inclusions: string[]
	addons: string[]
	equipment: string[]
	hasKiosk: boolean
	isActive: boolean
}

// Subscription type for better reusability
export interface Subscription {
	id: string
	planType: "EDUCATION" | "GOVERNMENT"
	billingInterval: "MONTHLY" | "YEARLY"
	price: number
	discount: number
	installationDate: string | null
	subscriptionStatus: SubscriptionStatus
	createdAt: string
	updatedAt: string
	planId: string
	subscriberId: string
	subscriberDetailId: string
	plan?: PlanDetails | null
}

// Extended client type with subscription details used in the detail view
export interface ClientDetail extends Client {
	status?: string
	contactPerson?: string
	plan?: string
	subscriptions: Subscription[]
	subscriptionDetails?: {
		id: string
		clientName: string | null
		siteAddress: string | null
		contactPerson: string
		contactEmail: string
		contactNumber: string
		contactDesignation: string | null
		createdAt: string
		updatedAt: string
	} | null
}
