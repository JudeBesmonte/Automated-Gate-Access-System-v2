import Image from "next/image"
import Link from "next/link"

import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem
} from "@/core/components/ui/sidebar"

type NavLogoProps = {
	title: string
	subtitle: string
}

export const NavLogo = ({ title, subtitle }: NavLogoProps) => {
	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<SidebarMenuButton size="lg" asChild>
					<Link href={"/"}>
						<div className="flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground">
							<Image
								className="size-8 rounded-lg"
								src="/assets/branding/qbyfi-logo.png"
								alt="QBYFI logo"
								width={32}
								height={32}
								priority
							/>
						</div>
						<div className="flex flex-col gap-0.5 leading-none">
							<span className="truncate font-semibold">{title}</span>
							<span className="truncate text-xs">{subtitle}</span>
						</div>
					</Link>
				</SidebarMenuButton>
			</SidebarMenuItem>
		</SidebarMenu>
	)
}
