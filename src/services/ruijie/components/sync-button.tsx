"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

import {
	useSyncProjects,
	useSyncProjectsWithVoucherGroups,
	useSyncProjectsWithVoucherGroupsAndVouchers
} from "@/services/ruijie/lib/hooks"

import { Button } from "@/core/components/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuTrigger
} from "@/core/components/ui/dropdown-menu"
import { CircleIcon, LoadingIcon, SyncIcon } from "@/core/lib/icons"

const options = [
	{
		label: "Sync All",
		description:
			"Full sync of all data. Extremely slow option. At least 10 mins.",
		textColor: "text-red-500",
		decorationColor: "decoration-red-500"
	},
	{
		label: "Projects & Voucher Groups",
		description: "Syncs projects and voucher groups. Moderate speed.",
		textColor: "text-yellow-500",
		decorationColor: "decoration-yellow-500"
	},
	{
		label: "Projects Only",
		description: "Fastest option. Updates projects only.",
		textColor: "text-green-500",
		decorationColor: "decoration-green-500"
	}
]

export const SyncButton = () => {
	const [selectedIndex, setSelectedIndex] = useState("0")

	const { mutate: syncAll, isPending: isSyncingAllPending } =
		useSyncProjectsWithVoucherGroupsAndVouchers()
	const {
		mutate: syncProjectsWithVoucherGroups,
		isPending: isSyncingProjectsWithVoucherGroups
	} = useSyncProjectsWithVoucherGroups()
	const { mutate: syncProjects, isPending: isSyncingProjects } =
		useSyncProjects()

	const isSyncing =
		isSyncingAllPending ||
		isSyncingProjects ||
		isSyncingProjectsWithVoucherGroups

	const handleSync = () => {
		switch (selectedIndex) {
			case "0":
				syncAll()
				break
			case "1":
				syncProjectsWithVoucherGroups()
				break
			case "2":
				syncProjects()
				break
		}
	}

	return (
		<div className="inline-flex -space-x-px divide-x divide-primary-foreground/30 rounded-lg shadow-sm shadow-black/5 rtl:space-x-reverse">
			<Button
				className="rounded-none shadow-none first:rounded-s-lg last:rounded-e-lg focus-visible:z-10"
				size={"sm"}
				onClick={handleSync}
				disabled={isSyncing}
			>
				{isSyncing ? <LoadingIcon className="animate-spin" /> : <SyncIcon />}
				{options[Number(selectedIndex)]?.label}
			</Button>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						className="rounded-none px-1.5 shadow-none first:rounded-s-lg last:rounded-e-lg focus-visible:z-10"
						size="sm"
						disabled={isSyncing}
					>
						<ChevronDown size={16} strokeWidth={2} aria-hidden="true" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent
					className="max-w-64 md:max-w-xs"
					side="bottom"
					sideOffset={4}
					align="end"
				>
					<DropdownMenuRadioGroup
						value={selectedIndex}
						onValueChange={setSelectedIndex}
					>
						{options.map((option, index) => (
							<DropdownMenuRadioItem
								key={option.label}
								value={String(index)}
								className="group/sync-option items-start [&>span.absolute]:hidden [&>span]:pt-1.5"
							>
								<div className="relative flex flex-col gap-1">
									{selectedIndex === String(index) && (
										<span className="absolute -left-5 top-[5px]">
											<CircleIcon className={`${option.textColor} size-3`} />
										</span>
									)}
									<span
										className={`flex items-center gap-1 text-sm font-medium decoration-1 group-hover/sync-option:underline ${option.decorationColor}`}
									>
										{option.label}
									</span>
									<span className="text-xs text-muted-foreground">
										{option.description}
									</span>
								</div>
							</DropdownMenuRadioItem>
						))}
					</DropdownMenuRadioGroup>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	)
}
