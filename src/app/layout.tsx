import type { Metadata } from "next"
import { SessionProvider } from "next-auth/react"
import { NuqsAdapter } from "nuqs/adapters/next/app"

import { auth } from "@/services/authjs/auth"

import { SizeIndicator } from "@/core/components/ui/size-indicator"
import { Toaster } from "@/core/components/ui/sonner"
import { QueryProvider } from "@/core/context/query-provider"
import { ThemeProvider } from "@/core/context/theme-provider"
import { barlow } from "@/core/lib/fonts/barlow"
import { montserrat } from "@/core/lib/fonts/montserrat"
import { poppins } from "@/core/lib/fonts/poppins"

import "@/core/styles/globals.css"

import { GoogleMapsProvider } from "@/core/context/google-maps-provider"

export const metadata: Metadata = {
	title: "Automated Gate Access System V2",
	description:
		"Modern gate access management template with secure sign-in and sign-up flows."
}

export default async function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	const session = await auth()

	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${barlow.variable} ${montserrat.variable} ${poppins.variable} !scrollbar-hide min-h-screen overflow-x-hidden bg-background font-montserrat antialiased dark:bg-sidebar`}
			>
				<NuqsAdapter>
					<SessionProvider session={session}>
						<ThemeProvider>
							<QueryProvider>
								<GoogleMapsProvider>
									{children}
									<Toaster closeButton richColors />
									<SizeIndicator />
								</GoogleMapsProvider>
							</QueryProvider>
						</ThemeProvider>
					</SessionProvider>
				</NuqsAdapter>
			</body>
		</html>
	)
}
