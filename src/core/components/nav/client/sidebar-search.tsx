"use client"

import { Search } from "lucide-react"

import { Label } from "@/core/components/ui/label"
import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarInput,
	useSidebar
} from "@/core/components/ui/sidebar"

export function SearchForm({ ...props }: React.ComponentProps<"form">) {
	const { state } = useSidebar()
	return (
		<form {...props}>
			<SidebarGroup className="px-0 pb-0">
				<SidebarGroupContent className="relative">
					<Label htmlFor="search" className="sr-only">
						Search
					</Label>
					<SidebarInput
						id="search"
						placeholder={state === "expanded" ? "Search..." : undefined}
						className={state === "expanded" ? "pl-8" : undefined}
					/>
					<Search className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-50" />
				</SidebarGroupContent>
			</SidebarGroup>
		</form>
	)
}
