import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/core/lib/utils"

const badgeVariants = cva(
	"inline-flex items-center rounded-md justify-center gap-1 whitespace-nowrap border font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 [&_svg]:pointer-events-none [&_svg]:size-3.5 [&_svg]:shrink-0",
	{
		variants: {
			variant: {
				default:
					"border-transparent bg-primary text-primary-foreground shadow hover:bg-primary-hovered",
				secondary:
					"border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
				destructive:
					"border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
				outline:
					"border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground",
				outlineSecondary:
					"border border-accent-foreground/10 border-t-2 border-t-accent-foreground/20 bg-transparent backdrop-blur-md shadow-sm rounded-full",
				subtle:
					"border-t border-b-0 border-x-0 border-accent-foreground/20 shadow-sm dark:shadow-2xl dark:border-foreground/20 bg-white/75 dark:bg-accent dark:bg-white/10 backdrop-blur-md text-foreground rounded-full"
			},
			size: {
				default: "px-2.5 py-0.5 text-xs",
				xs: "px-1 py-0.5 text-xs",
				sm: "px-1.5 py-1 text-xs",
				lg: "px-5 py-1.5 text-sm"
			}
		},
		defaultVariants: {
			variant: "default",
			size: "default"
		}
	}
)

export interface BadgeProps
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof badgeVariants> {}

function Badge({ className, size, variant, ...props }: BadgeProps) {
	return (
		<div
			className={cn(badgeVariants({ size, variant }), className)}
			{...props}
		/>
	)
}

export { Badge, badgeVariants }
