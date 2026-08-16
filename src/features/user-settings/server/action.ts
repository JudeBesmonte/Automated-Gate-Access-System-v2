"use server"

import { compare, hash } from "bcryptjs"

import { update } from "@/services/authjs/auth"

import { guard } from "@/core/lib/auth-guard"
import { catchErr } from "@/core/lib/errors"
import { db } from "@/core/server/db"
import { getSupabaseClient } from "@/core/server/supabase"

import {
	editUserEmailSchema,
	editUserPasswordSchema,
	editUserProfileSchema
} from "@/features/user-settings/server/types"

export const editUserProfile = guard
	.schema(editUserProfileSchema)
	.action(async ({ session, name, image, file }) => {
		console.log("\n\n\ndata:", { name, image, file })

		if (session?.user.image) {
			const existingFilePath = extractFilePathFromUrl(session.user.image)
			const supabase = await getSupabaseClient()

			if (existingFilePath) {
				const { error: deleteError } = await supabase.storage
					.from("avatar")
					.remove([existingFilePath])

				if (deleteError) {
					console.error("Failed to delete existing profile image:", deleteError)
				}
			}
		}

		// Step 2: Upload the new file to Supabase Storage
		const fileName = `${Date.now()}-${file?.name}` // Create unique file name
		const supabase = await getSupabaseClient()
		const { data: uploadData, error: uploadError } = await supabase.storage
			.from("avatar") // Bucket name
			.upload(`${session?.user.id}/${fileName}`, file!, {
				cacheControl: "3600",
				upsert: true
			})

		if (uploadError) {
			console.error("Failed to upload profile image:", uploadError)
			throw new Error("Failed to upload profile image.")
		}

		// Step 3: Get public URL of the uploaded file
		const { data: publicUrlData } = supabase.storage
			.from("avatar")
			.getPublicUrl(uploadData.path)

		const imageUrl = publicUrlData.publicUrl

		const [, updateError] = await catchErr(
			db.user.update({
				where: { id: session?.user.id },
				data: { name, image: imageUrl }
			})
		)
		if (updateError) throw updateError

		console.log({ user: { name, image: imageUrl } })
		await update({ user: { name, image: imageUrl } })

		return { success: "User updated successfully" }
	})

export const editUserEmail = guard
	.schema(editUserEmailSchema)
	.action(async ({ session, email }) => {
		const [, updateError] = await catchErr(
			db.user.update({
				where: { id: session?.user.id },
				data: { email }
			})
		)
		if (updateError) throw updateError
		await update({ user: { email } })

		return { success: "User email updated successfully" }
	})

export const editUserPassword = guard
	.schema(editUserPasswordSchema)
	.action(async ({ session, oldPassword, newPassword }) => {
		const existingUser = await db.user.findUnique({
			where: { id: session?.user.id },
			select: { password: true }
		})

		const isCurrentPasswordValid = await compare(
			oldPassword!,
			existingUser?.password ?? ""
		)

		if (!isCurrentPasswordValid) {
			throw new Error("Current password is incorrect")
		}

		const hashedPassword = await hash(newPassword!, 10)

		const [, updateError] = await catchErr(
			db.user.update({
				where: { id: session?.user.id },
				data: { password: hashedPassword }
			})
		)

		if (updateError) throw updateError

		return { success: "User password updated successfully" }
	})

// Helper function to extract the file path from a URL
const extractFilePathFromUrl = (url: string): string | null => {
	try {
		const urlObject = new URL(url)
		const pathSegments = urlObject.pathname.split("/").filter(Boolean)

		// Find the index of the bucket name "avatar" in the path
		const bucketIndex = pathSegments.findIndex(
			(segment) => segment === "avatar"
		)

		if (bucketIndex !== -1 && bucketIndex + 1 < pathSegments.length) {
			// Return everything after the bucket name
			return pathSegments.slice(bucketIndex + 1).join("/")
		}

		return null
	} catch (error) {
		console.error("Failed to extract file path from URL:", error)
		return null
	}
}
