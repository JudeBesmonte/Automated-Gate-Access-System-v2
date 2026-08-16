import Image from "next/image"
import Link from "next/link"

import { Button } from "@/core/components/ui/button"
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader
} from "@/core/components/ui/card"
import { LocationIcon, VoucherGroupIcon, VoucherIcon } from "@/core/lib/icons"
import { cn } from "@/core/lib/utils"

import { UploadImageModal } from "@/features/admin/ruijie/project/components/upload-image-modal"
import type { GetProjectResponse } from "@/features/admin/ruijie/project/server/types"

export const ProjectCard = ({ project }: { project: GetProjectResponse }) => {
	const PLACEHOLDER = "/assets/placeholder.svg"

	const imageUrl = project.image?.trim() || PLACEHOLDER
	const hasDescription = project.description.trim() === ""

	return (
		<Card className="flex w-full min-w-[260px] max-w-[285px] flex-1 flex-col overflow-hidden transition-shadow duration-150 hover:shadow-lg">
			<CardHeader className="relative p-0">
				<Image
					src={imageUrl}
					alt={project.name}
					className={cn(
						"h-32 w-full object-cover transition-all",
						imageUrl === PLACEHOLDER && "dark:brightness-[0.6]"
					)}
					height={256}
					width={256}
					priority
				/>
				<UploadImageModal projectId={project.id} />
			</CardHeader>

			<CardContent className="grid flex-grow gap-3 p-3">
				<div className="space-y-1">
					<h3 className="line-clamp-1 text-base font-semibold">
						{project.name}
					</h3>
					<p
						className={cn(
							"line-clamp-2 min-h-[2.5rem] text-sm leading-[1.25rem]",
							hasDescription && "italic text-muted-foreground"
						)}
					>
						{hasDescription ? "No description found" : project.description}{" "}
					</p>
				</div>

				<div className="space-y-1">
					<div className="flex items-center gap-1 text-sm text-muted-foreground">
						<LocationIcon className="size-3" />
						<span className="truncate">
							{project.timezone ? project.timezone : "No timezone found"}
						</span>
					</div>
					<div className="flex items-center gap-1 text-sm text-muted-foreground">
						<VoucherGroupIcon className="size-3" />
						{project.voucherGroupsCount}
					</div>
					<div className="flex items-center gap-1 text-sm text-muted-foreground">
						<VoucherIcon className="size-3" /> {project.vouchersCount}
					</div>
				</div>
			</CardContent>

			<CardFooter className="flex items-center justify-between gap-2 p-3 pt-0">
				<Button size="sm" className="w-full text-sm" asChild>
					<Link href={`/admin/ruijie/project/${project.id}/voucher-groups`}>
						View Project
					</Link>
				</Button>
			</CardFooter>
		</Card>
	)
}
