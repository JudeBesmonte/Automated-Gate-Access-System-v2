"use client"

import { queryOptions, useMutation, useQuery } from "@tanstack/react-query"
import { toast } from "sonner"

import { getQueryClient } from "@/core/lib/get-query-client"

import {
	type PlanParserType,
	type SubscriptionParserType
} from "@/features/admin/plans/lib/search-params"
import {
	createPlan,
	deletePlan,
	getAdminPlans,
	getAvailablePlans,
	getSubscriptions,
	scheduleInstallation,
	sendPaymentReminder,
	updatePlan,
	updateSubscriptionStatus
} from "@/features/admin/plans/server/actions"

// --- Plans ---

export const useAdminPlans = (params?: PlanParserType) => {
	return useQuery({
		queryKey: ["plans", params],
		queryFn: () => getAdminPlans(params)
	})
}

export const useCreatePlan = () => {
	const queryClient = getQueryClient()

	return useMutation({
		mutationKey: ["createPlan"],
		mutationFn: createPlan,
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ["plans"] })
		}
	})
}

export const availablePlansOptions = () => {
	return queryOptions({
		queryKey: ["plans"],
		queryFn: () => getAvailablePlans()
	})
}

export const useAvailablePlans = () => {
	return useQuery(availablePlansOptions())
}

export const useUpdatePlan = () => {
	const queryClient = getQueryClient()

	return useMutation({
		mutationKey: ["updatePlan"],
		mutationFn: updatePlan,
		onSuccess: async () => {
			toast.success("Plan updated successfully")
			await queryClient.invalidateQueries({ queryKey: ["plans"] })
		},
		onError: async (err) => {
			toast.error(err.message ?? "Something went wrong")
			await queryClient.invalidateQueries({ queryKey: ["plans"] })
		}
	})
}

export const useDeletePlan = () => {
	const queryClient = getQueryClient()

	return useMutation({
		mutationKey: ["deletePlan"],
		mutationFn: deletePlan,
		onSuccess: async () => {
			toast.success("Plan deleted successfully")
			await queryClient.invalidateQueries({ queryKey: ["plans"] })
		},
		onError: async (err) => {
			toast.error(err.message ?? "Something went wrong")
			await queryClient.invalidateQueries({ queryKey: ["plans"] })
		}
	})
}

// --- Subscriptions ---

export const useGetSubscriptions = (params?: SubscriptionParserType) => {
	return useQuery({
		queryKey: ["subscriptions", params],
		queryFn: async () => await getSubscriptions(params)
	})
}

export const useUpdateSubscriptionStatus = () => {
	const queryClient = getQueryClient()

	return useMutation({
		mutationKey: ["updateSubscriptionStatus"],
		mutationFn: updateSubscriptionStatus,
		onSuccess: async () =>
			toast.success("Subscription status updated successfully"),
		onError: async (err) => toast.error(err.message ?? "Something went wrong"),
		onSettled: () => {
			void queryClient.invalidateQueries({ queryKey: ["subscriptions"] })
		}
	})
}

export const useScheduleInstallation = () => {
	const queryClient = getQueryClient()

	return useMutation({
		mutationKey: ["scheduleInstallation"],
		mutationFn: scheduleInstallation,
		onSuccess: async () =>
			toast.success("Installation scheduled successfully"),
		onError: async (err) => toast.error(err.message ?? "Something went wrong"),
		onSettled: () => {
			void queryClient.invalidateQueries({ queryKey: ["subscriptions"] })
		}
	})
}

export const useSendPaymentReminder = () => {
	return useMutation({
		mutationKey: ["sendPaymentReminder"],
		mutationFn: sendPaymentReminder,
		onSuccess: async () =>
			toast.success("Payment reminder sent successfully"),
		onError: async (err) => toast.error(err.message ?? "Failed to send payment reminder")
	})
}
