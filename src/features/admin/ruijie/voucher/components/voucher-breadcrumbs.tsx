"use client"

import { PageBreadcrumb } from "@/core/components/ui/page"

import { useVoucherBreadcrumb } from "@/features/admin/ruijie/voucher/lib/hooks"

type ProjectBreadcrumbProps = {
	projectId: string
	groupId: string
}

export const VoucherBreadcrumb = ({
	projectId,
	groupId
}: ProjectBreadcrumbProps) => {
	const { data } = useVoucherBreadcrumb({ projectId, groupId })

	const breadcrumbItems = [
		{ label: "Project", url: "/admin/project" },
		{ label: data.projectName, url: `/admin/project/${projectId}` },
		{
			label: "Voucher Group",
			url: `/admin/project/${projectId}/voucher-groups`
		},
		{
			label: data.voucherGroupName,
			url: `/admin/project/${projectId}/voucher-groups`
		},
		{ label: "Vouchers" }
	]

	return <PageBreadcrumb items={breadcrumbItems} />
}
