import { useMutation, useQueries, useQuery } from "@tanstack/react-query"
import { toast } from "sonner"

import type { AppErr } from "@/core/lib/errors"
import { getQueryClient } from "@/core/lib/get-query-client"

import {
	batchFetch,
	editProjectImageUrl,
	getProject,
	getProjects,
	mySession
} from "../_server/actions"

export const useMySession = () =>
	useQuery({
		queryKey: ["my-session"],
		queryFn: mySession
	})

export const useProjects = () =>
	useQuery({
		queryKey: ["projects"],
		queryFn: getProjects
	})

export const useProject = ({ projectId }: { projectId: string }) =>
	useQuery({
		queryKey: ["project", projectId],
		queryFn: () => getProject({ projectId }),
		enabled: !!projectId
	})

export const useEditProjectImageUrl = () => {
	const queryClient = getQueryClient()
	return useMutation({
		mutationKey: ["edit-project-image-url"],
		mutationFn: editProjectImageUrl,
		onError: (error: AppErr) => {
			toast.error(error.name, {
				description: error.message
			})
		},
		onSuccess: () => toast.success("Project image URL updated successfully"),
		onSettled: () => queryClient.invalidateQueries({ queryKey: ["project"] })
	})
}

export const useCombinedQueries = (projectId: string) => {
	return useQueries({
		queries: [
			// Session query
			{
				queryKey: ["my-session"],
				// queryFn: async () => {
				// 	await new Promise((resolve) => setTimeout(resolve, 3000))
				// 	return "session"
				// },
				queryFn: mySession,
				// Shared options
				staleTime: 60_000
			},
			// Projects list
			{
				queryKey: ["projects"],
				// queryFn: async () => {
				// 	await new Promise((resolve) => setTimeout(resolve, 1000))
				// 	return "projects"
				// },
				queryFn: getProjects,
				staleTime: 60_000
			},
			// Specific project
			{
				queryKey: ["project", projectId],
				// queryFn: async () => {
				// 	await new Promise((resolve) => setTimeout(resolve, 3000))
				// 	return "project"
				// },
				queryFn: () => getProject({ projectId }),
				enabled: !!projectId, // Maintain enabled condition
				retry: 0,
				meta: {
					error: {
						displayMode: "both"
					}
				}
			}
		]
	})
}

/**
 * A hook that fetches multiple resources in a single API call
 * to reduce authentication overhead and improve performance
 */
export const useBatchData = ({ projectId }: { projectId: string }) => {
	return useQuery({
		queryKey: ["batch-data", { projectId }],
		queryFn: () => batchFetch({ projectId })
	})
}
