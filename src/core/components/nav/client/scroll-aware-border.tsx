"use client"

import { useEffect, useState } from "react"

import { cn } from "@/core/lib/utils"

export function ScrollAwareBorder() {
	const [showBorder, setShowBorder] = useState(false)

	useEffect(() => {
		const handleScroll = () => setShowBorder(window.scrollY > 0)
		handleScroll()
		window.addEventListener("scroll", handleScroll)
		return () => window.removeEventListener("scroll", handleScroll)
	}, [])

	return (
		<div
			className={cn(
				"absolute -z-10 h-full w-full border-b border-border/50 bg-background/50 backdrop-blur-md transition-all duration-300 dark:bg-sidebar/10",
				showBorder ? "opacity-100" : "pointer-events-none opacity-0"
			)}
		/>
	)
}
