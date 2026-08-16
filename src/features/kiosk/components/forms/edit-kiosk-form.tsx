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

import { useEditKiosk } from "@/features/kiosk/lib/hooks"
import {
	editKioskSchema,
	type EditKioskSchema
} from "@/features/kiosk/server/types"

interface EditKioskFormProps {
	kioskId: string
	onSuccess?: () => void
}

export const EditKioskForm = ({ kioskId, onSuccess }: EditKioskFormProps) => {
	const form = useForm<EditKioskSchema>({
		resolver: zodResolver(editKioskSchema),
		defaultValues: {
			id: kioskId,
			name: ""
		}
	})

	const { mutate, isPending } = useEditKiosk()

	const onSubmit = (data: EditKioskSchema) => {
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
						{isPending ? "Loading..." : "Update Kiosk"}
					</Button>
				</DialogFooter>
			</form>
		</Form>
	)
}
