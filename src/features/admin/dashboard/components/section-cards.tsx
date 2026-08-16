"use client"

import { Loader2Icon, TrendingUpIcon } from "lucide-react"

import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from "@/core/components/ui/card"

import { useDashboardStats } from "@/features/admin/dashboard/lib/hooks"

export function SectionCards() {
	const { data, isLoading } = useDashboardStats()

	const totalProjects = data?.totalProjects ?? 0
	const totalVouchers = data?.totalVouchers ?? 0
	const totalClients = data?.totalClients ?? 0

	return (
		<div className="*:data-[slot=card]:shadow-xs xs:grid-cols-1 grid w-full gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card sm:grid-cols-2 lg:grid-cols-4">
			<Card className="@container/card w-full">
				<CardHeader className="relative">
					<CardDescription>Total Revenue</CardDescription>
					<CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
						₱1,250.00
					</CardTitle>
				</CardHeader>
				<CardFooter className="flex-col items-start gap-1 text-sm">
					<div className="line-clamp-1 flex gap-2 font-medium">
						Trending up this month <TrendingUpIcon className="size-4" />
					</div>
					<div className="text-muted-foreground">
						Visitors for the last 6 months
					</div>
				</CardFooter>
			</Card>
			<Card className="@container/card object-fill">
				<CardHeader className="relative">
					<CardDescription>Total Projects</CardDescription>
					<CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
						{isLoading ? (
							<Loader2Icon className="size-6 animate-spin" />
						) : (
							totalProjects
						)}
					</CardTitle>
				</CardHeader>
				<CardFooter className="flex-col items-start gap-1 text-sm">
					<div className="line-clamp-1 flex gap-2 font-medium">
						Active Projects <TrendingUpIcon className="size-4" />
					</div>
					<div className="text-muted-foreground">Current project count</div>
				</CardFooter>
			</Card>
			<Card className="@container/card object-fill">
				<CardHeader className="relative">
					<CardDescription>Total Vouchers</CardDescription>
					<CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
						{isLoading ? (
							<Loader2Icon className="size-6 animate-spin" />
						) : (
							totalVouchers
						)}
					</CardTitle>
				</CardHeader>
				<CardFooter className="flex-col items-start gap-1 text-sm">
					<div className="line-clamp-1 flex gap-2 font-medium">
						All vouchers <TrendingUpIcon className="size-4" />
					</div>
					<div className="text-muted-foreground">Total vouchers issued</div>
				</CardFooter>
			</Card>
			<Card className="@container/card object-fill">
				<CardHeader className="relative">
					<CardDescription>Total Clients</CardDescription>
					<CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
						{isLoading ? (
							<Loader2Icon className="size-6 animate-spin" />
						) : (
							totalClients
						)}
					</CardTitle>
				</CardHeader>
				<CardFooter className="flex-col items-start gap-1 text-sm">
					<div className="line-clamp-1 flex gap-2 font-medium">
						Active clients <TrendingUpIcon className="size-4" />
					</div>
					<div className="text-muted-foreground">Total registered clients</div>
				</CardFooter>
			</Card>
		</div>
	)
}
