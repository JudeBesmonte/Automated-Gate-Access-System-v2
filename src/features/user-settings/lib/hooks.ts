import { useMutation } from "@tanstack/react-query"
import { type Session } from "next-auth"
import { toast } from "sonner"

import { getQueryClient } from "@/core/lib/get-query-client"

import {
	editUserEmail,
	editUserPassword,
	editUserProfile
} from "@/features/user-settings/server/action"

const queryClient = getQueryClient()

export const useEditUserProfile = () => {
	return useMutation({
		mutationKey: ["editUserProfile"],
		mutationFn: editUserProfile,
		onMutate: async (newUser) => {
			await queryClient.cancelQueries({ queryKey: ["authSession"] })
			const previousSession = queryClient.getQueryData<Session>(["authSession"])

			if (previousSession) {
				queryClient.setQueryData<Session>(["authSession"], {
					...previousSession,
					user: { ...previousSession.user, ...newUser }
				})
			}

			return { previousSession }
		},
		onSuccess: (data) => {
			const message = data?.success ?? "Profile updated successfully"
			toast.success(message)
		},
		onError: (err, _, context) => {
			if (context?.previousSession) {
				queryClient.setQueryData(["authSession"], context.previousSession)
			}
			toast.error(err.message ?? "Failed to update profile")
		},
		onSettled: () =>
			void queryClient.invalidateQueries({ queryKey: ["authSession"] })
	})
}

export const useEditUserEmail = () => {
	return useMutation({
		mutationKey: ["editUserEmail"],
		mutationFn: editUserEmail,
		onMutate: async (newEmail) => {
			await queryClient.cancelQueries({ queryKey: ["authSession"] })

			const previousSession = queryClient.getQueryData<Session>(["authSession"])

			if (previousSession) {
				queryClient.setQueryData<Session>(["authSession"], {
					...previousSession,
					user: { ...previousSession.user, ...newEmail }
				})
			}

			return { previousSession }
		},
		onSuccess: () => {
			toast.success("Email updated successfully")
		},
		onError: (err, _, context) => {
			if (context?.previousSession) {
				queryClient.setQueryData(["authSession"], context.previousSession)
			}
			toast.error(err.message ?? "Something went wrong")
		},
		onSettled: () => {
			void queryClient.invalidateQueries({ queryKey: ["authSession"] })
		}
	})
}

export const useEditUserPassword = () => {
	return useMutation({
		mutationKey: ["editUserPassword"],
		mutationFn: editUserPassword,
		onSuccess: () => {
			toast.success("Password updated successfully")
		},
		onError: (err) => toast.error(err.message ?? "Something went wrong"),
		onSettled: () => {
			void queryClient.invalidateQueries({ queryKey: ["authSession"] })
		}
	})
}
