import Link from "next/link"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"

import { Badge } from "@/core/components/ui/badge"
import { buttonVariants } from "@/core/components/ui/button"
import { GradientBackground } from "@/core/components/ui/gradient-background"
import {
	PageContainer,
	PageContent,
	PageHeader,
	PageHeaderDescription,
	PageHeaderTitle
} from "@/core/components/ui/page"
import { getQueryClient } from "@/core/lib/get-query-client"
import { capitalize, cn } from "@/core/lib/utils"

import { planDetailsOptions } from "@/features/client/payment/lib/hooks"
import { AddonsCard } from "@/features/client/plan/components/cards/addons-card"
import { ContactCard } from "@/features/client/plan/components/cards/contact-card"
import { EquipmentsCard } from "@/features/client/plan/components/cards/equipments-card"
import { FeaturesCard } from "@/features/client/plan/components/cards/features-card"
import { GetStartedCard } from "@/features/client/plan/components/cards/get-started-card"
import { IncludedCard } from "@/features/client/plan/components/cards/included-card"
import { ToExpectCard } from "@/features/client/plan/components/cards/to-expect-card"

const toExpect = [
	"Site survey and assessment",
	"Professional equipment installation",
	"Network configuration and testing",
	"Scheduling within 3-5 business days",
	"Installation typically completed in 1 day",
	"Follow-up support after installation"
]

export default async function Page({
	params
}: {
	params: Promise<{ slug: string }>
}) {
	const { slug } = await params
	const queryClient = getQueryClient()
	void queryClient.prefetchQuery(planDetailsOptions({ slug }))

	const { plan } = await queryClient.fetchQuery(planDetailsOptions({ slug }))

	const planName = slug
		.replace(/-/g, " ")
		.replace(/\b\w/g, (char) => char.toUpperCase())

	return (
		<PageContainer className="max-w-6xl pb-8">
			<GradientBackground className="rounded-xl">
				<PageHeader className="relative py-4 md:py-6 lg:py-8">
					<div className="flex items-center gap-2">
						<Badge size={"xs"} className="rounded-full bg-white/15">
							{capitalize(plan?.planType ?? "")}
						</Badge>
						{plan?.hasKiosk && (
							<Badge size={"xs"} className="rounded-full bg-white/15">
								Includes Kiosk
							</Badge>
						)}
					</div>

					<PageHeaderTitle className="bg-gradient-to-b from-white to-neutral-200 bg-clip-text font-bold leading-tight text-transparent md:text-4xl">
						{planName}
					</PageHeaderTitle>
					<PageHeaderDescription className="font-medium text-white dark:text-accent-foreground/60">
						{plan?.planType === "EDUCATION"
							? "Tailored for educational institutions seeking robust WiFi solutions and seamless connectivity."
							: "Ideal for businesses and organizations managing multiple locations with enterprise-grade features."}
					</PageHeaderDescription>

					<Link
						href={`/client/subscribe/${slug}`}
						className={cn(
							buttonVariants(),
							"mt-2 bg-white text-black hover:bg-white/90 lg:mt-4"
						)}
					>
						Subscribe Now
					</Link>
				</PageHeader>
			</GradientBackground>

			<HydrationBoundary state={dehydrate(queryClient)}>
				<PageContent className="mt-8 md:mt-12 md:flex-row md:flex-wrap lg:gap-6">
					<div className="flex min-w-[500px] flex-[2_1_0%] flex-col items-start gap-4 md:w-2/3">
						<FeaturesCard slug={slug} />
						<IncludedCard slug={slug} />
						<AddonsCard slug={slug} />
						<EquipmentsCard slug={slug} />
						<ToExpectCard toExpect={toExpect} />
						<GetStartedCard slug={slug} />
					</div>
					<div className="w-full min-w-96 flex-[1_1_0%] md:w-1/3">
						<ContactCard />
					</div>
				</PageContent>
			</HydrationBoundary>
		</PageContainer>
	)
}
