import Link from "next/link"

import { NavLogo } from "@/core/components/nav/admin/sidebar-nav-logo"
import { NavUser } from "@/core/components/nav/admin/sidebar-nav-user"
import { Collapsible } from "@/core/components/ui/collapsible"
import {
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarRail,
	Sidebar as UISidebar
} from "@/core/components/ui/sidebar"
import { adminLinks } from "@/core/config/site-links"

export const Sidebar = async ({
	...props
}: React.ComponentProps<typeof UISidebar>) => {
	return (
		<UISidebar {...props}>
			<SidebarHeader>
				<NavLogo title="QBYFI" subtitle="Management System" />
			</SidebarHeader>

			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>{adminLinks.overview.label}</SidebarGroupLabel>
					<SidebarMenu>
						{adminLinks.overview.routes.map((item) => (
							<Collapsible key={item.title} defaultOpen={true} asChild>
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton tooltip={item.title} asChild>
										<Link href={item.url}>
											<item.icon /> {item.title}
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							</Collapsible>
						))}
					</SidebarMenu>
				</SidebarGroup>

			</SidebarContent>

			<SidebarFooter>
				<NavUser />
			</SidebarFooter>

			<SidebarRail />
		</UISidebar>
	)
}
