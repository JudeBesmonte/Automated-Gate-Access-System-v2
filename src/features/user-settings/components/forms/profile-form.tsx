"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { ButtonLoading } from "@/core/components/button-loading"
import {
	Avatar,
	AvatarFallback,
	AvatarImage
} from "@/core/components/ui/avatar"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from "@/core/components/ui/form"
import { Input } from "@/core/components/ui/input"

import { useAuthSession } from "@/features/auth/lib/hooks"
// import { cn } from "@/core/lib/utils"
import { ImageCropper } from "@/features/user-settings/components/image-cropper"
import { useEditUserProfile } from "@/features/user-settings/lib/hooks"
import {
	editUserProfileSchema,
	type EditUserProfileSchema
} from "@/features/user-settings/server/types"

export const ProfileForm = () => {
	const { data: session } = useAuthSession()
	const { mutate: updateUser, isPending } = useEditUserProfile()
	const [isImageCropperOpen, setIsImageCropperOpen] = useState(false)
	const [selectedImage, setSelectedImage] = useState<string | null>(null)

	const form = useForm<EditUserProfileSchema>({
		resolver: zodResolver(editUserProfileSchema),
		values: {
			name: session?.user?.name ?? "",
			image: session?.user?.image ?? "",
			file: undefined
		}
	})

	const onSubmit = async (data: EditUserProfileSchema) => updateUser(data)

	const currentImage =
		form.watch("image") ?? "/placeholder.svg?height=100&width=100"

	const userInitials =
		session?.user?.name
			?.split(" ")
			.map((name) => name[0])
			.join("") ?? "?"

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (file) {
			const reader = new FileReader()
			reader.onload = () => {
				setSelectedImage(reader.result as string)
				setIsImageCropperOpen(true)
			}
			reader.readAsDataURL(file)
		}
	}

	const handleCropComplete = async (croppedImage: string) => {
		try {
			form.setValue("image", croppedImage, { shouldDirty: true })
			// Convert base64 to file
			const response = await fetch(croppedImage)
			const blob = await response.blob()
			const file = new File([blob], "profile-image.jpg", { type: "image/jpeg" })
			form.setValue("file", file)
		} catch (error) {
			console.error("Error processing cropped image:", error)
			// You might want to add error handling here, such as showing a toast notification
		}
	}

	return (
		<Form {...form}>
			<form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
				<FormField
					control={form.control}
					name="image"
					render={({
						field: { onChange: _onChange, value: _value, ...field }
					}) => (
						<FormItem className="flex flex-col items-center">
							<div className="relative space-y-2">
								<FormLabel className="sr-only">Profile Picture</FormLabel>
								<div
									className="cursor-pointer"
									onClick={() =>
										document.getElementById("avatar-upload")?.click()
									}
								>
									<Avatar className="size-32 hover:opacity-90">
										<AvatarImage src={currentImage} alt="Profile picture" />
										<AvatarFallback className="text-2xl">
											{userInitials}
										</AvatarFallback>
									</Avatar>
								</div>
								<FormControl>
									<Input
										id="avatar-upload"
										type="file"
										accept="image/*"
										className="hidden"
										disabled={isPending}
										onChange={handleFileChange}
										{...field}
									/>
								</FormControl>
							</div>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="font-medium text-card-foreground">
								Name
							</FormLabel>
							<FormControl>
								<Input
									placeholder="Enter your name"
									disabled={isPending}
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<ButtonLoading
					type="submit"
					className="w-full"
					isLoading={isPending}
					disabled={isPending}
				>
					Save Changes
				</ButtonLoading>

				{selectedImage && (
					<ImageCropper
						imageUrl={selectedImage}
						isOpen={isImageCropperOpen}
						onClose={() => setIsImageCropperOpen(false)}
						onCropComplete={handleCropComplete}
					/>
				)}
			</form>
		</Form>
	)
}
