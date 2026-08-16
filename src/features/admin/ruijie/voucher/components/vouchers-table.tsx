"use client"

import { DataTable } from "@/features/admin/ruijie/voucher/components/data-table"
import { columns } from "@/features/admin/ruijie/voucher/components/data-table-column"
import { VouchersTableSkeleton } from "@/features/admin/ruijie/voucher/components/vouchers-table-skeleton"
import { useVouchersByGroup } from "@/features/admin/ruijie/voucher/lib/hooks"
import type { GetVoucherParams } from "@/features/admin/ruijie/voucher/server/type"

export const VouchersTable = ({ projectId, groupId }: GetVoucherParams) => {
	const { data, isLoading } = useVouchersByGroup({ projectId, groupId })

	if (isLoading) return <VouchersTableSkeleton />

	return (
		<DataTable
			columns={columns}
			data={data ?? []}
			projectId={projectId}
			groupId={groupId}
		/>
	)
}
