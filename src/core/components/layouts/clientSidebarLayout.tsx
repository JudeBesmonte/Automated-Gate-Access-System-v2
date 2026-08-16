"use client"

import { type ReactNode } from "react"

import { Sidebar } from "@/core/components/nav/client/sidebar-old"

interface SidebarLayoutProps {
	children: ReactNode
	showSidebar?: boolean
}

export function SidebarLayout({
	children,
	showSidebar = true
}: SidebarLayoutProps) {
	return (
		<div className="container mx-auto px-4 py-8">
			<div className="flex flex-col gap-8 md:flex-row">
				{showSidebar && <Sidebar />}
				<div className="flex-1">{children}</div>
			</div>
		</div>
	)
}
