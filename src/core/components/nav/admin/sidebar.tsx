import Link from "next/link"

import { NavLogo } from "@/core/components/nav/admin/sidebar-nav-logo"
import { NavUser } from "@/core/components/nav/admin/sidebar-nav-user"
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger
} from "@/core/components/ui/collapsible"
import {
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuAction,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
	SidebarRail,
	Sidebar as UISidebar
} from "@/core/components/ui/sidebar"
import { adminLinks } from "@/core/config/site-links"
import { ChevronRightIcon } from "@/core/lib/icons"

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

				<SidebarGroup>
					<SidebarGroupLabel>{adminLinks.services.label}</SidebarGroupLabel>
					<SidebarMenu>
						{adminLinks.services.routes.map((item) => (
							<Collapsible key={item.title} defaultOpen={item.isActive} asChild>
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton tooltip={item.title} asChild>
										<Link href={item.url}>
											<item.icon /> {item.title}
										</Link>
									</SidebarMenuButton>

									{item.items?.length ? (
										<>
											<CollapsibleTrigger asChild>
												<SidebarMenuAction className="size-6 -translate-y-0.5 data-[state=open]:rotate-90">
													<ChevronRightIcon />
													<span className="sr-only">Toggle</span>
												</SidebarMenuAction>
											</CollapsibleTrigger>
											<CollapsibleContent>
												<SidebarMenuSub>
													{item.items?.map((subItem) => (
														<SidebarMenuSubItem key={subItem.title}>
															<SidebarMenuSubButton asChild>
																<Link href={subItem.url}>{subItem.title}</Link>
															</SidebarMenuSubButton>
														</SidebarMenuSubItem>
													))}
												</SidebarMenuSub>
											</CollapsibleContent>
										</>
									) : null}
								</SidebarMenuItem>
							</Collapsible>
						))}
					</SidebarMenu>
				</SidebarGroup>

				<SidebarGroup>
					<SidebarGroupLabel>{adminLinks.customer.label}</SidebarGroupLabel>
					<SidebarMenu>
						{adminLinks.customer.routes.map((item) => (
							<Collapsible key={item.title} defaultOpen={item.isActive} asChild>
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton tooltip={item.title} asChild>
										<Link href={item.url}>
											<item.icon /> {item.title}
										</Link>
									</SidebarMenuButton>

									{item.items?.length ? (
										<>
											<CollapsibleTrigger asChild>
												<SidebarMenuAction className="size-6 -translate-y-0.5 data-[state=open]:rotate-90">
													<ChevronRightIcon />
													<span className="sr-only">Toggle</span>
												</SidebarMenuAction>
											</CollapsibleTrigger>
											<CollapsibleContent>
												<SidebarMenuSub>
													{item.items?.map((subItem) => (
														<SidebarMenuSubItem key={subItem.title}>
															<SidebarMenuSubButton asChild>
																<Link href={subItem.url}>{subItem.title}</Link>
															</SidebarMenuSubButton>
														</SidebarMenuSubItem>
													))}
												</SidebarMenuSub>
											</CollapsibleContent>
										</>
									) : null}
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
