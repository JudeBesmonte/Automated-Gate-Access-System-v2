"use client"

import { useState } from "react"
import { useTheme } from "next-themes"
import { useIsClient } from "usehooks-ts"

import { Button } from "@/core/components/ui/button"
import { THEMES } from "@/core/lib/themes"
import { cn } from "@/core/lib/utils"

const FloatingThemeToggle = () => {
	const isClient = useIsClient()
	const { setTheme, theme } = useTheme()
	const [animate, setAnimate] = useState(false)

	if (!isClient) return null

	const handleThemeChange = () => {
		setAnimate(true)
		setTheme(theme === "light" ? "dark" : theme === "dark" ? "system" : "light")
		setTimeout(() => setAnimate(false), 300)
	}

	return (
		<Button
			variant="outline"
			size="icon"
			className="fixed bottom-5 right-2 z-[999] flex size-12 items-center justify-center rounded-full bg-sidebar-gradient text-sidebar-foreground shadow-2xl backdrop-blur-[0.5rem] transition-all hover:scale-[1.15] md:right-6"
			onClick={handleThemeChange}
		>
			{THEMES.find((t) => t.value === theme)?.icon({
				className: cn(
					"absolute h-[1.2rem] w-[1.2rem] rotate-0 scale-100 opacity-100",
					animate && "animate-spin-once"
				)
			})}
		</Button>
	)
}

export { FloatingThemeToggle }
