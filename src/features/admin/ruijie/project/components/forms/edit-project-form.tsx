"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from "@/core/components/ui/form"
import { Input } from "@/core/components/ui/input"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from "@/core/components/ui/select"
import { Textarea } from "@/core/components/ui/textarea"

import {
	editProjectSchema,
	type EditProjectSchema
} from "@/features/admin/ruijie/project/server/validations"

type EditProjectFormProps = {
	project: EditProjectSchema
	onSuccess?: () => void
}

export const EditProjectForm = ({
	project,
	onSuccess
}: EditProjectFormProps) => {
	const form = useForm<EditProjectSchema>({
		resolver: zodResolver(editProjectSchema),
		defaultValues: {
			id: project.id,
			name: project.name,
			description: project.description ?? "",
			imageUrl: project.imageUrl ?? "",
			type: project.type,
			location: project.location ?? ""
		}
	})

	const onSubmit = (data: EditProjectSchema) => {
		onSuccess?.()
		console.log("mutate edit project form", data)
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="font-medium text-card-foreground">
								Name
							</FormLabel>
							<FormControl>
								<Input autoComplete="off" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="description"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="font-medium text-card-foreground">
								Description
							</FormLabel>
							<FormControl>
								<Textarea {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="imageUrl"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="font-medium text-card-foreground">
								Image URL
							</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="type"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="font-medium text-card-foreground">
								Type
							</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder="Select type" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									<SelectItem value="RESIDENTIAL">Residential</SelectItem>
									<SelectItem value="VOUCHER">Voucher</SelectItem>
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="location"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="font-medium text-card-foreground">
								Location
							</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</form>
		</Form>
	)
}
