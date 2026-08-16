import {
	GitHubLogo,
	GoogleLogo,
	MicrosoftLogo,
	NotionLogo,
	UberLogo
} from "@/features/landing-page/components/brand-logo"

export const TrustedBySection = () => {
	return (
		<div className="w-full py-16">
			<h2 className="mb-16 text-center text-lg uppercase tracking-wider text-zinc-500">
				Trusted by teams from around the Philippines
			</h2>
			<div className="flex flex-wrap items-center justify-center gap-12 md:gap-20">
				<GoogleLogo />
				<MicrosoftLogo />
				<GitHubLogo />
				<UberLogo />
				<NotionLogo />
			</div>
		</div>
	)
}
