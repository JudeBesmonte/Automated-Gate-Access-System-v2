import Link from "next/link"

import { buttonVariants } from "@/core/components/ui/button"
import { ChevronLeftIcon } from "@/core/lib/icons"
import { cn } from "@/core/lib/utils"

export function FloatingBackButton() {
	return (
		<Link
			href={"/"}
			className={cn(
				buttonVariants({ variant: "ghost" }),
				"fixed left-2 top-5 z-[999] px-3 text-primary-hovered hover:text-primary md:left-6"
			)}
		>
			<ChevronLeftIcon />
			Home
		</Link>
	)
}
