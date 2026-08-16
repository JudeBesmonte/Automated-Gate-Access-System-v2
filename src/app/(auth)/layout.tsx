import { Spotlight } from "@/core/components/ui/spotlight"

import { FloatingBackButton } from "@/features/auth/components/floating-back-button"
import { FloatingThemeToggle } from "@/features/auth/components/floating-theme-toggle"

export default async function Layout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<div className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-sidebar-gradient sm:p-6 md:p-10">
			<FloatingBackButton />
			<Spotlight />
			<FloatingThemeToggle />
			<div className="w-full max-w-sm md:max-w-4xl">{children}</div>
		</div>
	)
}
