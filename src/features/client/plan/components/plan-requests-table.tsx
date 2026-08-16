import { useState } from "react"
import { ChevronDown, Filter, Search } from "lucide-react"

import { Button } from "@/core/components/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from "@/core/components/ui/card"
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger
} from "@/core/components/ui/dropdown-menu"
import { Input } from "@/core/components/ui/input"

import { getStatusBadge } from "./get-status-badge"

export default function PlanRequestsTable() {
	const [statusFilter, setStatusFilter] = useState<string[]>([])
	const submittedRequests = [
		{
			id: "REQ-2023-001",
			date: "2023-05-15",
			plan: "Premium Plan",
			company: "Acme Corporation",
			status: "approved"
		},
		{
			id: "REQ-2023-002",
			date: "2023-06-22",
			plan: "Enterprise Plan",
			company: "Acme Corporation",
			status: "pending"
		},
		{
			id: "REQ-2023-003",
			date: "2023-08-10",
			plan: "Basic Plan",
			company: "Acme Corporation",
			status: "rejected"
		},
		{
			id: "REQ-2023-004",
			date: "2023-11-05",
			plan: "Premium Plan",
			company: "Acme Corporation",
			status: "pending"
		}
	]

	const filteredRequests =
		statusFilter.length > 0
			? submittedRequests.filter((request) =>
					statusFilter.includes(request.status)
				)
			: submittedRequests

	return (
		<Card className="mt-8">
			<CardHeader>
				<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
					<div>
						<CardTitle className="text-2xl">Submitted Plan Requests</CardTitle>
						<CardDescription>
							View and track all your subscription requests
						</CardDescription>
					</div>
					<div className="flex items-center gap-2">
						<div className="relative">
							<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
							<Input
								type="search"
								placeholder="Search requests..."
								className="w-full pl-8 sm:w-[200px]"
							/>
						</div>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									variant="outline"
									size="sm"
									className="flex items-center gap-1"
								>
									<Filter className="h-4 w-4" />
									Filter
									<ChevronDown className="h-4 w-4" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								<DropdownMenuCheckboxItem
									checked={statusFilter.includes("approved")}
									onCheckedChange={(checked) => {
										setStatusFilter((prev) =>
											checked
												? [...prev, "approved"]
												: prev.filter((status) => status !== "approved")
										)
									}}
								>
									Approved
								</DropdownMenuCheckboxItem>
								<DropdownMenuCheckboxItem
									checked={statusFilter.includes("pending")}
									onCheckedChange={(checked) => {
										setStatusFilter((prev) =>
											checked
												? [...prev, "pending"]
												: prev.filter((status) => status !== "pending")
										)
									}}
								>
									Pending
								</DropdownMenuCheckboxItem>
								<DropdownMenuCheckboxItem
									checked={statusFilter.includes("rejected")}
									onCheckedChange={(checked) => {
										setStatusFilter((prev) =>
											checked
												? [...prev, "rejected"]
												: prev.filter((status) => status !== "rejected")
										)
									}}
								>
									Rejected
								</DropdownMenuCheckboxItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>
			</CardHeader>
			<CardContent>
				<div className="rounded-md border">
					<div className="grid grid-cols-12 gap-2 border-b bg-muted/50 p-4 font-medium">
						<div className="col-span-2">Request ID</div>
						<div className="col-span-2">Date</div>
						<div className="col-span-3">Plan</div>
						<div className="col-span-3">Company</div>
						<div className="col-span-2">Status</div>
					</div>
					{filteredRequests.length > 0 ? (
						filteredRequests.map((request) => (
							<div
								key={request.id}
								className="grid grid-cols-12 items-center gap-2 border-b p-4 transition-colors last:border-0 hover:bg-muted/20"
							>
								<div className="col-span-2 font-medium">{request.id}</div>
								<div className="col-span-2 text-sm text-muted-foreground">
									{request.date}
								</div>
								<div className="col-span-3">{request.plan}</div>
								<div className="col-span-3 text-sm">{request.company}</div>
								<div className="col-span-2">
									{getStatusBadge(request.status)}
								</div>
							</div>
						))
					) : (
						<div className="p-8 text-center text-muted-foreground">
							No requests match your filter criteria. Try adjusting your
							filters.
						</div>
					)}
				</div>
			</CardContent>
			<CardFooter className="flex justify-between">
				<div className="text-sm text-muted-foreground">
					Showing {filteredRequests.length} of {submittedRequests.length}{" "}
					requests
				</div>
			</CardFooter>
		</Card>
	)
}
