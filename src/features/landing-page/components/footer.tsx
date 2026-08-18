import Link from "next/link"
import { FaFacebookF, FaYoutube } from "react-icons/fa"

import { AnimationContainer } from "@/core/components/animation-container"
import { NavLogo } from "@/core/components/nav/client/nav-logo"
import { buttonVariants } from "@/core/components/ui/button"
import { cn } from "@/core/lib/utils"

const links = {
	site: [
		{
			label: "Product",
			delay: 0.15,
			links: [
				{
					label: "Home",
					href: "/"
				}
			]
		},
		{
			label: "Integrations",
			delay: 0.3,
			links: [
				{
					label: "Facebook",
					href: "https://www.facebook.com/quanbysolutionsinc"
				},
				{
					label: "YouTube",
					href: "https://www.youtube.com/@QuanbySolutions"
				}
			]
		},
		{
			label: "Portals",
			delay: 0.45,
			links: [
				{
					label: "LMS",
					href: "https://quanbyit.com/lms-portal/"
				}
			]
		},
		{
			label: "Company",
			delay: 0.6,
			links: [
				{
					label: "About Us",
					href: "https://quanbyit.com/about-us"
				},
				{
					label: "Mission and Vision",
					href: "https://quanbyit.com/mission-vision"
				},
				{
					label: "Data Policy",
					href: "https://quanbyit.com/data-privacy"
				}
			]
		}
	],
	social: [
		{
			label: "Facebook",
			href: "https://www.facebook.com/quanbysolutionsinc",
			icon: FaFacebookF
		},
		{
			label: "YouTube",
			href: "https://www.youtube.com/@QuanbySolutions",
			icon: FaYoutube
		}
	]
}

export const Footer = () => {
	return (
		<footer className="relative flex w-full flex-col items-center justify-center overflow-x-clip">
			<div className="absolute -right-[8%] -top-1/3 h-72 w-72 rounded-full bg-primary/50 opacity-40 blur-[50rem] dark:bg-primary" />
			<div className="absolute -left-[8%] bottom-0 h-72 w-72 rounded-full bg-primary/50 opacity-40 blur-[50rem] dark:bg-primary" />

			<div className="mx-auto max-w-6xl border-t border-border px-6 pb-8 pt-16 lg:px-8">
				<div className="grid w-full gap-8 lg:grid-cols-3 lg:gap-8">
					<AnimationContainer>
						<div className="flex flex-col items-start justify-start md:max-w-[200px]">
							<NavLogo />
							<p className="mt-4 text-start text-sm text-muted-foreground">
								Driving Innovation for a Smarter Future
							</p>
						</div>
					</AnimationContainer>

					<div className="mt-8 grid grid-cols-2 gap-8 lg:col-span-2 lg:mt-0">
						<div className="md:grid md:grid-cols-2 md:gap-8">
							{links.site.slice(0, 2).map((item) => (
								<AnimationContainer key={item.label} delay={item.delay}>
									<h3 className="text-base font-medium text-primary">
										{item.label}
									</h3>
									<ul className="mt-4 text-sm text-muted-foreground">
										{item.links.map((i) => (
											<li key={i.label} className="mt-2">
												<Link
													href={i.href}
													className="outline-none ring-primary ring-offset-0 ring-offset-background/70 transition-all duration-300 hover:text-foreground focus-visible:ring-1"
												>
													{i.label}
												</Link>
											</li>
										))}
									</ul>
								</AnimationContainer>
							))}
						</div>

						<div className="md:grid md:grid-cols-2 md:gap-8">
							{links.site.slice(2, 4).map((item) => (
								<AnimationContainer key={item.label} delay={item.delay}>
									<h3 className="text-base font-medium text-primary">
										{item.label}
									</h3>
									<ul className="mt-4 text-sm text-muted-foreground">
										{item.links.map((i) => (
											<li key={i.label} className="mt-2">
												<Link
													href={i.href}
													className="outline-none ring-primary ring-offset-0 ring-offset-background/70 transition-all duration-300 hover:text-foreground focus-visible:ring-1"
												>
													{i.label}
												</Link>
											</li>
										))}
									</ul>
								</AnimationContainer>
							))}
						</div>
					</div>
				</div>

				<AnimationContainer delay={0.75} className="w-full">
					<div className="mt-16 w-full border-t border-border/40 pt-4 md:flex md:items-center md:justify-between md:pt-8">
						<p className="mt-8 text-sm text-muted-foreground md:mt-0">
							Copyright &copy; 2025. Quanby Solutions Inc.
						</p>
						<div className="mt-4 flex items-center gap-4 lg:mt-0">
							{links.social.map((item) => (
								<Link
									key={item.label}
									href={item.href}
									className={cn(
										buttonVariants({ variant: "outline", size: "icon" }),
										"rounded-full"
									)}
								>
									<item.icon />
								</Link>
							))}
						</div>
					</div>
				</AnimationContainer>
			</div>
		</footer>
	)
}
