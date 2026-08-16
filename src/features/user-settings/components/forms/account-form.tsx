"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { ButtonLoading } from "@/core/components/button-loading"
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

import { useAuthSession } from "@/features/auth/lib/hooks"
import {
	useEditUserEmail,
	useEditUserPassword
} from "@/features/user-settings/lib/hooks"
import {
	editUserAccountSchema,
	type EditUserAccountSchema
} from "@/features/user-settings/server/types"

export const AccountForm = () => {
	const { data: session } = useAuthSession()
	const { mutate: editUserEmail, isPending: isEmailPending } =
		useEditUserEmail()
	const { mutate: editUserPassword, isPending: isPasswordPending } =
		useEditUserPassword()

	const form = useForm<EditUserAccountSchema>({
		resolver: zodResolver(editUserAccountSchema),
		values: {
			email: session?.user?.email ?? "",
			oldPassword: "",
			newPassword: "",
			confirmNewPassword: ""
		}
	})

	const onSubmit = async (data: EditUserAccountSchema) => {
		const resetPasswords = () =>
			form.reset({
				...form.getValues(),
				oldPassword: "",
				newPassword: "",
				confirmNewPassword: ""
			})

		const promises = [
			data.email !== session?.user?.email &&
				editUserEmail({ email: data.email }, { onSuccess: resetPasswords }),
			data.oldPassword &&
				data.newPassword &&
				editUserPassword(
					{
						oldPassword: data.oldPassword,
						newPassword: data.newPassword,
						confirmNewPassword: data.confirmNewPassword
					},
					{ onSuccess: resetPasswords }
				)
		].filter(Boolean)

		await Promise.all(promises)
	}

	return (
		<Form {...form}>
			<form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="font-medium text-card-foreground">
								Email
							</FormLabel>
							<FormControl>
								<Input
									placeholder="sample@email.com"
									autoComplete="off"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="oldPassword"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-foreground">Old Password</FormLabel>
							<FormControl>
								<InputPassword placeholder="••••••••••" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="newPassword"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-foreground">New Password</FormLabel>
							<FormControl>
								<InputPassword placeholder="••••••••••" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="confirmNewPassword"
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

				<div className="flex justify-end">
					<ButtonLoading
						type="submit"
						isLoading={isEmailPending || isPasswordPending}
						disabled={
							!form.formState.isDirty ||
							form.formState.isSubmitting ||
							isEmailPending ||
							isPasswordPending
						}
					>
						{isEmailPending || isPasswordPending ? "Saving..." : "Save Changes"}
					</ButtonLoading>
				</div>
			</form>
		</Form>
	)
}
