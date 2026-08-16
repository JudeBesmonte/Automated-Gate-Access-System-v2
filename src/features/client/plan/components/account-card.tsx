"use client"

import {
	Avatar,
	AvatarFallback,
	AvatarImage
} from "@/core/components/ui/avatar"
import { Card, CardContent, CardDescription } from "@/core/components/ui/card"

import { useAuthSession } from "@/features/auth/lib/hooks"

import { AccountCardSkeleton } from "./skeletons/account-card-skeleton"

export const AccountCard = () => {
	const { data: session, isPending } = useAuthSession()

	if (isPending) {
		return <AccountCardSkeleton />
	}

	return (
		<Card>
			<CardContent className="flex items-center space-x-4 p-6">
				<Avatar className="h-16 w-16">
					{session?.user?.image ? (
						<AvatarImage src={session.user.image} alt={session.user.name} />
					) : (
						<AvatarFallback>
							{session?.user?.name?.charAt(0) ?? ""}
						</AvatarFallback>
					)}
				</Avatar>
				<div>
					<h2 className="text-xl font-semibold">
						{session?.user?.name ?? ""} • {session?.user?.email ?? ""}
					</h2>
					<CardDescription>Personal account</CardDescription>
				</div>
			</CardContent>
		</Card>
	)
}
