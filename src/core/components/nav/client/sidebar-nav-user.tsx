"use client"

import Link from "next/link"

import { DropdownThemeSelector } from "@/core/components/nav/dropdown-theme-selector"
import { UserAvatar } from "@/core/components/nav/user-avatar"
import { NavUserSkeleton } from "@/core/components/skeleton/nav-user-skeleton"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from "@/core/components/ui/dropdown-menu"
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar
} from "@/core/components/ui/sidebar"
import {
	AccountIcon,
	ChevronsUpDownIcon,
	SignOutIcon,
	UserIcon
} from "@/core/lib/icons"

import { useAuthSession, useSignOut } from "@/features/auth/lib/hooks"

const Links = [
	{
		title: "Profile",
		url: "/client/profile",
		icon: <UserIcon />
	},
	{
		title: "Account",
		url: "/client/account",
		icon: <AccountIcon />
	}
]

export const NavUser = () => {
	const { isMobile } = useSidebar()
	const { data: session, isPending } = useAuthSession()
	const { mutate: signOut } = useSignOut()
	const handleSignOut = () => signOut()

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							size="lg"
							className="group/user-button data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
						>
							{isPending ? (
								<NavUserSkeleton />
							) : (
								<>
									<UserAvatar user={session!.user} withDetails />
									<ChevronsUpDownIcon className="ml-auto size-4 opacity-50 transition-opacity group-hover/user-button:opacity-100 group-focus/user-button:opacity-100" />
								</>
							)}
						</SidebarMenuButton>
					</DropdownMenuTrigger>

					<DropdownMenuContent
						className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
						side={isMobile ? "bottom" : "right"}
						align="end"
						sideOffset={4}
					>
						<DropdownMenuLabel className="flex items-center gap-2 p-0 px-1 py-1.5 text-left text-sm font-normal">
							{isPending ? (
								<NavUserSkeleton />
							) : (
								<UserAvatar user={session!.user} withDetails />
							)}
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							{Links.map((link) => (
								<Link href={link.url} key={link.title}>
									<DropdownMenuItem>
										{link.icon}
										{link.title}
									</DropdownMenuItem>
								</Link>
							))}
							<DropdownThemeSelector />
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuItem onClick={handleSignOut}>
							<SignOutIcon />
							Sign out
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	)
}
