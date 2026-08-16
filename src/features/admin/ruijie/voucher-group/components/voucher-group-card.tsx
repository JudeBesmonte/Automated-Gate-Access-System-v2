import Link from "next/link"
import { type VoucherGroup } from "@prisma/client"
import { CircleDollarSign, Hourglass, Wifi } from "lucide-react"
import { useTheme } from "next-themes"

import {
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from "@/core/components/ui/card"
import { MagicCard } from "@/core/components/ui/magic-card"
import { VoucherIcon } from "@/core/lib/icons"

interface VoucherGroupCardProps extends VoucherGroup {
	vouchersCount: number
}

export const VoucherGroupCard = (group: VoucherGroupCardProps) => {
	const { theme } = useTheme()
	return (
		<Link
			href={`/admin/ruijie/project/${group.projectId}/voucher-groups/${group.id}/vouchers`}
		>
			<MagicCard
				className="flex w-full flex-1 flex-col overflow-hidden rounded-md transition-shadow duration-150"
				gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
			>
				<CardHeader>
					<CardTitle>{group.name}</CardTitle>
					<CardDescription>Project: {group.id}</CardDescription>
				</CardHeader>
				<CardContent className="space-y-2">
					<div className="flex items-center gap-1 text-sm text-muted-foreground">
						<VoucherIcon className="size-3" />
						Vouchers: {group.vouchersCount}
					</div>
					<div className="flex items-center gap-1 text-sm text-muted-foreground">
						<CircleDollarSign className="size-3" />
						Price: {group.price}
					</div>
					<div className="flex items-center gap-1 text-sm text-muted-foreground">
						<Hourglass className="size-3" />
						Duration: {group.timePeriod}
					</div>
					<div className="flex items-center gap-1 text-sm text-muted-foreground">
						<Wifi className="size-3" />
						SSID Binding: {group.isBindSsid ? "Yes" : "No"}
					</div>
				</CardContent>
			</MagicCard>
		</Link>
	)
}
