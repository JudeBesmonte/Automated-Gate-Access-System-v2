import { z } from "zod"

// Form validation schema - single source of truth
const addressSchema = z.object({
	country: z.string().optional(),
	region: z.string().optional(),
	state: z.string().optional(),
	city: z.string().optional(),
	barangay: z.string().optional(),
	postalCode: z.string().optional()
})
export type AddressComponents = z.infer<typeof addressSchema>

export const locationSchema = z.object({
	name: z.string().min(1, "Location name is required"),
	...addressSchema.shape,
	latitude: z.number().optional(),
	longitude: z.number().optional(),
	description: z.string().optional()
})
export type LocationFormData = z.infer<typeof locationSchema>

// React Google Maps event types (matching the library's actual types)
export interface MapClickEvent {
	detail: { latLng: google.maps.LatLngLiteral | null }
}
