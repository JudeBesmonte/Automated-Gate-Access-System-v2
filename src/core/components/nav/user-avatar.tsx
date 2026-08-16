import type { User } from "next-auth"

import {
	Avatar,
	AvatarFallback,
	AvatarImage
} from "@/core/components/ui/avatar"
import { cn, getInitials } from "@/core/lib/utils"

export const UserAvatar = ({
	user,
	withDetails = false,
	className
}: {
	user: User
	withDetails?: boolean
	className?: string
}) => {
	const initials = getInitials(user.name ?? "")

	return (
		<>
			<Avatar className={cn("h-8 w-8 rounded-lg", className)}>
				<AvatarImage src={user.image ?? ""} alt={user.name ?? ""} />
				<AvatarFallback className="rounded-lg">{initials}</AvatarFallback>
			</Avatar>

			{withDetails && (
				<div className="grid flex-1 text-left text-sm leading-tight">
					<span className="truncate font-semibold">{user.name}</span>
					<span className="truncate text-xs">{user.email}</span>
				</div>
			)}
		</>
	)
}
