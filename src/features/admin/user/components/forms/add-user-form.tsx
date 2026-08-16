"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { UserRole } from "@prisma/client"
import { useForm } from "react-hook-form"

import { ButtonLoading } from "@/core/components/button-loading"
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
import { InputPassword } from "@/core/components/ui/input-password"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from "@/core/components/ui/select"

import { useAddUser } from "@/features/admin/user/lib/hooks"
import {
	createUserSchema,
	type CreateUserSchema
} from "@/features/admin/user/server/validations"

export const AddUserForm = ({
	setOpen
}: {
	setOpen: (open: boolean) => void
}) => {
	const { mutate: addUser, isPending } = useAddUser()

	const form = useForm<CreateUserSchema>({
		resolver: zodResolver(createUserSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
			confirmPassword: "",
			role: "STAFF"
		}
	})

	const onSubmit = (data: CreateUserSchema) => {
		setOpen(false)
		addUser(data, {
			onSuccess: () => {
				form.reset()
			}
		})
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-col gap-4"
			>
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
							<FormLabel className="text-foreground">Email</FormLabel>
							<FormControl>
								<Input type="email" placeholder="sample@email.com" {...field} />
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
							<FormLabel className="text-foreground">Password</FormLabel>
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

				<DialogFooter>
					<Button
						type="button"
						variant="outline"
						onClick={() => {
							form.reset()
							setOpen(false)
						}}
					>
						Cancel
					</Button>
					<ButtonLoading isLoading={isPending} type="submit">
						Create User
					</ButtonLoading>
				</DialogFooter>
			</form>
		</Form>
	)
}
