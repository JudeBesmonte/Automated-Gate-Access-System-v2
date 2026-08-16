"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { buttonVariants } from "@/core/components/ui/button"
import { Input } from "@/core/components/ui/input"
import { SearchIcon } from "@/core/lib/icons"
import { cn } from "@/core/lib/utils"

const Links = [
	{
		title: "Dashboard",
		url: "/client"
	},
	{
		title: "Billing",
		url: "/client/billing-history"
	},
	{
		title: "Payment",
		url: "/client/payment"
	}
]

export function Sidebar() {
	const pathname = usePathname()
	return (
		<aside className="w-full shrink-0 md:w-52">
			<div className="mb-6">
				<div className="relative">
					<SearchIcon className="absolute left-4 top-1/2 h-3.5 w-3.5 -translate-y-1/2 transform text-muted-foreground" />
					<Input type="search" placeholder="Search..." className="pl-10" />
				</div>
			</div>

			<nav className="space-y-1">
				{Links.map((link) => {
					const isActive = pathname === link.url
					return (
						<Link
							key={link.title}
							href={link.url}
							className={cn(
								buttonVariants({ variant: "ghost" }),
								"block",
								isActive && "bg-accent"
							)}
						>
							{link.title}
						</Link>
					)
				})}
			</nav>
		</aside>
	)
}
