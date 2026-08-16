import React from "react"
import { Check, Clock } from "lucide-react"

import { Badge } from "@/core/components/ui/badge"
import { Button } from "@/core/components/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from "@/core/components/ui/card"

import { type ClientDetail } from "@/features/admin/clients/lib/types"

export function ClientPlans({ client }: { client: ClientDetail }) {
	// Get all subscriptions
	const subscriptions = client.subscriptions
	const hasSubscriptions = subscriptions.length > 0

	return (
		<div>
			<div className="mb-6 flex items-center justify-between">
				<h2 className="text-xl font-semibold">Subscribed Plans</h2>
			</div>

			{!hasSubscriptions ? (
				<Card>
					<CardHeader>
						<CardTitle>No Plans Available</CardTitle>
						<CardDescription>
							This client has not subscribed to any plans yet.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<p className="text-muted-foreground">
							Contact the client to set up their first subscription plan.
						</p>
					</CardContent>
				</Card>
			) : (
				<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
					{subscriptions.map((subscription) => (
						<Card key={subscription.id} className="flex flex-col">
							<CardHeader>
								<div className="flex items-start justify-between">
									<CardTitle>
										{subscription.plan?.name ?? "Unknown Plan"}
									</CardTitle>
									<Badge
										variant={
											subscription.subscriptionStatus?.toLowerCase() ===
											"active"
												? "default"
												: "secondary"
										}
									>
										{subscription.subscriptionStatus?.toLowerCase() ??
											"pending"}
									</Badge>
								</div>
								<CardDescription>
									{new Date(subscription.createdAt).toLocaleDateString(
										undefined,
										{
											year: "numeric",
											month: "short",
											day: "numeric"
										}
									)}
								</CardDescription>
							</CardHeader>
							<CardContent className="flex-1">
								<p className="mb-4 text-2xl font-bold">
									${subscription.plan?.monthlyPrice ?? 0}/month
								</p>
								<ul className="space-y-2">
									{subscription.plan?.features &&
									Array.isArray(subscription.plan.features) &&
									subscription.plan.features.length > 0 ? (
										subscription.plan.features.map(
											(feature: string, index: number) => (
												<li key={index} className="flex items-start gap-2">
													<Check className="mt-1 h-4 w-4 shrink-0 text-green-500" />
													<span>{feature}</span>
												</li>
											)
										)
									) : (
										<>
											<li className="flex items-center gap-2">
												<Check className="h-4 w-4 text-green-500" />
												<span>
													Billing: {subscription.billingInterval.toLowerCase()}
												</span>
											</li>
											{subscription.installationDate && (
												<li className="flex items-center gap-2">
													<Check className="h-4 w-4 text-green-500" />
													<span>
														Installation Date:{" "}
														{new Date(
															subscription.installationDate
														).toLocaleDateString()}
													</span>
												</li>
											)}
											{subscription.plan?.inclusions &&
												Array.isArray(subscription.plan.inclusions) &&
												subscription.plan.inclusions.length > 0 && (
													<li className="flex items-center gap-2">
														<Check className="h-4 w-4 text-green-500" />
														<span>
															Inclusions:{" "}
															{subscription.plan.inclusions.join(", ")}
														</span>
													</li>
												)}
											{subscription.plan?.equipment &&
												Array.isArray(subscription.plan.equipment) &&
												subscription.plan.equipment.length > 0 && (
													<li className="flex items-center gap-2">
														<Check className="h-4 w-4 text-green-500" />
														<span>
															Equipment:{" "}
															{subscription.plan.equipment.join(", ")}
														</span>
													</li>
												)}
											{subscription.plan?.hasKiosk && (
												<li className="flex items-center gap-2">
													<Check className="h-4 w-4 text-green-500" />
													<span>Includes Kiosk</span>
												</li>
											)}
											{subscription.planType && (
												<li className="flex items-center gap-2">
													<Check className="h-4 w-4 text-green-500" />
													<span>
														Plan Type: {subscription.planType.toLowerCase()}
													</span>
												</li>
											)}
										</>
									)}
								</ul>
							</CardContent>
							<CardFooter className="flex flex-col items-start gap-4 border-t pt-4">
								<div className="flex items-center gap-2 text-sm">
									<Clock className="h-4 w-4 text-muted-foreground" />
									<span>
										Next billing: {subscription.billingInterval.toLowerCase()}
									</span>
								</div>
								<div className="flex w-full gap-2">
									<Button variant="outline" className="flex-1">
										Manage
									</Button>
									<Button variant="outline" className="flex-1">
										Cancel
									</Button>
								</div>
							</CardFooter>
						</Card>
					))}
				</div>
			)}
		</div>
	)
}
