"use client"

import Image from "next/image"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { ButtonLoading } from "@/core/components/button-loading"
import {
	Card,
	CardContent,
	CardDescription,
	CardTitle
} from "@/core/components/ui/card"
import { Checkbox } from "@/core/components/ui/checkbox"
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

import { useSignIn } from "@/features/auth/lib/hooks"
import { signInSchema, type SignInSchema } from "@/features/auth/server/types"

export const SignInForm = () => {
	const form = useForm<SignInSchema>({
		resolver: zodResolver(signInSchema),
		defaultValues: {
			email: "",
			password: "",
			rememberMe: false
		}
	})

	const { mutate: signIn, isPending } = useSignIn()
	const onSubmit = (values: SignInSchema) => signIn(values)

	return (
		<div className="flex flex-col gap-6">
			<Card className="overflow-hidden">
				<CardContent className="grid min-h-[32rem] p-0 md:grid-cols-2">
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="flex h-full flex-col p-6 pt-4 md:p-8 md:pt-4"
						>
							<div className="flex flex-1 flex-col gap-4">
								<div className="relative mx-auto flex h-16 w-32 items-center">
									<Image
										src="/assets/branding/qbyfi-watermark.png"
										alt="qbyfi watermark"
										fill
										priority
										className="object-contain"
									/>
								</div>
								<div className="flex flex-col items-center text-center">
									<CardTitle className="text-lg font-bold">Sign in</CardTitle>
									<CardDescription className="text-balance">
										Sign in to your qbyfi account
									</CardDescription>
								</div>

								<FormField
									control={form.control}
									name="email"
									render={({ field }) => (
										<FormItem>
											<FormLabel className="text-foreground">Email</FormLabel>
											<FormControl>
												<Input
													type="email"
													autoComplete="email"
													placeholder="sample@email.com"
													{...field}
												/>
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
											<FormLabel className="text-foreground">
												Password
											</FormLabel>
											<FormControl>
												<InputPassword
													autoComplete="current-password"
													placeholder="••••••••••"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="rememberMe"
									render={({ field }) => (
										<FormItem className="flex flex-row items-start space-x-3 space-y-0">
											<FormControl>
												<Checkbox
													checked={field.value}
													onCheckedChange={field.onChange}
												/>
											</FormControl>
											<div className="space-y-1 leading-none">
												<FormLabel>Remember me</FormLabel>
											</div>
										</FormItem>
									)}
								/>

								<ButtonLoading
									isLoading={isPending}
									type="submit"
									className="w-full"
								>
									Sign in
								</ButtonLoading>

								<div className="mt-auto text-center text-sm">
									<Link
										href="sign-up"
										className="text-primary underline underline-offset-4"
									>
										Create an account
									</Link>
								</div>
							</div>
						</form>
					</Form>
					<div className="relative hidden bg-muted md:block">
						<Image
							src="/assets/images/image-01.jpg"
							alt="Image"
							className="absolute inset-0 h-full w-full object-cover"
							fill
							priority
						/>
						<Image
							src="/assets/branding/qbyfi-mascot-with-phone.png"
							alt="Foxy"
							className="absolute bottom-0 left-1/2 mb-4 -translate-x-1/2 transform"
							width={512}
							height={512}
							priority
						/>
					</div>
				</CardContent>
			</Card>
			<div className="text-balance text-center text-xs text-muted-foreground/60 [&_a]:text-muted-foreground [&_a]:underline-offset-4 hover:[&_a]:text-primary">
				By signing in, you agree to our <Link href="#">Terms of Service</Link>{" "}
				and <Link href="#">Privacy Policy</Link>.
			</div>
		</div>
	)
}
