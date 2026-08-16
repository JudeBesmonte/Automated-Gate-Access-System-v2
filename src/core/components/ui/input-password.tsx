import * as React from "react"

import { EyeClosedIcon, EyeIcon } from "@/core/lib/icons"
import { cn } from "@/core/lib/utils"

const InputPassword = React.forwardRef<
	HTMLInputElement,
	React.ComponentProps<"input">
>(({ className, ...props }, ref) => {
	const [showPassword, setShowPassword] = React.useState(false)

	return (
		<div className="relative">
			<input
				type={showPassword ? "text" : "password"}
				className={cn(
					"hide-password-toggle flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground/60 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 dark:bg-secondary/60 md:text-sm",
					className
				)}
				ref={ref}
				{...props}
			/>
			<button
				type="button"
				tabIndex={-1}
				className="absolute right-0.5 top-1/2 -translate-y-1/2 rounded-md bg-transparent p-2 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none"
				onClick={() => setShowPassword(!showPassword)}
			>
				{showPassword ? <EyeClosedIcon /> : <EyeIcon />}
				<span className="sr-only">
					{showPassword ? "Hide password" : "Show password"}
				</span>
			</button>

			<style>{`
					.hide-password-toggle::-ms-reveal,
					.hide-password-toggle::-ms-clear {
						visibility: hidden;
						pointer-events: none;
						display: none;
					}
				`}</style>
		</div>
	)
})
InputPassword.displayName = "InputPassword"

export { InputPassword }
