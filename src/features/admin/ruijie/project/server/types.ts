import type { getProjects } from "@/features/admin/ruijie/project/server/actions"

export type GetProjectsResponse = Awaited<ReturnType<typeof getProjects>>
export type GetProjectResponse = GetProjectsResponse["projects"][number]
