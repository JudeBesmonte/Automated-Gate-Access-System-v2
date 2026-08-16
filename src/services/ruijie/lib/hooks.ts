import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

import {
	syncProjects,
	syncProjectsWithVoucherGroups,
	syncProjectsWithVoucherGroupsAndVouchers,
	syncProjectVouchers
} from "@/services/ruijie/server/actions"

import { getQueryClient } from "@/core/lib/get-query-client"

export const useSyncProjects = () => {
	const queryClient = getQueryClient()

	return useMutation({
		mutationKey: ["syncProjects"],
		mutationFn: () => syncProjects(),
		onSuccess: () => {
			void queryClient.invalidateQueries({ queryKey: ["projects"] })
			toast.success("Projects synced successfully")
		},
		onError: (error) => {
			toast.error(
				error instanceof Error ? error.message : "Failed to sync projects"
			)
		}
	})
}

export const useSyncProjectsWithVoucherGroups = () => {
	const queryClient = getQueryClient()

	return useMutation({
		mutationKey: ["syncProjectsWithVoucherGroups"],
		mutationFn: () => syncProjectsWithVoucherGroups(),
		onSuccess: () => {
			void queryClient.invalidateQueries({ queryKey: ["projects"] })
			toast.success("Projects & Voucher Groups synced successfully")
		},
		onError: (error) => {
			toast.error(
				error instanceof Error
					? error.message
					: "Failed to sync projects & voucher groups"
			)
		}
	})
}

export const useSyncProjectsWithVoucherGroupsAndVouchers = () => {
	const queryClient = getQueryClient()

	return useMutation({
		mutationKey: ["syncProjectsWithVoucherGroupsAndVouchers"],
		mutationFn: () => syncProjectsWithVoucherGroupsAndVouchers(),
		onSuccess: () => {
			void queryClient.invalidateQueries({ queryKey: ["projects"] })
			toast.success("Projects & Voucher Groups & Vouchers synced successfully")
		},
		onError: (error) => {
			toast.error(
				error instanceof Error
					? error.message
					: "Failed to sync projects & voucher groups & vouchers"
			)
		}
	})
}

export const useSyncProjectVouchers = () => {
	const queryClient = getQueryClient()

	return useMutation({
		mutationKey: ["syncProjectVouchers"],
		mutationFn: () => syncProjectVouchers(),
		onSuccess: () => {
			void queryClient.invalidateQueries({ queryKey: ["vouchers"] })
			toast.success("Vouchers synced successfully")
		},
		onError: (error) => {
			toast.error(
				error instanceof Error ? error.message : "Failed to sync vouchers"
			)
		}
	})
}
