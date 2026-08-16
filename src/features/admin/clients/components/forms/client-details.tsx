import { Building2, Image, Mail, MapPin, Phone, User } from "lucide-react"

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from "@/core/components/ui/card"

import { type ClientDetail } from "@/features/admin/clients/lib/types"

export function ClientDetails({ client }: { client: ClientDetail }) {
	return (
		<div className="grid gap-6 md:grid-cols-2">
			<Card>
				<CardHeader>
					<CardTitle>Client Information</CardTitle>
					<CardDescription>Basic information about the client</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="flex items-start gap-3">
						<Building2 className="mt-0.5 h-5 w-5 text-muted-foreground" />
						<div>
							<p className="font-medium">Client Name</p>
							<p className="text-muted-foreground">
								{client.subscriptionDetails?.clientName ??
									client.name ??
									"Not available"}
							</p>
						</div>
					</div>
					<div className="flex items-start gap-3">
						<MapPin className="mt-0.5 h-5 w-5 text-muted-foreground" />
						<div>
							<p className="font-medium">Site Address</p>
							<p className="text-muted-foreground">
								{client.subscriptionDetails?.siteAddress ?? "Not available"}
							</p>
						</div>
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Contact Information</CardTitle>
					<CardDescription>
						Primary contact details for this client
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="flex items-start gap-3">
						<User className="mt-0.5 h-5 w-5 text-muted-foreground" />
						<div>
							<p className="font-medium">Contact Person</p>
							<p className="text-muted-foreground">
								{client.subscriptionDetails?.contactPerson ??
									client.contactPerson ??
									"Not available"}
							</p>
						</div>
					</div>
					<div className="flex items-start gap-3">
						<Mail className="mt-0.5 h-5 w-5 text-muted-foreground" />
						<div>
							<p className="font-medium">Contact Email</p>
							<p className="text-muted-foreground">
								{client.subscriptionDetails?.contactEmail ??
									client.email ??
									"Not available"}
							</p>
						</div>
					</div>
					<div className="flex items-start gap-3">
						<Phone className="mt-0.5 h-5 w-5 text-muted-foreground" />
						<div>
							<p className="font-medium">Contact Number</p>
							<p className="text-muted-foreground">
								{client.subscriptionDetails?.contactNumber ?? "Not available"}
							</p>
						</div>
					</div>
					{client.subscriptionDetails?.contactDesignation && (
						<div className="flex items-start gap-3">
							<User className="mt-0.5 h-5 w-5 text-muted-foreground" />
							<div>
								<p className="font-medium">Designation</p>
								<p className="text-muted-foreground">
									{client.subscriptionDetails.contactDesignation}
								</p>
							</div>
						</div>
					)}
				</CardContent>
			</Card>

			<Card className="md:col-span-2">
				<CardHeader>
					<CardTitle>Subscription Information</CardTitle>
					<CardDescription>Billing and subscription details</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid gap-4 md:grid-cols-2">
						<div>
							<p className="font-medium">Billing Email</p>
							<p className="text-muted-foreground">
								{client.subscriptionDetails?.contactEmail ??
									client.email ??
									"Not available"}
							</p>
						</div>
						<div>
							<p className="font-medium">Billing Type</p>
							<p className="text-muted-foreground">
								{client.subscriptions?.[0]?.planType ?? "EDUCATION"}
							</p>
						</div>
						<div>
							<p className="font-medium">Site Address</p>
							<p className="text-muted-foreground">
								{client.subscriptionDetails?.siteAddress ?? "Not available"}
							</p>
						</div>
						<div>
							<p className="font-medium">Subscription Status</p>
							<p className="text-muted-foreground">
								{client.subscriptions?.[0]?.subscriptionStatus ?? "Pending"}
							</p>
						</div>
					</div>
				</CardContent>
			</Card>

			<Card className="md:col-span-2">
				<CardHeader>
					<CardTitle>Installation Site</CardTitle>
					<CardDescription>
						Visual documentation of the installation location
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="flex flex-col items-center space-y-3">
						<div className="relative h-60 w-full overflow-hidden rounded-lg border">
							<Image className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 text-muted-foreground" />
							<img
								src="/images/sample-installation-site.jpg"
								alt="Installation Site"
								className="h-full w-full object-cover"
								onError={(e) => {
									const target = e.currentTarget
									target.style.display = "none"
									const prevSibling = target.previousElementSibling
									if (prevSibling && prevSibling instanceof HTMLElement) {
										prevSibling.style.display = "block"
									}
								}}
							/>
						</div>
						<p className="text-center text-sm text-muted-foreground">
							Installation site at{" "}
							{client.subscriptionDetails?.siteAddress ?? "client location"}
						</p>
					</div>
				</CardContent>
			</Card>
		</div>
	)
}
