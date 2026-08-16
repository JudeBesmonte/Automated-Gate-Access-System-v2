import { useMutation, useQuery } from "@tanstack/react-query"
import { toast } from "sonner"

import { getQueryClient } from "@/core/lib/get-query-client"

import {
	addKiosk,
	deleteKiosk,
	editKiosk,
	getKiosksByProject
} from "@/features/kiosk/server/actions"

export const useKiosks = (projectId: string) =>
	useQuery({
		queryKey: ["kiosks", projectId],
		queryFn: async () => (await getKiosksByProject({ projectId })) ?? []
	})

export const useAddKiosk = () => {
	const queryClient = getQueryClient()

	return useMutation({
		mutationFn: addKiosk,
		onSuccess: () => {
			void queryClient.invalidateQueries({ queryKey: ["kiosks"] })
			toast.success("Kiosk created successfully")
		},
		onError: (error) => toast.error(error.message || "Something went wrong")
	})
}

export const useEditKiosk = () => {
	const queryClient = getQueryClient()

	return useMutation({
		mutationFn: editKiosk,
		onSuccess: () => {
			void queryClient.invalidateQueries({ queryKey: ["kiosks"] })
			toast.success("Kiosk updated successfully")
		},
		onError: (error) => toast.error(error.message || "Something went wrong")
	})
}

export const useDeleteKiosk = () => {
	const queryClient = getQueryClient()

	return useMutation({
		mutationFn: deleteKiosk,
		onSuccess: () => {
			void queryClient.invalidateQueries({ queryKey: ["kiosks"] })
			toast.success("Kiosk deleted successfully")
		},
		onError: (error) => toast.error(error.message || "Failed to delete kiosk")
	})
}
