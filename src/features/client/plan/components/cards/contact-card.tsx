"use client"

import Link from "next/link"
import { LuMail, LuPhone } from "react-icons/lu"

import { buttonVariants } from "@/core/components/ui/button"
import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from "@/core/components/ui/card"
import { cn } from "@/core/lib/utils"

export function ContactCard() {
	return (
		<Card className="overflow-hidden">
			<CardHeader className="pb-4">
				<CardTitle>Need more information?</CardTitle>
				<CardDescription>
					Our team is ready to answer any questions about this plan.
				</CardDescription>
			</CardHeader>

			<CardFooter className="gap-2 py-4">
				<Link
					href="mailto:sales@quanbyit.com"
					className={cn(buttonVariants({ variant: "outline", size: "sm" }), "")}
				>
					<LuMail className="text-muted-foreground" />
					Email Sales
				</Link>
				<Link
					href="https://quanbyit.com/contact-quanby/"
					target="_blank"
					className={cn(buttonVariants({ variant: "outline", size: "sm" }), "")}
				>
					<LuPhone className="text-muted-foreground" />
					Contact Us
				</Link>
			</CardFooter>
		</Card>
	)
}
