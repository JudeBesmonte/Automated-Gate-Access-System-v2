import { useQuery } from "@tanstack/react-query"
import { useQueryStates } from "nuqs"

import { getPayments } from "../server/actions"
import { paymentsSearchParamsParser } from "./search-params"

export const useGetPayments = () => {
	const [params] = useQueryStates(paymentsSearchParamsParser)

	const result = useQuery({
		queryKey: ["payments", params],
		queryFn: () => getPayments(params)
	})

	return result
}
