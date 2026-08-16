"use client"

import Link from "next/link"
import { signOut } from "next-auth/react"

import { Button } from "@/core/components/ui/button"

export function SignOutButton({ authenticated }: { authenticated: boolean }) {
	if (!authenticated) {
		return (
			<Link href="/sign-in">
				<Button variant="link">Sign In</Button>
			</Link>
		)
	}

	return (
		<Button variant="link" onClick={() => signOut()}>
			Sign Out
		</Button>
	)
}
