"use client"

import { MapPin } from "lucide-react"

import { Card, CardContent, CardDescription } from "@/core/components/ui/card"

export default function AccountInformationNotFoun() {
	return (
		<div>
			<h2 className="mb-4 text-xl font-semibold">Selected Plan</h2>
			<Card className="border-2 border-dotted border-gray-300">
				<CardContent className="flex items-center justify-between p-6">
					<div className="flex items-center space-x-4">
						<MapPin className="h-6 w-6 text-gray-700" />
						<div>
							<CardDescription className="text-gray-500">
								No Information found
							</CardDescription>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	)
}
