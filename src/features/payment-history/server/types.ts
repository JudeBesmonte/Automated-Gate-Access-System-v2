// src/features/payment-history/server/types.ts

import {
	Plan,
	Prisma,
	SubscriberDetail,
	Subscription,
	User
} from "@prisma/client"

// Import specific models for clarity

// Your Enums (keep as they are if correct)
export enum PaymentType {
	PAYMAYA = "PAYMAYA",
	GCASH = "GCASH",
	GRAB_PAY = "GRAB_PAY",
	QRPH = "QRPH",
	CARD = "CARD",
	CASH = "CASH",
	UNKNOWN = "UNKNOWN" // Good to have a fallback
}

export enum PaymentStatus {
	PENDING = "PENDING",
	PROCESSING = "PROCESSING",
	SUCCESS = "SUCCESS",
	FAILED = "FAILED"
}

export enum SubscriptionStatus {
	// PENDING = "PENDING", // 'PENDING' is in PaymentStatus, ensure no naming conflict if used differently
	FOR_PAYMENT = "FOR_PAYMENT",
	PROCESSING = "PROCESSING", // 'PROCESSING' is also in PaymentStatus
	FOR_INSTALLATION = "FOR_INSTALLATION",
	ACTIVE = "ACTIVE",
	SUSPENDED = "SUSPENDED",
	TERMINATED = "TERMINATED"
}

// More specific type for the included subscriptionInfo
// This helps in clearly defining what's expected inside subscriptionInfo
export type SubscriptionInfoWithDetails = Subscription & {
	plan: Plan | null // Plan can be null if the relation is optional or not found
	subscriber: User | null // User can be null
	subscriberDetail: SubscriberDetail | null // SubscriberDetail can be null
	// billingDetail: BillingDetail | null; // Add if you also include billingDetail from Subscription
}

// Corrected GetPaymentResponse using Prisma.PaymentHistoryGetPayload
export type GetPaymentResponse = Prisma.PaymentHistoryGetPayload<{
	include: {
		subscriptionInfo: {
			// This is the relation from PaymentHistory to Subscription
			include: {
				plan: true // Include the related Plan
				subscriber: true // Include the related User (subscriber)
				subscriberDetail: true // Keep if needed for other purposes, or remove if not used
				// billingDetail: true; // Add if you need Subscription's BillingDetail
			}
		}
	}
}>

// Type for the paginated response from the server action
export interface GetPaymentsPaginatedResponse {
	payments: GetPaymentResponse[]
	pageCount: number
	total: number
}
