import { number, object, string, z } from "zod"

export const getClientSearchParamsSchema = object({
	page: number().default(1),
	perPage: number().default(10),
	sort: z
		.array(
			z.object({
				id: z.enum(["name", "email", "createdAt", "updatedAt"]),
				desc: z.boolean()
			})
		)
		.default([]),
	name: string().optional(),
	email: string().optional(),
	role: string().optional(),
	createdAt: z
		.object({
			from: z.coerce.date().optional(),
			to: z.coerce.date().optional()
		})
		.optional(),
	updatedAt: z
		.object({
			from: z.coerce.date().optional(),
			to: z.coerce.date().optional()
		})
		.optional()
})

export type GetClientSearchParams = z.infer<typeof getClientSearchParamsSchema>
