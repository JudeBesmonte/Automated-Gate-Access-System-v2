import { type User } from "@prisma/client"

export type UserStats = {
	admin: {
		total: number
		items: User[]
	}
	client: {
		total: number
		items: User[]
	}
	staff: {
		total: number
		items: User[]
	}
}
