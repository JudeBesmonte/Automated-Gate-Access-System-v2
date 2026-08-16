import { Navbar } from "@/core/components/nav/client/navbar"

import { Footer } from "@/features/landing-page/components/footer"

export default async function PublicLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<div className="min-h-screen dark:bg-[#0b090b]">
			<Navbar />
			{children}
			<Footer />
		</div>
	)
}
