import { queryOptions, useSuspenseQuery } from "@tanstack/react-query"

import { getPlanDetails } from "@/features/client/payment/server/actions"

export const planDetailsOptions = ({ slug }: { slug: string }) => {
	return queryOptions({
		queryKey: ["plan-detailsxx", slug],
		queryFn: () => getPlanDetails({ slug })
	})
}

export const usePlanDetails = ({ slug }: { slug: string }) => {
	return useSuspenseQuery(planDetailsOptions({ slug }))
}
