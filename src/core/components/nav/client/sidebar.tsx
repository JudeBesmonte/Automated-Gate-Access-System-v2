"use client"

import Link from "next/link"
import { FileTextIcon } from "lucide-react"
import { useSession } from "next-auth/react"

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
import { useClientSubscriptions } from "@/core/hooks/use-client-subscriptions"
import {
	FeedbackIcon,
	SupportIcon as HelpIcon,
	HomeIcon,
	ReportIcon
} from "@/core/lib/icons"

const platform = [
	{
		title: "Dashboard",
		url: "/client",
		icon: HomeIcon
	},
	{
		title: "Subscriptions",
		url: "/client/subscriptions",
		icon: ReportIcon
	},
	{
		title: "Invoice",
		url: "/client/invoices",
		icon: FileTextIcon
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
	const { data: session } = useSession()
	const { data: subscriptions } = useClientSubscriptions(session?.user?.id)

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

				<SidebarGroup>
					<SidebarGroupLabel>My Subscriptions</SidebarGroupLabel>
					<SidebarMenu>
						{subscriptions && subscriptions.length > 0 ? (
							subscriptions.map((sub) => {
								const currentPlan = sub.plan
								if (!currentPlan) return null
								return (
									<SidebarMenuItem key={sub.id}>
										<SidebarMenuButton tooltip={currentPlan.name} asChild>
											<Link href={`/client/plan/${currentPlan.slug}`}>
												<FileTextIcon />
												<span>{currentPlan.name}</span>
											</Link>
										</SidebarMenuButton>
									</SidebarMenuItem>
								)
							})
						) : (
							<SidebarMenuItem>
								<SidebarMenuButton tooltip="No Active Plans">
									<FileTextIcon className="text-muted-foreground" />
									<span className="text-muted-foreground">No Active Plans</span>
								</SidebarMenuButton>
							</SidebarMenuItem>
						)}
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
