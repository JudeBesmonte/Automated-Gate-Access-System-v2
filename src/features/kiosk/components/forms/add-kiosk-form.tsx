"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/core/components/ui/button"
import { DialogFooter } from "@/core/components/ui/dialog"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from "@/core/components/ui/form"
import { Input } from "@/core/components/ui/input"
import { LoadingIcon } from "@/core/lib/icons"

import { useAddKiosk } from "@/features/kiosk/lib/hooks"
import {
	addKioskSchema,
	type AddKioskSchema
} from "@/features/kiosk/server/types"

interface AddKioskFormProps {
	projectId: string
	onSuccess?: () => void
}

export const AddKioskForm = ({ projectId, onSuccess }: AddKioskFormProps) => {
	const form = useForm<AddKioskSchema>({
		resolver: zodResolver(addKioskSchema),
		defaultValues: {
			name: "",
			project_id: projectId
		}
	})

	const { mutate, isPending } = useAddKiosk()

	const onSubmit = (data: AddKioskSchema) => {
		mutate(data, {
			onSuccess: () => {
				form.reset()
				onSuccess?.()
			}
		})
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input {...field} placeholder="Enter kiosk name" />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<DialogFooter>
					<Button type="submit" disabled={isPending}>
						{isPending && <LoadingIcon className="animate-spin" />}
						{isPending ? "Loading..." : "Create Kiosk"}
					</Button>
				</DialogFooter>
			</form>
		</Form>
	)
}
