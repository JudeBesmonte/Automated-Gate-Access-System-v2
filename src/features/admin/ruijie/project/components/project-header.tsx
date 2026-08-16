"use client"

import {
	PageHeader,
	PageHeaderDescription,
	PageHeaderTitle
} from "@/core/components/ui/page"

import { useProject } from "@/features/admin/ruijie/project/lib/hooks"

export const ProjectHeader = ({ projectId }: { projectId: string }) => {
	const { data } = useProject(projectId)

	return (
		<PageHeader>
			<PageHeaderTitle>{data?.name}</PageHeaderTitle>
			<PageHeaderDescription>{data?.description}</PageHeaderDescription>
		</PageHeader>
	)
}
