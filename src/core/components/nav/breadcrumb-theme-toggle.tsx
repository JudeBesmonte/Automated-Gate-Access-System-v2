"use client"

import { useState } from "react"
import { useTheme } from "next-themes"
import { useIsClient } from "usehooks-ts"

import { Button, type ButtonProps } from "@/core/components/ui/button"
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger
} from "@/core/components/ui/tooltip"
import { THEMES } from "@/core/lib/themes"
import { cn } from "@/core/lib/utils"

const BreadcrumbThemeToggle = ({ className, ...props }: ButtonProps) => {
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
		<Tooltip>
			<TooltipTrigger asChild>
				<Button
					variant="ghost"
					size="icon"
					className={cn(
						"size-7 rounded-bl-xl text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-border))]",
						className
					)}
					onClick={handleThemeChange}
					{...props}
				>
					{THEMES.find((t) => t.value === theme)?.icon({
						className: cn(
							"absolute h-[1.2rem] w-[1.2rem] rotate-0 scale-100 opacity-100",
							animate && "animate-spin-once"
						)
					})}
				</Button>
			</TooltipTrigger>
			<TooltipContent>
				{THEMES.find((t) => t.value === theme)?.label} Theme
			</TooltipContent>
		</Tooltip>
	)
}

export { BreadcrumbThemeToggle }
