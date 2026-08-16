import { NavDesktop } from "@/core/components/nav/client/nav-desktop"
import { NavMobile } from "@/core/components/nav/client/nav-mobile"
import { ScrollAwareBorder } from "@/core/components/nav/client/scroll-aware-border"
import { cn } from "@/core/lib/utils"

const links = [
	{ href: "/", label: "Home" },
	{ href: "#pricing", label: "Pricing" }
]

export const Navbar = async () => {
	return (
		<header className={cn("sticky top-0 z-50 flex h-14 justify-center")}>
			<NavDesktop links={links} />
			<NavMobile links={links} />
			<ScrollAwareBorder />
		</header>
	)
}
