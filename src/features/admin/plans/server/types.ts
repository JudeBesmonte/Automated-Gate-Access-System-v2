import type {
	getAdminPlans,
	getSubscriptions
} from "@/features/admin/plans/server/actions"

export type GetPlansResponse = Awaited<ReturnType<typeof getAdminPlans>>
export type GetPlanResponse = GetPlansResponse["plans"][number]

export type GetSubscriptionsResponse = Awaited<
	ReturnType<typeof getSubscriptions>
>
export type GetSubscriptionResponse =
	GetSubscriptionsResponse["subscriptions"][number]
