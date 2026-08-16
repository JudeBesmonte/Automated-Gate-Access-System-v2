"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"
import { useSession } from "next-auth/react"

import { NavLogo } from "@/core/components/nav/client/nav-logo"
import { Badge } from "@/core/components/ui/badge"
import { Button, buttonVariants } from "@/core/components/ui/button"
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger
} from "@/core/components/ui/drawer"
import { MenuIcon } from "@/core/lib/icons"
import { cn } from "@/core/lib/utils"

export function NavMobile({
	links
}: {
	links: { href: string; label: string }[]
}) {
	const { data: session } = useSession()

	return (
		<nav className="container flex items-center justify-between px-4 md:hidden">
			<NavLogo />

			<Drawer>
				<DrawerTrigger
					className={cn(buttonVariants({ variant: "ghost", size: "icon" }))}
				>
					<MenuIcon className="!size-5" />
				</DrawerTrigger>
				<DrawerContent>
					<DrawerHeader>
						<DrawerTitle className="sr-only">Navigation Menu</DrawerTitle>
						<DrawerDescription className="sr-only">
							Use the side menu to navigate through the app.
						</DrawerDescription>
						<div className="flex items-end gap-2 rounded-lg outline-none ring-primary ring-offset-0 ring-offset-background/70 focus-visible:ring-1">
							<Image
								className="size-10"
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
						</div>
					</DrawerHeader>

					<ul className="space-y-2 px-6 pb-6 pt-4">
						{links.map((link) => (
							<li key={link.label}>
								<Link href={link.href} className="font-bold tracking-wider">
									{link.label}
								</Link>
							</li>
						))}
					</ul>

					<DrawerFooter>
						{session ? (
							<Link
								href={`/${session.user.role.toLowerCase()}`}
								className={cn(
									buttonVariants({ variant: "gradient" }),
									"w-full rounded-lg"
								)}
								aria-label="Navigate to dashboard"
							>
								Go to Dashboard
							</Link>
						) : (
							<>
								<Button variant={"outline"} asChild>
									<Link href="/sign-in">Login</Link>
								</Button>
								<Button asChild>
									<Link href="/sign-up">
										Get started
										<ArrowRightIcon />
									</Link>
								</Button>
							</>
						)}
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		</nav>
	)
}
