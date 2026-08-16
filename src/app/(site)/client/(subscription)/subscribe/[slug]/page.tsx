import { dehydrate, HydrationBoundary } from "@tanstack/react-query"

import {
	PageContainer,
	PageContent,
	PageHeader,
	PageHeaderDescription,
	PageHeaderTitle
} from "@/core/components/ui/page"
import { getQueryClient } from "@/core/lib/get-query-client"

import { planDetailsOptions } from "@/features/client/payment/lib/hooks"
import { SubscriptionStepper } from "@/features/client/subscribe/components/subscription-stepper"

export default async function Page({
	params
}: {
	params: Promise<{ slug: string }>
}) {
	const { slug } = await params
	const queryClient = getQueryClient()
	void queryClient.prefetchQuery(planDetailsOptions({ slug }))

	return (
		<>
			<PageContainer className="max-w-6xl pb-8">
				<PageHeader className="items-center">
					<PageHeaderTitle>You&apos;re Almost There!</PageHeaderTitle>
					<PageHeaderDescription>
						Please complete your payment details to subscribe.
					</PageHeaderDescription>
				</PageHeader>

				<HydrationBoundary state={dehydrate(queryClient)}>
					<PageContent asChild>
						<SubscriptionStepper slug={slug} />
					</PageContent>
				</HydrationBoundary>
			</PageContainer>
		</>
	)
}
