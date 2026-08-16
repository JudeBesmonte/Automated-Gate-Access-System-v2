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
import { AccountIcon, SignOutIcon, UserIcon } from "@/core/lib/icons"

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
	const { data: session, isPending } = useAuthSession()
	const { mutate: signOut } = useSignOut()
	const handleSignOut = () => signOut()

	return (
		<DropdownMenu>
			<DropdownMenuTrigger className="flex shrink-0 items-center rounded-full outline-none ring-primary ring-offset-4 ring-offset-background/70 hover:bg-accent focus-visible:ring-0">
				{isPending ? (
					<NavUserSkeleton />
				) : (
					<UserAvatar user={session!.user} className="size-9 rounded-full" />
				)}
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-56">
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
	)
}
