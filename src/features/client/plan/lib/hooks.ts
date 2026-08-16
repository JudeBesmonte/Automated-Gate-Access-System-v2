import { useQuery } from "@tanstack/react-query"

import { getPlan } from "@/features/client/plan/server/actions"

export const usePlan = ({ planSlug }: { planSlug: string }) =>
	useQuery({
		queryKey: ["plan", planSlug],
		queryFn: () => getPlan({ planSlug }),
		enabled: !!planSlug
	})
