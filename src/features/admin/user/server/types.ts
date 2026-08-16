import type { getUsers } from "@/features/admin/user/server/actions"

export type GetUsersResponse = Awaited<ReturnType<typeof getUsers>>
export type GetUserResponse = GetUsersResponse["users"][number]
