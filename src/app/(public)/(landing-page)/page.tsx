import { PageContainer } from "@/core/components/ui/page"

import { HeroSection } from "@/features/landing-page/components/sections/hero-section"
import { PlansSection } from "@/features/landing-page/components/sections/plans-section"
import { TrustedBySection } from "@/features/landing-page/components/sections/trusted-by-section"

export default async function Home() {
	return (
		<main className="-z-10 min-h-screen">
			<div className="absolute inset-0 h-full bg-grid-black/[0.05] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)] dark:bg-sidebar/90 dark:bg-grid-medium-white/[0.08]" />
			<div className="absolute left-[calc(55%-190px/2)] top-[-133px] h-[310px] w-[190px] rounded-full bg-primary/50 opacity-40 blur-[50rem] dark:bg-primary md:left-[calc(55%-379px/2)] md:top-[-266px] md:h-[620px] md:w-[379px]" />

			<PageContainer className="max-w-7xl" asChild>
				<HeroSection />
			</PageContainer>

			<PageContainer className="max-w-7xl" asChild>
				<PlansSection />
			</PageContainer>

			<PageContainer className="max-w-7xl" asChild>
				<TrustedBySection />
			</PageContainer>
		</main>
	)
}
