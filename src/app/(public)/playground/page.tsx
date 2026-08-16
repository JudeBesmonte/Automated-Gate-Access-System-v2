import Link from "next/link"

import { auth } from "@/services/authjs/auth"

import { SignOutButton } from "@/core/components/sign-out-button"
import { Button } from "@/core/components/ui/button"

import { MapsPlaygroundComponent } from "./_components/maps-playground"

export default async function PlaygroundPage() {
	const session = await auth()

	return (
		<div className="space-y-4">
			<span>Role: {session?.user?.role}</span>
			<div className="flex gap-2">
				<Link href="/a">
					<Button variant="link">Admin</Button>
				</Link>
				<Link href="/c">
					<Button variant="link">Client</Button>
				</Link>
				<Link href="/s">
					<Button variant="link">Staff</Button>
				</Link>
				<SignOutButton authenticated={!!session} />
			</div>
			<MapsPlaygroundComponent />
		</div>
	)
}
