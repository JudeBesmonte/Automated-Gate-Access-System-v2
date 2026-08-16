"use server"

import { catchErr } from "@/core/lib/errors"
import { db } from "@/core/server/db"

export async function getUserByEmail(email: string) {
	const [data, error] = await catchErr(
		db.user.findUnique({
			where: { email }
		})
	)

	if (error) throw error

	return data
}

export async function getUserById(id: string) {
	const [data, error] = await catchErr(
		db.user.findUnique({
			where: { id }
		})
	)

	if (error) throw error

	return data
}

export async function getUserByIdWithAccounts(id: string) {
	const [data, error] = await catchErr(
		db.user.findUnique({
			where: { id },
			include: { accounts: true }
		})
	)

	if (error) throw error

	return data
}
