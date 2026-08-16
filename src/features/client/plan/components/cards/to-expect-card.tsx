"use client"

import { CheckIcon } from "lucide-react"

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from "@/core/components/ui/card"

export function ToExpectCard({ toExpect }: { toExpect: string[] }) {
	return (
		<Card className="w-full">
			<CardHeader>
				<CardTitle className="text-xl font-bold">
					Installation and Setup
				</CardTitle>
				<CardDescription>
					Our professional team will handle the complete installation and setup
					of your WiFi network, ensuring everything is configured correctly and
					optimized for your specific needs.
				</CardDescription>
			</CardHeader>

			<CardContent>
				<h3 className="mb-2">What to expect:</h3>
				<ul className="grid gap-x-4 gap-y-2 md:grid-cols-2">
					{toExpect.map((expect, index) => (
						<li key={index} className="flex items-start gap-2 text-sm">
							<CheckIcon className="mt-1 h-4 w-4 shrink-0 text-primary" />
							{expect}
						</li>
					))}
				</ul>
			</CardContent>
		</Card>
	)
}
