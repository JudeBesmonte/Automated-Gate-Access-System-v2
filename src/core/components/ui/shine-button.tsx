import * as React from "react"

import { cn } from "@/core/lib/utils"

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

export const ShineButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, children, ...props }, ref) => {
		return (
			<button
				className={cn(
					"group/button relative inline-flex origin-center transform-gpu items-center justify-center overflow-hidden rounded-md bg-primary px-4 py-1.5 text-sm font-normal text-primary-foreground transition-all duration-300 ease-in-out hover:scale-105 hover:bg-primary-hovered hover:shadow-lg",
					className
				)}
				ref={ref}
				{...props}
			>
				{children}
				<div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]">
					<div className="relative h-full w-8 bg-white/20" />
				</div>
			</button>
		)
	}
)
ShineButton.displayName = "ShineButton"
