"use client"

import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"
import { type Session } from "next-auth"
import { useSession } from "next-auth/react"

import { NavLogo } from "@/core/components/nav/client/nav-logo"
import { buttonVariants } from "@/core/components/ui/button"
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	navigationMenuTriggerStyle
} from "@/core/components/ui/navigation-menu"
import { cn } from "@/core/lib/utils"

type NavLink = {
	href: string
	label: string
}

export function NavDesktop({ links }: { links: NavLink[] }) {
	const { data: session } = useSession()

	return (
		<nav
			className={cn(
				"container hidden items-center justify-between px-8 md:flex"
			)}
		>
			<NavLogo />
			<NavLinks links={links} />
			<NavActions session={session} />
		</nav>
	)
}

const NavLinks = ({ links }: { links: NavLink[] }) => (
	<NavigationMenu>
		<NavigationMenuList>
			{links.map((link) => (
				<NavigationMenuItem key={link.label}>
					<NavigationMenuLink
						href={link.href}
						className={navigationMenuTriggerStyle()}
					>
						{link.label}
					</NavigationMenuLink>
				</NavigationMenuItem>
			))}
		</NavigationMenuList>
	</NavigationMenu>
)

const NavActions = ({ session }: { session: Session | null | undefined }) => {
	if (session) {
		return (
			<Link
				href={`/${session.user.role.toLowerCase()}`}
				className={cn(
					buttonVariants({ variant: "gradient" }),
					"rounded-lg px-3 text-xs"
				)}
				aria-label="Navigate to dashboard"
			>
				Go to Dashboard
				<ArrowRightIcon />
			</Link>
		)
	}

	return (
		<div className="flex items-center gap-2">
			<Link
				href="/sign-in"
				className={cn(
					buttonVariants({ variant: "ghost" }),
					"rounded-lg bg-transparent"
				)}
				aria-label="Sign in to your account"
			>
				Sign In
			</Link>
			<Link
				href="/sign-up"
				className={cn(buttonVariants({ variant: "gradient" }), "rounded-lg")}
				aria-label="Create a new account"
			>
				Get started
				<ArrowRightIcon />
			</Link>
		</div>
	)
}
