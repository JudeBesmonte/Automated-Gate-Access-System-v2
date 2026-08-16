"use client"

import Image from "next/image"
// import { type MaintenanceStatus } from "@prisma/client"
import { MoreVertical } from "lucide-react"

import { Button } from "@/core/components/ui/button"
import { Card, CardContent } from "@/core/components/ui/card"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger
} from "@/core/components/ui/dropdown-menu"

// import { Tag } from "@/core/components/ui/tag"

import { DeleteKioskButton } from "@/features/kiosk/components/action/delete-kiosk-button"
import { EditKioskButton } from "@/features/kiosk/components/action/edit-kiosk-button"

// const STATUS_COLORS = {
// 	ACTIVE: { variant: "success" },
// 	INACTIVE: { variant: "destructive" },
// 	FOR_MAINTENANCE: { variant: "warning" }
// } as const satisfies Record<MaintenanceStatus, { variant: string }>

type KioskDetails = {
	id: string
	name: string
	location: string
	// status: MaintenanceStatus
	ootd: string | null
}

export const KioskCard = ({ kiosk }: { kiosk: KioskDetails }) => {
	return (
		<Card className="overflow-hidden">
			<CardContent className="p-6">
				<div className="flex items-start gap-6">
					<div className="shrink-0">
						<Image
							src="/assets/images/images-02.jpg"
							alt={`${kiosk.name} thumbnail`}
							width={100}
							height={160}
							className="rounded-lg"
						/>
					</div>

					<div className="flex-1 space-y-1">
						<div className="flex items-center justify-between">
							<h2 className="w-1/3 font-semibold">{kiosk.name}</h2>
							<div className="flex w-1/3 items-center justify-center">
								{/* <Tag variant={STATUS_COLORS[kiosk.status].variant}>
									{kiosk.status}
								</Tag> */}
							</div>
							<div className="flex w-1/3 items-center justify-end">
								<span className="text-sm text-muted-foreground">
									OOTD: {kiosk.ootd ?? "No OOTD assigned"}
								</span>
							</div>
						</div>
						<p className="text-sm text-blue-500">{kiosk.location}</p>
					</div>

					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" size="icon" className="h-8 w-8">
								<MoreVertical className="h-4 w-4" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<EditKioskButton kioskId={kiosk.id} />
							<DeleteKioskButton kioskId={kiosk.id} />
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</CardContent>
		</Card>
	)
}
