import { useTheme } from "next-themes"

import {
	DropdownMenuItem,
	DropdownMenuPortal,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger
} from "@/core/components/ui/dropdown-menu"
import { CheckIcon, ThemeIcon } from "@/core/lib/icons"
import { THEMES } from "@/core/lib/themes"

export const DropdownThemeSelector = () => {
	const { setTheme, theme } = useTheme()

	return (
		<DropdownMenuSub>
			<DropdownMenuSubTrigger>
				<ThemeIcon />
				Theme
			</DropdownMenuSubTrigger>
			<DropdownMenuPortal>
				<DropdownMenuSubContent className="min-w-40">
					{THEMES.map(({ value, label, icon: Icon }) => (
						<DropdownMenuItem key={value} onClick={() => setTheme(value)}>
							<Icon className="mr-2 size-4" />
							{label}
							{theme === value && <CheckIcon className="ml-auto size-4" />}
						</DropdownMenuItem>
					))}
				</DropdownMenuSubContent>
			</DropdownMenuPortal>
		</DropdownMenuSub>
	)
}
