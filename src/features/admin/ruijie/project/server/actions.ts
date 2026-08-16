"use server"

import type { Prisma } from "@prisma/client"

import { guard } from "@/core/lib/auth-guard"
import { dateRangeFilter } from "@/core/lib/utils"
import { db } from "@/core/server/db"
import { getSupabaseClient } from "@/core/server/supabase"

import type { ProjectSearchParams } from "@/features/admin/ruijie/project/lib/search-params"

export const getProject = guard
	.roles(["ADMIN"])
	.schema<{ projectId: string }>()
	.action(async ({ projectId }) => {
		const project = await db.project.findUnique({
			where: { id: projectId }
		})
		return project
	})

export const getProjects = guard
	.schema<ProjectSearchParams>()
	.roles(["ADMIN"])
	.action(async ({ page, perPage, sort, name, createdAt, updatedAt }) => {
		const where: Prisma.ProjectWhereInput = {
			...(name && { name: { contains: name, mode: "insensitive" } }),
			...(createdAt && { createdAt: dateRangeFilter([createdAt, createdAt]) }),
			...(updatedAt && { updatedAt: dateRangeFilter([updatedAt, updatedAt]) })
		}

		const orderBy: Prisma.ProjectOrderByWithRelationInput[] = sort?.length
			? sort.map(({ id, desc }) => ({
				...(id === "voucherGroupsCount" && {
					voucherGroups: { _count: desc ? "desc" : "asc" }
				}),
				...(id === "vouchersCount" && {
					vouchers: { _count: desc ? "desc" : "asc" }
				}),
				...(id !== "voucherGroupsCount" &&
					id !== "vouchersCount" && { [id]: desc ? "desc" : "asc" })
			}))
			: [{ createdAt: "desc" }]

		const [projects, total] = await Promise.all([
			db.project
				.findMany({
					skip: page && perPage ? (page - 1) * perPage : undefined,
					take: perPage,
					where,
					orderBy,
					include: {
						_count: { select: { voucherGroups: true, vouchers: true } }
					}
				})
				.then((projects) =>
					projects.map((project) => ({
						...project,
						voucherGroupsCount: project._count.voucherGroups,
						vouchersCount: project._count.vouchers
					}))
				),
			db.project.count({ where })
		])

		return { projects, pageCount: Math.ceil(total / perPage) }
	})

export const updateProjectImage = guard
	.roles(["ADMIN"])
	.schema<{ projectId: string; file: File }>()
	.action(async ({ file, projectId }) => {
		try {
			// Step 1: Check if the project already has an image
			const existingProject = await db.project.findUnique({
				where: { id: projectId }
			})

			if (existingProject?.image) {
				// Extract the file path from the existing image URL
				const existingFilePath = extractFilePathFromUrl(existingProject.image)

				if (existingFilePath) {
					// Delete the existing file from Supabase Storage
					const supabase = await getSupabaseClient()
					const { error: deleteError } = await supabase.storage
						.from("project-image")
						.remove([existingFilePath])

					if (deleteError) {
						console.error("Failed to delete existing image:", deleteError)
						throw new Error("Failed to delete existing image.")
					}
				}
			}

			// Step 2: Upload the new file to Supabase Storage
			const fileName = `${Date.now()}-${file.name}` // Unique file name
			const supabase = await getSupabaseClient()
			const { data: uploadData, error: uploadError } = await supabase.storage
				.from("project-image") // Bucket name
				.upload(`${projectId}/${fileName}`, file, {
					cacheControl: "3600",
					upsert: true // Overwrite if file already exists
				})

			if (uploadError) {
				console.error("Failed to upload file:", uploadError)
				throw new Error("Failed to upload file.")
			}

			console.log("Upload data:", uploadData)

			// Step 3: Get public URL of the uploaded file
			const { data: publicUrlData } = supabase.storage
				.from("project-image")
				.getPublicUrl(uploadData.path)

			const imageUrl = publicUrlData.publicUrl

			console.log("Generated image URL:", imageUrl)

			// Step 4: Update the project's image column in the database
			await db.project.update({
				where: { id: projectId },
				data: { image: imageUrl }
			})
		} catch (error) {
			console.error("Error updating project image:", error)
			throw new Error("Failed to update project image.")
		}
	})

// Helper function to extract the file path from a URL
const extractFilePathFromUrl = (url: string): string | null => {
	try {
		const urlObject = new URL(url)
		const pathSegments = urlObject.pathname.split("/").filter(Boolean)
		return pathSegments.slice(2).join("/") // Adjust based on your bucket structure
	} catch (error) {
		console.error("Failed to extract file path from URL:", error)
		return null
	}
}
