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
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from "@/core/components/ui/card"
import { Separator } from "@/core/components/ui/separator"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from "@/core/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/core/components/ui/tabs"
import {
	CameraIcon,
	CheckCircleIcon,
	ClockIcon,
	FileTextIcon,
	RefreshCwIcon,
	ScanIcon,
	UserCheckIcon,
	XCircleIcon
} from "lucide-react"

const recentScans = [
	{
		id: "OCR-001",
		licenseNo: "N01-23-456789",
		name: "Juan Dela Cruz",
		expiry: "2027-06-15",
		gate: "Gate 1 — Entry",
		confidence: 97,
		status: "Verified",
		timestamp: "2026-08-22 08:51:03"
	},
	{
		id: "OCR-002",
		licenseNo: "N02-19-112233",
		name: "Maria Santos",
		expiry: "2025-03-10",
		gate: "Gate 2 — Entry",
		confidence: 93,
		status: "Expired",
		timestamp: "2026-08-22 08:44:38"
	},
	{
		id: "OCR-003",
		licenseNo: "N03-21-998877",
		name: "Roberto Reyes",
		expiry: "2028-11-22",
		gate: "Gate 1 — Entry",
		confidence: 89,
		status: "Verified",
		timestamp: "2026-08-22 08:38:17"
	},
	{
		id: "OCR-004",
		licenseNo: "N04-20-554466",
		name: "Ana Lim",
		expiry: "2026-09-01",
		gate: "Gate 3 — Entry",
		confidence: 61,
		status: "Low Confidence",
		timestamp: "2026-08-22 08:30:55"
	},
	{
		id: "OCR-005",
		licenseNo: "N05-22-771122",
		name: "Carlos Mendoza",
		expiry: "2029-04-18",
		gate: "Gate 2 — Entry",
		confidence: 99,
		status: "Verified",
		timestamp: "2026-08-22 08:21:44"
	}
]

const cameras = [
	{ id: "CAM-01", label: "Gate 1 — Entry", status: "Online", lastScan: "Juan Dela Cruz" },
	{ id: "CAM-02", label: "Gate 2 — Entry", status: "Online", lastScan: "Carlos Mendoza" },
	{ id: "CAM-03", label: "Gate 3 — Entry", status: "Offline", lastScan: null }
]

const statsCards = [
	{
		title: "Total Scans Today",
		value: "74",
		sub: "+8 in the last hour",
		icon: ScanIcon
	},
	{
		title: "Verified",
		value: "61",
		sub: "82% of all scans",
		icon: UserCheckIcon
	},
	{
		title: "Expired / Rejected",
		value: "7",
		sub: "9% of all scans",
		icon: XCircleIcon
	},
	{
		title: "Avg. OCR Accuracy",
		value: "92%",
		sub: "Text extraction confidence",
		icon: CheckCircleIcon
	}
]

const extractedFields = [
	{ label: "Full Name", value: "JUAN DELA CRUZ" },
	{ label: "License No.", value: "N01-23-456789" },
	{ label: "Date of Birth", value: "1990-04-12" },
	{ label: "Address", value: "123 Rizal St., Manila" },
	{ label: "Expiry Date", value: "2027-06-15" },
	{ label: "Restrictions", value: "1, 2" }
]

function StatusBadge({ status }: { status: string }) {
	const variant =
		status === "Verified"
			? "default"
			: status === "Expired"
				? "destructive"
				: "secondary"
	return <Badge variant={variant}>{status}</Badge>
}

function CameraStatusDot({ status }: { status: string }) {
	return (
		<span
			className={`inline-block size-2 rounded-full ${status === "Online" ? "bg-green-500" : "bg-muted-foreground"}`}
		/>
	)
}

export default function Page() {
	const breadcrumbItems = [
		{ label: "Admin", url: "/admin" },
		{ label: "License ID" }
	]

	return (
		<>
			<PageBreadcrumb items={breadcrumbItems} />

			<PageContainer>
				<PageHeader>
					<PageHeaderTitle>Driver&apos;s License ID Scanner</PageHeaderTitle>
					<PageHeaderDescription>
						Camera-based OCR scanning for driver&apos;s licenses — extracted data
						is automatically recorded and verified at entry points
					</PageHeaderDescription>
				</PageHeader>

				<PageContent className="flex flex-col gap-6">
					{/* Stats row */}
					<div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
						{statsCards.map(({ title, value, sub, icon: Icon }) => (
							<Card
								key={title}
								className="bg-gradient-to-t from-primary/5 to-card shadow-xs"
							>
								<CardHeader className="flex flex-row items-center justify-between pb-2">
									<CardDescription className="text-xs font-medium">
										{title}
									</CardDescription>
									<Icon className="size-4 text-muted-foreground" />
								</CardHeader>
								<CardContent>
									<p className="text-2xl font-bold">{value}</p>
									<p className="mt-1 text-xs text-muted-foreground">{sub}</p>
								</CardContent>
							</Card>
						))}
					</div>

					<Tabs defaultValue="live">
						<TabsList>
							<TabsTrigger value="live">
								<CameraIcon className="mr-2 size-4" />
								Live Scanner
							</TabsTrigger>
							<TabsTrigger value="scans">
								<ClockIcon className="mr-2 size-4" />
								Scan History
							</TabsTrigger>
						</TabsList>

						{/* Live scanner tab */}
						<TabsContent value="live" className="mt-4">
							<div className="grid gap-4 lg:grid-cols-3">
								{/* Camera feeds */}
								<div className="flex flex-col gap-4 lg:col-span-2">
									<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
										{cameras.map((cam) => (
											<Card key={cam.id} className="overflow-hidden">
												<CardHeader className="flex flex-row items-center justify-between px-4 py-3">
													<div className="flex flex-col gap-0.5">
														<CardTitle className="text-sm">
															{cam.label}
														</CardTitle>
														<div className="flex items-center gap-1.5">
															<CameraStatusDot status={cam.status} />
															<span className="text-xs text-muted-foreground">
																{cam.status}
															</span>
														</div>
													</div>
													<Badge variant="outline" className="text-xs">
														{cam.id}
													</Badge>
												</CardHeader>

												<Separator />

												<CardContent className="p-0">
													{cam.status === "Online" ? (
														<div className="relative flex aspect-video w-full flex-col items-center justify-center gap-2 bg-muted/40">
															<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(var(--muted))_0%,_hsl(var(--background))_100%)] opacity-60" />
															{/* ID card outline overlay */}
															<div className="absolute inset-x-6 inset-y-4 rounded border border-dashed border-primary/40" />
															<FileTextIcon className="relative size-8 text-muted-foreground/40" />
															<span className="relative text-xs text-muted-foreground">
																Awaiting license scan
															</span>
														</div>
													) : (
														<div className="flex aspect-video w-full flex-col items-center justify-center gap-2 bg-muted/20">
															<CameraIcon className="size-8 text-muted-foreground/30" />
															<span className="text-xs text-muted-foreground">
																Camera offline
															</span>
														</div>
													)}
												</CardContent>

												{cam.status === "Online" && (
													<div className="flex items-center justify-between border-t px-4 py-2">
														<span className="truncate text-xs text-muted-foreground">
															Last: {cam.lastScan}
														</span>
														<Button
															variant="ghost"
															size="icon"
															className="size-7"
														>
															<RefreshCwIcon className="size-3.5" />
														</Button>
													</div>
												)}
											</Card>
										))}
									</div>
								</div>

								{/* OCR extraction preview */}
								<Card className="lg:col-span-1">
									<CardHeader className="px-5 py-4">
										<CardTitle className="text-sm">
											Last Extracted Data
										</CardTitle>
										<CardDescription className="text-xs">
											OCR output from the most recent scan
										</CardDescription>
									</CardHeader>
									<Separator />
									<CardContent className="px-5 py-4">
										{/* Simulated ID card thumbnail */}
										<div className="mb-4 flex aspect-[1.586/1] w-full items-center justify-center rounded-md border border-dashed bg-muted/30">
											<div className="flex flex-col items-center gap-1 text-muted-foreground/50">
												<FileTextIcon className="size-8" />
												<span className="text-xs">License thumbnail</span>
											</div>
										</div>

										<div className="flex flex-col gap-2">
											{extractedFields.map(({ label, value }) => (
												<div key={label} className="flex items-start justify-between gap-2">
													<span className="shrink-0 text-xs text-muted-foreground">
														{label}
													</span>
													<span className="text-right font-mono text-xs font-medium">
														{value}
													</span>
												</div>
											))}
										</div>

										<Separator className="my-4" />

										<div className="flex items-center justify-between">
											<span className="text-xs text-muted-foreground">
												OCR Confidence
											</span>
											<div className="flex items-center gap-2">
												<div className="h-1.5 w-20 overflow-hidden rounded-full bg-muted">
													<div
														className="h-full rounded-full bg-primary"
														style={{ width: "97%" }}
													/>
												</div>
												<span className="text-xs font-medium">97%</span>
											</div>
										</div>
									</CardContent>
								</Card>
							</div>
						</TabsContent>

						{/* Scan history tab */}
						<TabsContent value="scans" className="mt-4">
							<Card>
								<CardHeader className="px-6 py-4">
									<CardTitle className="text-base">OCR Scan History</CardTitle>
									<CardDescription>
										Driver&apos;s license records captured and extracted at all
										gate entry points
									</CardDescription>
								</CardHeader>
								<Separator />
								<CardContent className="p-0">
									<Table>
										<TableHeader>
											<TableRow>
												<TableHead>Scan ID</TableHead>
												<TableHead>License No.</TableHead>
												<TableHead>Name</TableHead>
												<TableHead>Expiry</TableHead>
												<TableHead>Gate</TableHead>
												<TableHead>Confidence</TableHead>
												<TableHead>Status</TableHead>
												<TableHead>Timestamp</TableHead>
											</TableRow>
										</TableHeader>
										<TableBody>
											{recentScans.map((scan) => (
												<TableRow key={scan.id}>
													<TableCell className="font-mono text-sm text-muted-foreground">
														{scan.id}
													</TableCell>
													<TableCell>
														<span className="rounded border bg-muted px-2 py-0.5 font-mono text-xs font-semibold tracking-wide">
															{scan.licenseNo}
														</span>
													</TableCell>
													<TableCell className="text-sm font-medium">
														{scan.name}
													</TableCell>
													<TableCell className="text-xs text-muted-foreground">
														{scan.expiry}
													</TableCell>
													<TableCell className="text-sm">
														{scan.gate}
													</TableCell>
													<TableCell>
														<div className="flex items-center gap-2">
															<div className="h-1.5 w-16 overflow-hidden rounded-full bg-muted">
																<div
																	className="h-full rounded-full bg-primary"
																	style={{ width: `${scan.confidence}%` }}
																/>
															</div>
															<span className="text-xs text-muted-foreground">
																{scan.confidence}%
															</span>
														</div>
													</TableCell>
													<TableCell>
														<StatusBadge status={scan.status} />
													</TableCell>
													<TableCell className="text-xs text-muted-foreground">
														{scan.timestamp}
													</TableCell>
												</TableRow>
											))}
										</TableBody>
									</Table>
								</CardContent>
							</Card>
						</TabsContent>
					</Tabs>
				</PageContent>
			</PageContainer>
		</>
	)
}
