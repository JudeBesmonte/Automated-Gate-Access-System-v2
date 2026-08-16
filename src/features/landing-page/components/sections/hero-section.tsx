"use client"

import Link from "next/link"
import { CreditCard, History } from "lucide-react"

import { AnimationContainer } from "@/core/components/animation-container"
import { Badge } from "@/core/components/ui/badge"
import { buttonVariants } from "@/core/components/ui/button"
import { GradientText } from "@/core/components/ui/gradient-text"

export const HeroSection = () => {
	return (
		<section
			id="home"
			className="relative flex w-full flex-col items-center justify-center p-14 py-20"
		>
			<div className="absolute -top-16 left-0 -z-10 flex h-72 w-72 rounded-full bg-primary blur-[10rem] sm:hidden" />

			<div className="flex max-w-3xl flex-col items-center justify-center gap-y-8">
				<div className="flex flex-col items-center justify-center gap-y-4">
					<AnimationContainer className="relative" delay={0.2}>
						<Badge
							size="xs"
							variant="subtle"
							className="cursor-pointer px-3 md:hidden"
						>
							<span className="mr-2 flex h-[18px] items-center justify-center rounded-full bg-gradient-to-r from-primary-hovered to-primary px-2 py-[0.5px] text-[9px] font-medium tracking-wide text-white">
								NEW
							</span>
							<span className="text-sm font-light">
								Discover our latest plans
							</span>
						</Badge>

						<Badge
							size="sm"
							variant="subtle"
							className="hidden cursor-pointer px-3 md:flex"
						>
							<span className="mr-2 flex h-[18px] items-center justify-center rounded-full bg-gradient-to-r from-primary-hovered to-primary px-2 py-[0.5px] text-[9px] font-medium tracking-wide text-white">
								NEW
							</span>
							<span className="text-sm font-light">
								Discover our latest plans
							</span>
						</Badge>
					</AnimationContainer>

					<AnimationContainer delay={0.4}>
						<h1 className="text-center font-barlow text-3xl font-bold !leading-tight md:text-4xl lg:text-5xl xl:text-6xl">
							<span className="bg-gradient-to-b from-neutral-900 to-neutral-500 bg-clip-text font-bold !leading-tight text-transparent dark:from-neutral-50 dark:to-neutral-500">
								Secure access for
							</span>
							<GradientText className="font-bold" text="every entry point" />
							<span className="bg-gradient-to-b from-neutral-900 to-neutral-500 bg-clip-text font-bold !leading-tight text-transparent dark:from-neutral-50 dark:to-neutral-500">
								. Automated.
							</span>
						</h1>
					</AnimationContainer>

					<AnimationContainer delay={0.6}>
						<p className="mt-2 max-w-xl text-center text-base text-accent-foreground/60">
							Manage who enters your property, monitor access events, and keep
							your premises protected with a modern gate access platform built
							for reliable security operations.
						</p>
						<div className="mt-6 hidden items-center justify-center gap-x-4 lg:flex">
							<Link
								href="/sign-in"
								className={buttonVariants({ variant: "gradient", size: "lg" })}
							>
								Sign In
							</Link>
							<Link
								href="/sign-up"
								className={buttonVariants({
									variant: "secondary",
									size: "lg"
								})}
							>
								Create Account
							</Link>
						</div>
					</AnimationContainer>

					<AnimationContainer delay={0.8}>
						<div className="mt-6 flex items-center justify-center gap-x-4 lg:hidden">
							<Link
								href="/sign-in"
								className={buttonVariants({ variant: "gradient" })}
							>
								Sign In
							</Link>
							<Link
								href="/sign-up"
								className={buttonVariants({
									variant: "secondary"
								})}
							>
								Create Account
							</Link>
						</div>
						<div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-accent-foreground/60">
							<div className="flex items-center gap-x-2">
								<History className="h-4 w-4" />
								<span className="text-sm font-medium">24/7 monitoring</span>
							</div>
							<span className="hidden sm:inline">•</span>
							<div className="flex items-center gap-x-2">
								<CreditCard className="h-4 w-4" />
								<span className="text-sm font-medium">
									Access logs and reports
								</span>
							</div>
						</div>
					</AnimationContainer>
				</div>
			</div>
		</section>
	)
}
