"use client"

import { PageBreadcrumb } from "@/core/components/ui/page"

import { useVoucherGroupBreadcrumb } from "@/features/admin/ruijie/voucher-group/lib/hooks"

type ProjectBreadcrumbProps = {
	projectId: string
}

export const VoucherGroupBreadcrumb = ({
	projectId
}: ProjectBreadcrumbProps) => {
	const { data } = useVoucherGroupBreadcrumb({ projectId })

	const breadcrumbItems = [
		{ label: "Project", url: "/admin/project" },
		{ label: data.projectName },
		{ label: "Voucher Group" }
	]

	return <PageBreadcrumb items={breadcrumbItems} />
}
