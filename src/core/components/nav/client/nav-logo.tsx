import Image from "next/image"
import Link from "next/link"

import { Badge } from "@/core/components/ui/badge"

export function NavLogo() {
	return (
		<Link
			href="/"
			className="flex items-center gap-2 rounded-lg outline-none ring-primary ring-offset-0 ring-offset-background/70 focus-visible:ring-1"
		>
			<Image
				className="-mt-1.5 size-8"
				src="/assets/branding/qbyfi-logo.png"
				alt="QBYFI logo"
				width={100}
				height={100}
			/>

			<div className="flex items-center gap-2 leading-none text-foreground/90">
				<span className="truncate font-bold tracking-wider">QBYFI</span>
				<Badge variant={"secondary"} className="text-xs">
					Portal
				</Badge>
			</div>
		</Link>
	)
}
