"use client"

import { useMemo, useState } from "react"

import { SyncButton } from "@/services/ruijie/components/sync-button"

import { Separator } from "@/core/components/ui/separator"

import { ProjectCard } from "@/features/admin/ruijie/project/components/project-card"
import { ProjectCardSkeleton } from "@/features/admin/ruijie/project/components/project-card-skeleton"
import { ProjectFilter } from "@/features/admin/ruijie/project/components/project-filter"
import { useProjects } from "@/features/admin/ruijie/project/lib/hooks"

export const ProjectList = () => {
	const { data, isLoading } = useProjects()
	const [filters, setFilters] = useState({
		search: ""
	})

	const filteredProjects = useMemo(() => {
		const searchTerm = filters.search.toLowerCase()
		if (!searchTerm) return data?.projects
		return data?.projects?.filter(
			(project) =>
				project.name.toLowerCase().includes(searchTerm) ||
				project.description?.toLowerCase().includes(searchTerm)
		)
	}, [data?.projects, filters])

	const hasProjects = filteredProjects && filteredProjects.length > 0

	return (
		<>
			<div className="flex w-full justify-between">
				<ProjectFilter filters={filters} setFilters={setFilters} />
				<SyncButton />
			</div>

			<Separator className="shadow-sm" />

			{!isLoading && !hasProjects && (
				<div className="w-full rounded-xl border-2 border-dashed bg-card p-16 text-center text-muted-foreground">
					No projects found.
				</div>
			)}

			<div className="flex flex-wrap justify-center gap-4 lg:justify-normal">
				{isLoading && (
					<div className="flex h-full w-full flex-wrap gap-4">
						{Array.from({ length: 4 }).map((_, index) => (
							<ProjectCardSkeleton key={index} />
						))}
					</div>
				)}

				{filteredProjects?.map((project) => (
					<ProjectCard key={project.id} project={project} />
				))}
			</div>
		</>
	)
}
