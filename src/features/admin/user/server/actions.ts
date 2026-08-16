"use server"

import { type Prisma, type UserRole } from "@prisma/client"
import { hash } from "bcryptjs"

import { getUserByEmail } from "@/services/authjs/data"

import { guard } from "@/core/lib/auth-guard"
import { catchErr } from "@/core/lib/errors"
import { dateRangeFilter } from "@/core/lib/utils"
import { db } from "@/core/server/db"

import type { UsersSearchParams } from "@/features/admin/user/lib/search-params"
import {
	createUserSchema,
	deleteUserSchema,
	editUserSchema
} from "@/features/admin/user/server/validations"

export const getUsers = guard
	.schema<UsersSearchParams>()
	.action(async ({ page, perPage, sort, name, role, createdAt, updatedAt }) => {
		const where: Prisma.UserWhereInput = {
			...(name && { name: { contains: name, mode: "insensitive" } }),
			...(role?.length && { role: { in: role as unknown as UserRole[] } }),
			...(createdAt && { createdAt: dateRangeFilter(createdAt) }),
			...(updatedAt && { updatedAt: dateRangeFilter(updatedAt) })
		}

		const orderBy: Prisma.UserOrderByWithRelationInput[] = sort?.length
			? sort.map(({ id, desc }) => ({ [id]: desc ? "desc" : "asc" }))
			: [{ createdAt: "desc" }]

		const [users, total] = await Promise.all([
			db.user.findMany({
				skip: (page - 1) * perPage,
				take: perPage,
				where,
				orderBy
			}),
			db.user.count({ where })
		])

		return { users, pageCount: Math.ceil(total / perPage) }
	})

export const addUser = guard
	.roles(["ADMIN"])
	.schema(createUserSchema)
	.action(async ({ name, email, password, role }) => {
		const existingUser = await getUserByEmail(email)
		if (existingUser) throw new Error("User already exists!")

		const hashedPassword = await hash(password, 10)

		const [, error] = await catchErr(
			db.user.create({
				data: { name, email, password: hashedPassword, role }
			})
		)

		if (error) throw error

		return { success: "User created successfully" }
	})

export const editUser = guard
	.roles(["ADMIN"])
	.schema(editUserSchema)
	.action(async ({ id, name, email, role, password }) => {
		const data = {
			...(name && { name }),
			...(email && { email }),
			...(role && { role }),
			...(password && { password: await hash(password, 10) })
		}

		return await db.user.update({
			where: { id },
			data
		})
	})

export const deleteUser = guard
	.roles(["ADMIN"])
	.schema(deleteUserSchema)
	.action(async ({ id }) => {
		return await db.user.delete({
			where: { id }
		})
	})
