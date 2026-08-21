import {
	PageBreadcrumb,
	PageContainer,
	PageContent,
	PageHeader,
	PageHeaderDescription,
	PageHeaderTitle
} from "@/core/components/ui/page"
import { Badge } from "@/core/components/ui/badge"
import { Button } from "@/core/components/ui/button"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from "@/core/components/ui/table"
import { PlusIcon } from "lucide-react"

const staticTags = [
	{
		id: "TAG-001",
		uid: "A1B2C3D4",
		label: "Main Gate Card",
		assignedTo: "John Doe",
		status: "Active",
		issuedAt: "2025-01-10"
	},
	{
		id: "TAG-002",
		uid: "E5F6A7B8",
		label: "Parking Access",
		assignedTo: "Jane Smith",
		status: "Active",
		issuedAt: "2025-02-14"
	},
	{
		id: "TAG-003",
		uid: "C9D0E1F2",
		label: "Staff Entry",
		assignedTo: "Bob Johnson",
		status: "Inactive",
		issuedAt: "2025-03-05"
	},
	{
		id: "TAG-004",
		uid: "G3H4I5J6",
		label: "Visitor Pass",
		assignedTo: "Unassigned",
		status: "Pending",
		issuedAt: "2025-04-20"
	}
]

export default function Page() {
	const breadcrumbItems = [
		{ label: "Admin", url: "/admin" },
		{ label: "RFID Tags" }
	]

	return (
		<>
			<PageBreadcrumb items={breadcrumbItems} />

			<PageContainer>
				<PageHeader>
					<div className="flex w-full items-start justify-between gap-4">
						<div className="flex flex-col gap-1">
							<PageHeaderTitle>RFID Tag Management</PageHeaderTitle>
							<PageHeaderDescription>
								Manage and monitor all registered RFID tags and their assignments
							</PageHeaderDescription>
						</div>
						<Button size="sm" className="shrink-0">
							<PlusIcon className="mr-2 size-4" />
							Add Tag
						</Button>
					</div>
				</PageHeader>

				<PageContent>
					<div className="rounded-lg border">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Tag ID</TableHead>
									<TableHead>UID</TableHead>
									<TableHead>Label</TableHead>
									<TableHead>Assigned To</TableHead>
									<TableHead>Status</TableHead>
									<TableHead>Issued At</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{staticTags.map((tag) => (
									<TableRow key={tag.id}>
										<TableCell className="font-mono text-sm">{tag.id}</TableCell>
										<TableCell className="font-mono text-sm text-muted-foreground">
											{tag.uid}
										</TableCell>
										<TableCell>{tag.label}</TableCell>
										<TableCell>{tag.assignedTo}</TableCell>
										<TableCell>
											<Badge
												variant={
													tag.status === "Active"
														? "default"
														: tag.status === "Inactive"
															? "secondary"
															: "outline"
												}
											>
												{tag.status}
											</Badge>
										</TableCell>
										<TableCell className="text-muted-foreground">
											{tag.issuedAt}
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</div>
				</PageContent>
			</PageContainer>
		</>
	)
}
