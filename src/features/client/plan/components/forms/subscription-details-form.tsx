import Image from "next/image"
import { useState } from "react"
import { Label } from "@radix-ui/react-label"
import { Upload } from "lucide-react"

import { Button } from "@/core/components/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from "@/core/components/ui/card"
import { Checkbox } from "@/core/components/ui/checkbox"
import { Input } from "@/core/components/ui/input"
import { Textarea } from "@/core/components/ui/textarea"

export default function SubscriptionDetailsForm() {
	const [imagePreview, setImagePreview] = useState<string | null>(null)
	const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (file) {
			const reader = new FileReader()
			reader.onloadend = () => {
				setImagePreview(reader.result as string)
			}
			reader.readAsDataURL(file)
		}
	}
	return (
		<Card className="md:col-span-2">
			<CardHeader className="space-y-1">
				<CardTitle className="text-2xl">Subscription Details</CardTitle>
				<CardDescription>
					Complete your subscription information
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="space-y-2">
					<Label htmlFor="company-name">Company Name</Label>
					<Input id="company-name" placeholder="Enter your company name" />
				</div>

				<div className="space-y-2">
					<Label htmlFor="office-address">Office Address</Label>
					<Textarea
						id="office-address"
						placeholder="Enter your office address"
					/>
				</div>

				<div className="grid gap-4 sm:grid-cols-2">
					<div className="space-y-2">
						<Label htmlFor="contact-number">Contact Number</Label>
						<Input
							id="contact-number"
							placeholder="Enter contact number"
							type="tel"
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="email-address">Email Address</Label>
						<Input
							id="email-address"
							placeholder="Enter email address"
							type="email"
						/>
					</div>
				</div>

				<div className="grid gap-4 sm:grid-cols-2">
					<div className="space-y-2">
						<Label htmlFor="contact-person">Contact Person</Label>
						<Input
							id="contact-person"
							placeholder="Enter contact person name"
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="designation">Designation</Label>
						<Input id="designation" placeholder="Enter designation" />
					</div>
				</div>

				<div className="space-y-2">
					<Label htmlFor="landmark-image">Landmark Image</Label>
					<div className="grid gap-4">
						<Input
							id="landmark-image"
							type="file"
							accept="image/*"
							onChange={handleImageUpload}
							className="cursor-pointer"
						/>
						{imagePreview ? (
							<div className="relative aspect-video overflow-hidden rounded-lg border">
								<Image
									src={imagePreview || "/placeholder.svg"}
									alt="Landmark preview"
									fill
									className="h-full w-full object-cover"
								/>
							</div>
						) : (
							<div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-6 text-center">
								<Upload className="mb-2 h-8 w-8 text-muted-foreground" />
								<p className="text-sm text-muted-foreground">
									Upload an image of your landmark
								</p>
								<p className="mt-1 text-xs text-muted-foreground">
									PNG, JPG or GIF up to 10MB
								</p>
							</div>
						)}
					</div>
				</div>

				<div className="flex items-start space-x-2 pt-2">
					<Checkbox id="privacy-policy" />
					<Label htmlFor="privacy-policy" className="text-sm leading-tight">
						I agree to the privacy policy and terms of service. I understand my
						personal data will be processed as described in the privacy policy.
					</Label>
				</div>
			</CardContent>
			<CardFooter>
				<Button className="w-full">Submit Subscription</Button>
			</CardFooter>
		</Card>
	)
}
