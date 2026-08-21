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
	CircleDotIcon,
	ClockIcon,
	RefreshCwIcon,
	ScanIcon,
	ShieldCheckIcon,
	TriangleAlertIcon
} from "lucide-react"

const recentScans = [
	{
		id: "SCN-001",
		plate: "ABC 1234",
		timestamp: "2026-08-22 08:42:11",
		gate: "Gate 1 — Entry",
		status: "Authorized",
		confidence: 98
	},
	{
		id: "SCN-002",
		plate: "XYZ 5678",
		timestamp: "2026-08-22 08:39:05",
		gate: "Gate 2 — Exit",
		status: "Authorized",
		confidence: 95
	},
	{
		id: "SCN-003",
		plate: "DEF 9012",
		timestamp: "2026-08-22 08:31:47",
		gate: "Gate 1 — Entry",
		status: "Unauthorized",
		confidence: 91
	},
	{
		id: "SCN-004",
		plate: "GHI 3456",
		timestamp: "2026-08-22 08:28:33",
		gate: "Gate 3 — Entry",
		status: "Authorized",
		confidence: 97
	},
	{
		id: "SCN-005",
		plate: "JKL 7890",
		timestamp: "2026-08-22 08:15:20",
		gate: "Gate 2 — Entry",
		status: "Unknown",
		confidence: 74
	}
]

const cameras = [
	{ id: "CAM-01", label: "Gate 1 — Entry", status: "Online" },
	{ id: "CAM-02", label: "Gate 1 — Exit", status: "Online" },
	{ id: "CAM-03", label: "Gate 2 — Entry", status: "Online" },
	{ id: "CAM-04", label: "Gate 3 — Entry", status: "Offline" }
]

const statsCards = [
	{
		title: "Total Scans Today",
		value: "128",
		sub: "+12 in the last hour",
		icon: ScanIcon
	},
	{
		title: "Authorized",
		value: "114",
		sub: "89% of all scans",
		icon: ShieldCheckIcon
	},
	{
		title: "Unauthorized",
		value: "9",
		sub: "7% of all scans",
		icon: TriangleAlertIcon
	},
	{
		title: "Avg. Confidence",
		value: "94%",
		sub: "Detection accuracy",
		icon: CircleDotIcon
	}
]

function StatusBadge({ status }: { status: string }) {
	const variant =
		status === "Authorized"
			? "default"
			: status === "Unauthorized"
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
		{ label: "License Plate" }
	]

	return (
		<>
			<PageBreadcrumb items={breadcrumbItems} />

			<PageContainer>
				<PageHeader>
					<PageHeaderTitle>License Plate Recognition</PageHeaderTitle>
					<PageHeaderDescription>
						Live camera feeds and automated license plate scanning across all
						gate access points
					</PageHeaderDescription>
				</PageHeader>

				<PageContent className="flex flex-col gap-6">
					{/* Stats row */}
					<div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
						{statsCards.map(({ title, value, sub, icon: Icon }) => (
							<Card key={title} className="bg-gradient-to-t from-primary/5 to-card shadow-xs">
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
								Live Feeds
							</TabsTrigger>
							<TabsTrigger value="scans">
								<ClockIcon className="mr-2 size-4" />
								Recent Scans
							</TabsTrigger>
						</TabsList>

						{/* Live feeds tab */}
						<TabsContent value="live" className="mt-4">
							<div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
								{cameras.map((cam) => (
									<Card key={cam.id} className="overflow-hidden">
										<CardHeader className="flex flex-row items-center justify-between px-4 py-3">
											<div className="flex flex-col gap-0.5">
												<CardTitle className="text-sm">{cam.label}</CardTitle>
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
												<div className="relative flex aspect-video w-full flex-col items-center justify-center gap-3 bg-muted/40">
													{/* Simulated camera viewport */}
													<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(var(--muted))_0%,_hsl(var(--background))_100%)] opacity-60" />
													<CameraIcon className="relative size-10 text-muted-foreground/40" />
													<span className="relative text-xs text-muted-foreground">
														Live feed placeholder
													</span>
													{/* Scan line decoration */}
													<div className="absolute left-4 right-4 top-1/2 h-px bg-primary/30" />
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
												<span className="font-mono text-xs text-muted-foreground">
													Last detected: ABC 1234
												</span>
												<Button variant="ghost" size="icon" className="size-7">
													<RefreshCwIcon className="size-3.5" />
												</Button>
											</div>
										)}
									</Card>
								))}
							</div>
						</TabsContent>

						{/* Recent scans tab */}
						<TabsContent value="scans" className="mt-4">
							<Card>
								<CardHeader className="px-6 py-4">
									<CardTitle className="text-base">Recent Scan Log</CardTitle>
									<CardDescription>
										Latest license plate detections across all gates
									</CardDescription>
								</CardHeader>
								<Separator />
								<CardContent className="p-0">
									<Table>
										<TableHeader>
											<TableRow>
												<TableHead>Scan ID</TableHead>
												<TableHead>Plate Number</TableHead>
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
														<span className="rounded border bg-muted px-2 py-0.5 font-mono text-sm font-semibold tracking-widest">
															{scan.plate}
														</span>
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
