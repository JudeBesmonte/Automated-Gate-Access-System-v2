"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/core/lib/utils"

const tagStyles = cva(
	"inline-flex items-center gap-x-1.5 py-1 font-medium text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
	{
		variants: {
			variant: {
				primary: "bg-primary text-primary-foreground hover:bg-primary-hovered",
				secondary:
					"bg-secondary text-secondary-foreground hover:bg-secondary/80",
				success: "bg-emerald-500/15 text-emerald-500 hover:bg-emerald-500/20",
				destructive: "bg-red-500/15 text-red-500 hover:bg-red-500/20",
				warning: "bg-amber-500/15 text-amber-500 hover:bg-amber-500/20",
				info: "bg-sky-500/15 text-sky-500 hover:bg-sky-500/20",
				outline: "border border-border text-foreground",
				muted: "bg-muted text-muted-foreground hover:bg-muted/80",
				accent: "bg-accent text-accent-foreground hover:bg-accent/80"
			},
			shape: {
				square: "rounded px-1.5",
				circle: "px-2 rounded-full"
			}
		},
		defaultVariants: {
			variant: "primary",
			shape: "circle"
		}
	}
)

export type TagProps = React.HTMLAttributes<HTMLDivElement> &
	VariantProps<typeof tagStyles> & {
		className?: string
		children: React.ReactNode
	}

export const Tag = ({
	children,
	variant,
	shape,
	className,
	...props
}: TagProps) => {
	return (
		<span {...props} className={cn(tagStyles({ variant, shape }), className)}>
			{children}
		</span>
	)
}
