import type { getClients } from "@/features/admin/clients/server/action"

export type GetClientsResponse = Awaited<ReturnType<typeof getClients>>
export type GetClientResponse = GetClientsResponse["clients"][number]
