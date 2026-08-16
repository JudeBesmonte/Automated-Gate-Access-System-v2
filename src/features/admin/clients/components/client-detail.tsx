"use client"

import { useMemo } from "react"
import { Skeleton } from "@/core/components/ui/skeleton"

import { ClientTabs } from "@/features/admin/clients/components/client-tabs"
import { useClientDetails } from "@/features/admin/clients/lib/hooks"
import { type ClientDetail as ClientDetailType } from "@/features/admin/clients/lib/types"

interface ClientDetailProps {
	clientId: string
}

export function ClientDetail({ clientId }: ClientDetailProps) {
	const { data: client, isLoading } = useClientDetails({ id: clientId })

	const clientData = useMemo((): ClientDetailType | null => {
		if (!client?.id || !client?.name || !client?.email || !client?.role) {
			return null
		}

		return {
			id: client.id,
			name: client.name,
			email: client.email,
			image: client.image ?? undefined,
			role: client.role,
			createdAt: client.createdAt ?? new Date(),
			updatedAt: client.updatedAt ?? new Date(),
			subscriptions:
				client.subscriptions?.map((subscription) => ({
					id: subscription.id,
					planType: "EDUCATION",
					billingInterval: "MONTHLY",
					price: subscription.price,
					discount: subscription.discount,
					installationDate: subscription.installationDate?.toISOString() ?? null,
					subscriptionStatus: subscription.subscriptionStatus,
					createdAt: subscription.createdAt.toISOString(),
					updatedAt: subscription.updatedAt.toISOString(),
					planId: subscription.planId,
					subscriberId: subscription.subscriberId,
					subscriberDetailId: subscription.subscriberId,
					plan: subscription.plan
						? {
								id: subscription.plan.id,
								name: subscription.plan.name,
								slug: subscription.plan.slug,
								planType: "EDUCATION",
								billingInterval: "MONTHLY",
								discount: 0,
								monthlyPrice: subscription.plan.monthlyPrice,
								yearlyPrice: null,
								installationFee: 0,
								features: subscription.plan.features,
								inclusions: subscription.plan.inclusions,
								addons: subscription.plan.addons,
								equipment: subscription.plan.equipment,
								hasKiosk: subscription.plan.hasKiosk,
								isActive: true
							}
						: null
				})) ?? []
		}
	}, [client])

	if (isLoading) return <ClientDetailSkeleton />

	if (!clientData) {
		return <div>Error loading client data.</div>
	}

	return (
		<div className="w-full">
			<ClientTabs client={clientData} />
		</div>
	)
}

function ClientDetailSkeleton() {
	return (
		<div className="w-full space-y-6">
			{/* Tabs skeleton */}
			<div className="flex border-b">
				{Array(4)
					.fill(0)
					.map((_, i) => (
						<Skeleton key={i} className="mx-2 h-10 w-28" />
					))}
			</div>

			{/* Content skeleton */}
			<div className="space-y-4">
				<div className="grid grid-cols-2 gap-4">
					<Skeleton className="h-12 w-full" />
					<Skeleton className="h-12 w-full" />
				</div>
				<div className="grid grid-cols-2 gap-4">
					<Skeleton className="h-12 w-full" />
					<Skeleton className="h-12 w-full" />
				</div>
				<div className="grid grid-cols-1 gap-4">
					<Skeleton className="h-32 w-full" />
				</div>
				<div className="flex justify-end">
					<Skeleton className="h-10 w-24" />
				</div>
			</div>
		</div>
	)
}
