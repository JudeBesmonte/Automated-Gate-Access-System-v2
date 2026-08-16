import { z } from "zod"

import {
	PaymentStatus,
	PaymentType
} from "@/features/payment-history/server/types"

export const paymentSearchParamsSchema = z.object({
	page: z.number().positive().default(1),
	perPage: z.number().positive().default(10),
	sort: z
		.array(
			z.object({
				id: z.string(),
				desc: z.boolean()
			})
		)
		.optional(),
	name: z.string().optional(),
	email: z.string().optional(),
	type: z.array(z.nativeEnum(PaymentType)).optional(),
	status: z.array(z.nativeEnum(PaymentStatus)).optional(),
	date: z.tuple([z.date().nullable(), z.date().nullable()]).optional()
})

export type PaymentsSearchParams = z.infer<typeof paymentSearchParamsSchema>
