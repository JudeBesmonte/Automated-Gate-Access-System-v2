import { type Voucher } from "@prisma/client"
import { type ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"

import { Badge } from "@/core/components/ui/badge"
import { Checkbox } from "@/core/components/ui/checkbox"

export const columns: ColumnDef<Voucher>[] = [
	{
		id: "select",
		header: ({ table }) => (
			<Checkbox
				checked={table.getIsAllPageRowsSelected()}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label="Select all"
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label="Select row"
			/>
		),
		enableSorting: false,
		enableHiding: false
	},
	{
		accessorKey: "voucherCode", // Match Prisma field name
		header: "Voucher Code",
		cell: ({ row }) => (
			<div className="font-medium">{row.original.voucherCode}</div>
		)
	},
	{
		accessorKey: "status",
		header: "Status",
		cell: ({ row }) => (
			<Badge
				variant={row.original.status === "active" ? "default" : "destructive"}
			>
				{row.original.status}
			</Badge>
		)
	},
	{
		accessorKey: "timePeriod",
		header: "Time Period",
		cell: ({ row }) => {
			// Convert minutes to date if needed
			const date = new Date(
				row.original.createdAt.getTime() + row.original.timePeriod * 60000
			)
			return format(date, "MMM dd, yyyy HH:mm")
		}
	},
	{
		accessorKey: "usedQuota", // From your API response
		header: "Used Quota",
		cell: ({ row }) => <div>{row.original.usedQuota} MB</div>
	}
]
