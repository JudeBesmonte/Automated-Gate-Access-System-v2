import { cookies } from "next/headers"

import { Sidebar } from "@/core/components/nav/client/sidebar"
import { SidebarInset, SidebarProvider } from "@/core/components/ui/sidebar"

export default async function ClientLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	const cookieStore = await cookies()
	const defaultOpen = cookieStore.get("sidebar_state")?.value === "true"

	return (
		<SidebarProvider defaultOpen={defaultOpen}>
			<Sidebar variant="inset" collapsible="icon" side="left" />
			<SidebarInset>{children}</SidebarInset>
		</SidebarProvider>
	)
}
