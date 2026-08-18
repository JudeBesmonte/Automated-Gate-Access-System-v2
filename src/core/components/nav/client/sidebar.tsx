"use client"

import Link from "next/link"

import { NavLogo } from "@/core/components/nav/client/sidebar-nav-logo"
import { NavUser } from "@/core/components/nav/client/sidebar-nav-user"
import { SearchForm } from "@/core/components/nav/client/sidebar-search"
import {
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarRail,
	Sidebar as UISidebar
} from "@/core/components/ui/sidebar"
import {
	FeedbackIcon,
	SupportIcon as HelpIcon,
	HomeIcon
} from "@/core/lib/icons"

const platform = [
	{
		title: "Dashboard",
		url: "/client",
		icon: HomeIcon
	}
]

const support = [
	{
		title: "Help",
		url: "#",
		icon: HelpIcon
	},
	{
		title: "Report Issue",
		url: "/client/report-issue",
		icon: FeedbackIcon
	}
]

export const Sidebar = ({
	...props
}: React.ComponentProps<typeof UISidebar>) => {
	return (
		<UISidebar {...props}>
			<SidebarHeader>
				<NavLogo />
				<SearchForm />
			</SidebarHeader>

			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Platform</SidebarGroupLabel>
					<SidebarMenu>
						{platform.map((item) => (
							<SidebarMenuItem key={item.title}>
								<SidebarMenuButton tooltip={item.title} asChild>
									<Link href={item.url}>
										<item.icon />
										<span>{item.title}</span>
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
						))}
					</SidebarMenu>
				</SidebarGroup>

				<SidebarGroup className="mt-auto">
					<SidebarGroupContent>
						<SidebarMenu>
							{support.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton tooltip={item.title} asChild>
										<Link href={item.url}>
											<item.icon />
											<span>{item.title}</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>

			<SidebarFooter>
				<NavUser />
			</SidebarFooter>

			<SidebarRail />
		</UISidebar>
	)
}
