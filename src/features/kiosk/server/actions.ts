"use server"

import { revalidatePath } from "next/cache"

import { guard } from "@/core/lib/auth-guard"

import {
	addKioskSchema,
	editKioskSchema,
	getKiosksByProjectSchema
} from "@/features/kiosk/server/types"

export const addKiosk = guard
	.roles(["ADMIN"])
	.schema(addKioskSchema)
	.action(async ({ name: _name, project_id: _project_id }) => {
		// const existingKiosk = await db.kiosk.findFirst({
		// 	where: { name: data.name, project_id: data.project_id }
		// })

		// if (existingKiosk) {
		// 	throw new Error("A kiosk with this name already exists in this project")
		// }

		// const kiosk = await db.kiosk.create({
		// 	data: {
		// 		name: data.name.trim(),
		// 		project: { connect: { id: data.project_id } }
		// 	}
		// })

		revalidatePath("/")
		// return { success: true, data: kiosk }
		return { success: true }
	})

export const editKiosk = guard
	.roles(["ADMIN"])
	.schema(editKioskSchema)
	.action(async ({ id: _id, name: _name }) => {
		// const currentKiosk = await db.kiosk.findUnique({
		// 	where: { id: data.id },
		// 	select: { project_id: true }
		// })

		// if (!currentKiosk) {
		// 	throw new Error("Kiosk not found")
		// }

		// const existingKiosk = await db.kiosk.findFirst({
		// 	where: {
		// 		name: data.name.trim(),
		// 		project_id: currentKiosk.project_id,
		// 		id: { not: data.id }
		// 	}
		// })

		// if (existingKiosk) {
		// 	throw new Error("A kiosk with this name already exists in this project")
		// }

		// const kiosk = await db.kiosk.update({
		// 	where: { id: data.id },
		// 	data: { name: data.name.trim() }
		// })

		revalidatePath("/")
		// return { success: true, data: kiosk }
		return { success: true }
	})

export const deleteKiosk = guard
	.roles(["ADMIN"])
	.schema<{ id: string }>()
	.action(async ({ id }) => {
		if (!id) {
			throw new Error("Kiosk ID is required")
		}

		// await db.kiosk.delete({
		// 	where: { id }
		// })

		revalidatePath("/")
		return { success: true }
	})

export const getKiosksByProject = guard
	.roles(["ADMIN"])
	.schema(getKiosksByProjectSchema)
	.action(async ({ projectId: _project_id }) => {
		// const kiosks = await db.kiosk.findMany({
		// 	where: {
		// 		project_id: data.projectId
		// 	},
		// 	include: {
		// 		Maintenance: {
		// 			orderBy: { scheduledDate: "desc" },
		// 			take: 1,
		// 			select: {
		// 				status: true
		// 			}
		// 		},
		// 		ootd: {
		// 			orderBy: { schedule: "desc" },
		// 			take: 1,
		// 			include: {
		// 				user: {
		// 					select: {
		// 						name: true
		// 					}
		// 				}
		// 			}
		// 		},
		// 		project: {
		// 			select: {
		// 				location: true
		// 			}
		// 		}
		// 	}
		// })
		// return kiosks.map((kiosk) => ({
		// 	id: kiosk.id,
		// 	name: kiosk.name,
		// 	location: kiosk.project.location,
		// 	status: kiosk.Maintenance[0]?.status ?? "ACTIVE",
		// 	ootd: kiosk.ootd[0]?.user?.name ?? null
		// }))
	})
