import { cn } from "@/core/lib/utils"

export function InfoField({
	label,
	className
}: {
	label: string
	className?: {
		container?: string
		label?: string
	}
}) {
	return (
		<div className={cn("mt-4 rounded-md bg-muted p-4", className?.container)}>
			<p className={cn("text-sm text-muted-foreground", className?.label)}>
				{label}
			</p>
		</div>
	)
}
