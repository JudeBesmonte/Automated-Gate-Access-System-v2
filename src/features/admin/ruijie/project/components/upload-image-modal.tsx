"use client"

import { useState } from "react"
import { toast } from "sonner"

import { Button } from "@/core/components/ui/button"
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from "@/core/components/ui/dialog"
import { Input } from "@/core/components/ui/input"
import { Add2Icon } from "@/core/lib/icons"
import { cn } from "@/core/lib/utils"

import { useUploadImage } from "@/features/admin/ruijie/project/lib/hooks"

interface UploadImageModalProps {
	projectId: string
}

export const UploadImageModal = ({ projectId }: UploadImageModalProps) => {
	const [file, setFile] = useState<File | null>(null)
	const [dragActive, setDragActive] = useState(false)
	const { mutate: updateProjectImage, isPending } = useUploadImage()

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFile = e.target.files?.[0] // Use optional chaining
		if (selectedFile) setFile(selectedFile) // Only set the file if it exists
	}

	const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault()
		e.stopPropagation()
		setDragActive(true)
	}

	const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault()
		e.stopPropagation()
		setDragActive(false)
	}

	const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault()
		e.stopPropagation()
		setDragActive(false)

		const droppedFile = e.dataTransfer.files?.[0]
		if (droppedFile) setFile(droppedFile)
	}

	const handleUpload = async () => {
		if (!file) toast.error("Please select an image file.")
		else updateProjectImage({ projectId, file })
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					size="icon"
					className="absolute bottom-2 right-2 size-6 rounded-full"
				>
					<Add2Icon />
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Upload Project Image</DialogTitle>
				</DialogHeader>
				<div className="space-y-4">
					<div
						className={cn(
							"cursor-pointer rounded-lg border-2 border-dashed p-4 text-center",
							dragActive ? "border-primary" : "border-muted"
						)}
						onDragEnter={handleDragEnter}
						onDragLeave={handleDragLeave}
						onDragOver={(e) => e.preventDefault()}
						onDrop={handleDrop}
					>
						<p className="text-sm text-muted-foreground">
							Drag & drop an image here, or{" "}
							<label
								htmlFor="file-upload"
								className="cursor-pointer text-primary underline"
							>
								browse your files
							</label>
						</p>
						<Input
							id="file-upload"
							type="file"
							accept="image/*"
							className="hidden"
							onChange={handleFileChange}
						/>
					</div>
					{file && (
						<div className="text-sm">
							Selected file: <strong>{file.name}</strong>
						</div>
					)}
					<Button
						disabled={!file || isPending}
						onClick={handleUpload}
						className="w-full"
					>
						{isPending ? "Uploading..." : "Upload Image"}
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	)
}
