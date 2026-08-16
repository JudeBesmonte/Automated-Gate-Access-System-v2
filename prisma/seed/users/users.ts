import { faker } from "@faker-js/faker"
import { hash } from "bcryptjs"

import { db, DEFAULT_PASSWORD, EMAIL_DOMAIN, SEED_RANGES } from "../config"
import type { UserStats } from "../types"
import { getRandomInRange } from "../utils"

export async function createUsers(): Promise<UserStats> {
	const hashedPassword = await hash(DEFAULT_PASSWORD, 10)

	async function createUserBatch(
		role: "ADMIN" | "CLIENT" | "STAFF",
		count: number
	) {
		const userData = Array.from({ length: count }, () => {
			const firstName = faker.person.firstName()
			const lastName = faker.person.lastName()
			return {
				id: faker.database.mongodbObjectId(),
				name: `${firstName} ${lastName}`,
				email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${EMAIL_DOMAIN}`,
				password: hashedPassword,
				role,
				image: faker.image.url(),
				emailVerified: new Date()
			}
		})

		return db.$transaction(userData.map((data) => db.user.create({ data })))
	}

	const admin = await createUserBatch(
		"ADMIN",
		getRandomInRange(SEED_RANGES.ADMIN)
	)
	const client = await createUserBatch(
		"CLIENT",
		getRandomInRange(SEED_RANGES.CLIENT)
	)
	const staff = await createUserBatch(
		"STAFF",
		getRandomInRange(SEED_RANGES.STAFF)
	)

	return {
		admin: { total: admin.length, items: admin },
		client: { total: client.length, items: client },
		staff: { total: staff.length, items: staff }
	}
}
