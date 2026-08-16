import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

import { getQueryClient } from "@/core/lib/get-query-client"

import { subscribeToPlan } from "@/features/client/subscribe/server/actions"

export const useSubscribeToPlan = () => {
	const queryClient = getQueryClient()

	return useMutation({
		mutationKey: ["subscribeToPlan"],
		mutationFn: subscribeToPlan,
		onSuccess: () => {
			void queryClient.invalidateQueries({ queryKey: ["subscribeToPlan"] })
			toast.success(
				"Congratulations! You have successfully subscribed to the plan."
			)
		},
		onError: (error) => {
			toast.error(
				error instanceof Error ? error.message : "Failed to subscribe to plan"
			)
		}
	})
}
