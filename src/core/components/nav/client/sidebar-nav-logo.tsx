import Image from "next/image"
import Link from "next/link"

import { Badge } from "@/core/components/ui/badge"
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem
} from "@/core/components/ui/sidebar"

export const NavLogo = () => {
	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<SidebarMenuButton size="lg" asChild>
					<Link href={"/"}>
						<div className="-mt-1.5 flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground">
							<Image
								className="size-8 rounded-lg"
								src="/assets/branding/qbyfi-logo.png"
								alt="QBYFI logo"
								width={32}
								height={32}
								priority
							/>
						</div>
						<div className="flex items-center gap-2 leading-none text-foreground/90">
							<span className="truncate font-bold tracking-wider">QBYFI</span>
							<Badge variant={"secondary"} className="text-xs">
								Portal
							</Badge>
						</div>
					</Link>
				</SidebarMenuButton>
			</SidebarMenuItem>
		</SidebarMenu>
	)
}
