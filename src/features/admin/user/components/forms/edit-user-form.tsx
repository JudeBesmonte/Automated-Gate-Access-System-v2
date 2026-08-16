"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { UserRole } from "@prisma/client"
import { useForm } from "react-hook-form"

import { Button } from "@/core/components/ui/button"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from "@/core/components/ui/form"
import { Input } from "@/core/components/ui/input"
import { InputPassword } from "@/core/components/ui/input-password"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from "@/core/components/ui/select"

import { useEditUser } from "@/features/admin/user/lib/hooks"
import type { GetUserResponse } from "@/features/admin/user/server/types"
import {
	editUserSchema,
	type EditUserSchema
} from "@/features/admin/user/server/validations"

type EditUserFormProps = {
	user: GetUserResponse
	setOpen: (open: boolean) => void
}

export const EditUserForm = ({ user, setOpen }: EditUserFormProps) => {
	const { mutate, isPending } = useEditUser()

	const form = useForm<EditUserSchema>({
		resolver: zodResolver(editUserSchema),
		defaultValues: {
			id: user.id,
			name: user.name ?? "",
			email: user.email ?? "",
			role: user.role,
			password: "",
			confirmPassword: ""
		}
	})

	const onSubmit = (data: EditUserSchema) => {
		setOpen(false)
		mutate(data)
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				<div className="flex gap-4">
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem className="flex-grow">
								<FormLabel className="text-foreground">Name</FormLabel>
								<FormControl>
									<Input type="text" placeholder="Juan Dela Cruz" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="role"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Role</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger className="min-w-32">
											<SelectValue placeholder="Select a role" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{Object.values(UserRole).map((role) => (
											<SelectItem key={role} value={role}>
												{role.toLowerCase()}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input {...field} type="email" />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>New Password (optional)</FormLabel>
							<FormControl>
								<InputPassword placeholder="••••••••••" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="confirmPassword"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-foreground">
								Confirm Password
							</FormLabel>
							<FormControl>
								<InputPassword placeholder="••••••••••" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type="submit" disabled={isPending}>
					{isPending ? "Updating..." : "Update User"}
				</Button>
			</form>
		</Form>
	)
}
