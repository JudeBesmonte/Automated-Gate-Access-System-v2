"use client"

import Link from "next/link"
import { useMemo } from "react"
import { type ColumnDef } from "@tanstack/react-table"
import { ChevronRight } from "lucide-react"
import { useQueryStates } from "nuqs"

import { DataTableColumnHeader } from "@/core/components/data-table/column-header"
import { DataTableSortList } from "@/core/components/data-table/sort-list"
import { DataTable } from "@/core/components/data-table/table"
import { DataTableToolbar } from "@/core/components/data-table/toolbar"
import {
	Avatar,
	AvatarFallback,
	AvatarImage
} from "@/core/components/ui/avatar"
import { Badge } from "@/core/components/ui/badge"
import { Button } from "@/core/components/ui/button"
import { Checkbox } from "@/core/components/ui/checkbox"
import { useDataTable } from "@/core/hooks/use-data-table"

import { useGetClients } from "@/features/admin/clients/lib/hooks"
import { clientsSearchParamsParser } from "@/features/admin/clients/lib/search-params"
import { type GetClientResponse } from "@/features/admin/clients/server/type"

export function ClientsTable() {
	const [searchParams] = useQueryStates(clientsSearchParamsParser)
	const { data, isLoading } = useGetClients(searchParams)

	const columns = useMemo<ColumnDef<GetClientResponse>[]>(
		() => [
			{
				id: "select",
				header: ({ table }) => (
					<div className="flex w-4 items-center justify-center">
						<Checkbox
							className="bg-accent text-accent-foreground data-[state=checked]:bg-accent data-[state=checked]:text-primary dark:bg-muted dark:data-[state=checked]:text-muted-foreground"
							checked={
								table.getIsAllPageRowsSelected() ||
								(table.getIsSomePageRowsSelected() && "indeterminate")
							}
							onCheckedChange={(value) =>
								table.toggleAllPageRowsSelected(!!value)
							}
							aria-label="Select all"
						/>
					</div>
				),
				cell: ({ row }) => (
					<div className="flex w-4 items-center justify-center">
						<Checkbox
							checked={row.getIsSelected()}
							onCheckedChange={(value) => row.toggleSelected(!!value)}
							aria-label="Select row"
						/>
					</div>
				),
				enableSorting: false,
				enableHiding: false,
				size: 40
			},
			{
				id: "name",
				accessorKey: "name",
				header: ({ column }) => (
					<DataTableColumnHeader column={column} title="Client" />
				),
				cell: ({ row }) => {
					const client = row.original
					return (
						<Link
							className="flex cursor-pointer items-center gap-3"
							href={`/admin/client/${client.id}`}
						>
							<Avatar className="h-8 w-8">
								<AvatarImage
									src={client.image ?? `/placeholder.svg?height=32&width=32`}
									alt={client.name ?? ""}
								/>
								<AvatarFallback>{client.name?.substring(0, 2)}</AvatarFallback>
							</Avatar>
							{client.name}
						</Link>
					)
				},
				meta: {
					label: "Client",
					placeholder: "Search by client name...",
					variant: "text",
					paramId: "name"
				},
				enableColumnFilter: true
			},
			{
				id: "email",
				accessorKey: "email",
				header: ({ column }) => (
					<DataTableColumnHeader column={column} title="Email" />
				),
				cell: ({ row }) => {
					const client = row.original
					return (
						<Link
							className="cursor-pointer"
							href={`/admin/client/${client.id}`}
						>
							{client.email}
						</Link>
					)
				},
				meta: {
					label: "Email",
					placeholder: "Search by email...",
					variant: "text",
					paramId: "email"
				},
				enableColumnFilter: true
			},
			{
				id: "role",
				accessorKey: "role",
				header: ({ column }) => (
					<DataTableColumnHeader column={column} title="Role" />
				),
				cell: ({ row }) => {
					const client = row.original
					return (
						<Link
							className="cursor-pointer"
							href={`/admin/client/${client.id}`}
						>
							<Badge variant="secondary">{client.role.toLowerCase()}</Badge>
						</Link>
					)
				}
			},
			{
				id: "actions",
				enableHiding: false,
				cell: ({ row }) => {
					const client = row.original
					return (
						<Link
							className="flex cursor-pointer justify-center"
							href={`/admin/client/${client.id}`}
						>
							<Button variant="ghost" size="icon" className="rounded-full">
								<ChevronRight className="h-4 w-4" />
							</Button>
						</Link>
					)
				},
				size: 40,
				enableSorting: false
			}
		],
		[]
	)

	const { table } = useDataTable({
		data: data?.clients ?? [],
		columns: columns,
		pageCount: data?.pageCount ?? 0,
		manualPagination: true,
		manualSorting: true,
		manualFiltering: true,
		getRowId: (row) => row.id
	})

	return (
		<DataTable table={table} isLoading={isLoading} rowCount={10}>
			<DataTableToolbar table={table}>
				<DataTableSortList table={table} />
			</DataTableToolbar>
		</DataTable>
	)
}
