import { useMutation, useQuery } from "@tanstack/react-query"
import { toast } from "sonner"

import { getQueryClient } from "@/core/lib/get-query-client"

import type { ProjectSearchParams } from "@/features/admin/ruijie/project/lib/search-params"
import {
	getProject,
	getProjects,
	updateProjectImage
} from "@/features/admin/ruijie/project/server/actions"

export const useProject = (projectId: string) =>
	useQuery({
		queryKey: ["project", projectId],
		queryFn: () => getProject({ projectId })
	})

export const useProjects = (params?: ProjectSearchParams) =>
	useQuery({
		queryKey: ["projects", params],
		queryFn: () => getProjects(params)
	})

export const useUploadImage = () => {
	const queryClient = getQueryClient()
	return useMutation({
		mutationKey: ["updateImage"],
		mutationFn: updateProjectImage,
		onSuccess: async () => toast.success("Image uploaded successfully!"),
		onError: () => toast.error("Failed to upload image. Please try again."),
		onSettled: async () => {
			await queryClient.invalidateQueries({ queryKey: ["projects"] })
		}
	})
}
