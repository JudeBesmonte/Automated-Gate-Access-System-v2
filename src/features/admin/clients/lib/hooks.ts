import { queryOptions, useQuery } from "@tanstack/react-query"

import { type ClientsSearchParams } from "@/features/admin/clients/lib/search-params"
import {
	getClientById,
	getClientDetailsById,
	getClients
} from "@/features/admin/clients/server/action"

export const clientDetailsOptions = ({ id }: { id: string }) =>
	queryOptions({
		queryKey: ["clientBreadcrumbs", id],
		queryFn: async () => await getClientDetailsById({ clientId: id })
	})

export const useClientDetails = ({ id }: { id: string }) =>
	useQuery(clientDetailsOptions({ id }))

export const useGetClients = (params: ClientsSearchParams) => {
	return useQuery({
		queryKey: ["clients", params],
		queryFn: () => getClients(params)
	})
}

export const useGetClientById = (clientId: string) => {
	return useQuery({
		queryKey: ["client", clientId],
		queryFn: async () => await getClientById({ clientId }),
		enabled: !!clientId
	})
}
