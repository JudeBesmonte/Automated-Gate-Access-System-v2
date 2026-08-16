import { useCallback } from "react"
import { toast } from "sonner"

export function useImageUpload() {
	const handleImageChange = useCallback(
		(
			file: File | undefined,
			onChange: (value: string) => void,
			onFileChange: (file: File | undefined) => void,
			previousUrl?: string
		) => {
			// Cleanup previous blob URL
			if (previousUrl?.startsWith("blob:")) {
				URL.revokeObjectURL(previousUrl)
			}

			if (!file) {
				onChange("")
				onFileChange(undefined)
				return
			}

			// Validate file type
			if (!file.type.startsWith("image/")) {
				toast.error("Please upload an image file")
				return
			}

			// Validate file size (5MB limit)
			if (file.size > 5 * 1024 * 1024) {
				toast.error("Image size should be less than 5MB")
				return
			}

			const newPreviewUrl = URL.createObjectURL(file)
			onChange(newPreviewUrl)
			onFileChange(file)
		},
		[]
	)

	return {
		handleImageChange
	}
}
