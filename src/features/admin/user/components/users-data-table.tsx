"use client"

import { useMemo } from "react"
import { type ColumnDef } from "@tanstack/react-table"
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
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from "@/core/components/ui/dropdown-menu"
import { useDataTable } from "@/core/hooks/use-data-table"
import { CalendarIcon, CopyIcon, MoreHorizontalIcon } from "@/core/lib/icons"
import { formatDate, getInitials } from "@/core/lib/utils"

import { AddUserButton } from "@/features/admin/user/components/actions/add-user-button"
import { DeleteUserButton } from "@/features/admin/user/components/actions/delete-user-button"
import { EditUserButton } from "@/features/admin/user/components/actions/edit-user-button"
import { useUsers } from "@/features/admin/user/lib/hooks"
import { usersSearchParamsParser } from "@/features/admin/user/lib/search-params"
import { type GetUserResponse } from "@/features/admin/user/server/types"
import { useAuthSession } from "@/features/auth/lib/hooks"

export const UsersDataTable = () => {
	const [searchParams] = useQueryStates(usersSearchParamsParser)
	const { data: session } = useAuthSession()
	const { data, isLoading } = useUsers(searchParams)

	const columns = useMemo<ColumnDef<GetUserResponse>[]>(
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
					<DataTableColumnHeader column={column} title="Name" />
				),
				cell: ({ row }) => {
					const user = row.original
					const name = user.name ?? "No Name"
					const initials = getInitials(name)

					return (
						<div className="flex items-center gap-2">
							<Avatar className="h-8 w-8">
								<AvatarImage src={user.image ?? undefined} alt={name} />
								<AvatarFallback>{initials}</AvatarFallback>
							</Avatar>
							<span>{name}</span>
						</div>
					)
				},
				meta: {
					label: "Name",
					placeholder: "Search users...",
					variant: "text"
				},
				enableColumnFilter: true
			},
			{
				accessorKey: "email",
				header: ({ column }) => (
					<DataTableColumnHeader column={column} title="Email" />
				),
				meta: { label: "Email" }
			},
			{
				id: "role",
				accessorKey: "role",
				header: ({ column }) => (
					<DataTableColumnHeader column={column} title="Role" />
				),
				cell: ({ cell }) => {
					const role = cell.getValue() as string
					return <Badge className="capitalize">{role.toLowerCase()}</Badge>
				},
				meta: {
					label: "Role",
					variant: "multiSelect",
					options: [
						{ label: "Admin", value: "ADMIN" },
						{ label: "Client", value: "CLIENT" },
						{ label: "Staff", value: "STAFF" }
					],
					paramId: "role"
				},
				enableColumnFilter: true,
				size: 80
			},
			{
				id: "createdAt",
				accessorKey: "createdAt",
				header: ({ column }) => (
					<DataTableColumnHeader column={column} title="Created At" />
				),
				cell: ({ cell }) => formatDate(cell.getValue() as Date),
				meta: {
					label: "Created At",
					variant: "dateRange",
					icon: CalendarIcon
				},
				enableColumnFilter: true
			},
			{
				id: "updatedAt",
				accessorKey: "updatedAt",
				header: ({ column }) => (
					<DataTableColumnHeader column={column} title="Updated At" />
				),
				cell: ({ cell }) => formatDate(cell.getValue() as Date),
				meta: {
					label: "Updated At",
					variant: "dateRange",
					icon: CalendarIcon
				},
				enableColumnFilter: true
			},
			{
				id: "actions",
				enableHiding: false,
				cell: ({ row }) => {
					const user = row.original
					if (session?.user.id && user.id === session.user.id) return null

					return (
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="ghost" className="h-6 w-6 rounded-sm p-0">
									<span className="sr-only">Open menu</span>
									<MoreHorizontalIcon />
								</Button>
							</DropdownMenuTrigger>

							<DropdownMenuContent align="end" className="w-40">
								<DropdownMenuLabel>Action</DropdownMenuLabel>
								<EditUserButton user={user} />
								<DropdownMenuItem
									onClick={() => navigator.clipboard.writeText(user.name ?? "")}
								>
									<CopyIcon />
									Copy name
								</DropdownMenuItem>

								<DropdownMenuSeparator />

								<DeleteUserButton id={user.id} />
							</DropdownMenuContent>
						</DropdownMenu>
					)
				},
				size: 40
			}
		],
		[session?.user.id]
	)

	const { table } = useDataTable({
		data: data?.users ?? [],
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
				<AddUserButton />
				<DataTableSortList table={table} />
			</DataTableToolbar>
		</DataTable>
	)
}
