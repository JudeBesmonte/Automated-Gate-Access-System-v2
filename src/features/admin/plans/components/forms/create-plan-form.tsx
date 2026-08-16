"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/core/components/ui/button"
import {
	Form,
	FormControl,
	FormDescription,
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
import { Switch } from "@/core/components/ui/switch"
import { TextareaArray } from "@/core/components/ui/textarea-array"
import { LoadingIcon } from "@/core/lib/icons"

import { useCreatePlan } from "@/features/admin/plans/lib/hooks"
import {
	createPlanSchema,
	type CreatePlanSchema
} from "@/features/admin/plans/server/validations"

export const CreatePlanForm = ({ onSuccess }: { onSuccess?: () => void }) => {
	const { mutate, isPending } = useCreatePlan()

	const form = useForm({
		resolver: zodResolver(createPlanSchema),
		defaultValues: {
			planType: "EDUCATION",
			name: "",
			slug: "",
			monthlyPrice: 0,
			features: [],
			inclusions: [],
			addons: [],
			equipment: [],
			hasKiosk: false,
			isActive: true
		}
	})

	const handleSubmit = form.handleSubmit((values: CreatePlanSchema) => {
		mutate(values, {
			onSuccess: () => {
				form.reset()
				onSuccess?.()
			},
			onError: (error) => {
				form.setError("slug", {
					type: "unique",
					message: error.message
				})
			}
		})
	})

	return (
		<Form {...form}>
			<form onSubmit={handleSubmit} className="space-y-6">
				<div className="grid grid-cols-2 gap-4">
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Plan Name</FormLabel>
								<FormControl>
									<Input
										placeholder="e.g. Basic, Premium, Enterprise"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="slug"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Slug</FormLabel>
								<FormControl>
									<Input
										placeholder="e.g. basic-plan"
										{...field}
										aria-invalid={!!form.formState.errors.slug}
									/>
								</FormControl>
								<FormMessage>{form.formState.errors.slug?.message}</FormMessage>
							</FormItem>
						)}
					/>
				</div>

				<div className="grid grid-cols-2 gap-4">
					<FormField
						control={form.control}
						name="planType"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Plan Type</FormLabel>
								<Select onValueChange={field.onChange} value={field.value}>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Select a plan type" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value="EDUCATION">Education</SelectItem>
										<SelectItem value="GOVERNMENT">Government</SelectItem>
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="monthlyPrice"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Monthly Price</FormLabel>
								<FormControl>
									<div className="relative">
										<span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
											₱
										</span>
										<Input
											type="number"
											inputMode="numeric"
											pattern="[0-9]*\.?[0-9]*"
											className="pl-8"
											{...field}
										/>
									</div>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<div className="grid grid-cols-2 gap-4">
					<FormField
						control={form.control}
						name="hasKiosk"
						render={({ field }) => (
							<FormItem>
								<div className="flex items-center justify-between gap-2 rounded-lg border border-input p-3 shadow-sm">
									<div className="space-y-0.5">
										<FormLabel>Has Kiosk</FormLabel>
										<FormDescription>
											Enable kiosk feature for this plan
										</FormDescription>
									</div>
									<FormControl>
										<Switch
											checked={field.value}
											onCheckedChange={field.onChange}
										/>
									</FormControl>
								</div>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="isActive"
						render={({ field }) => (
							<FormItem>
								<div className="flex items-center justify-between gap-2 rounded-lg border border-input p-3 shadow-sm">
									<div className="space-y-0.5">
										<FormLabel>Active Plan</FormLabel>
										<FormDescription>
											Make this plan available for subscription
										</FormDescription>
									</div>
									<FormControl>
										<Switch
											checked={field.value}
											onCheckedChange={field.onChange}
										/>
									</FormControl>
								</div>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<FormField
					control={form.control}
					name="features"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Features</FormLabel>
							<FormControl>
								<TextareaArray
									placeholder="Enter features, one per line"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className="flex justify-end gap-3">
					<Button
						type="button"
						variant="outline"
						onClick={() => {
							form.reset()
							onSuccess?.()
						}}
					>
						Cancel
					</Button>
					<Button type="submit" disabled={isPending}>
						{isPending && <LoadingIcon className="animate-spin" />}
						{isPending ? "Loading..." : "Save Plan"}
					</Button>
				</div>
			</form>
		</Form>
	)
}
