"use client"

import { useCallback, useState } from "react"
import type { UseFormReturn } from "react-hook-form"
import { toast } from "sonner"

import { validateLocationCoordinates } from "@/features/client/subscribe/lib/allowed-locations"
import { reverseGeocode } from "@/features/client/subscribe/lib/map-utils"
import type { LocationSchema } from "@/features/client/subscribe/server/validations"

/**
 * Custom hook for managing map location state and form updates
 */
export const useMapLocation = ({
	form
}: {
	form: UseFormReturn<LocationSchema>
}) => {
	const [selectedLocation, setSelectedLocation] =
		useState<google.maps.LatLngLiteral>()
	const [isLocationValid, setIsLocationValid] = useState<boolean | null>(null)

	/**
	 * Updates form fields with location data from address components
	 */
	const updateFormWithLocationData = useCallback(
		(latLng: google.maps.LatLngLiteral, loc: LocationSchema) => {
			form.setValue("country", loc.country ?? "")
			form.setValue("region", loc.region ?? "")
			form.setValue("state", loc.state ?? "")
			form.setValue("city", loc.city ?? "")
			form.setValue("barangay", loc.barangay ?? "")
			form.setValue("postalCode", loc.postalCode ?? "")
			form.setValue("latitude", latLng.lat)
			form.setValue("longitude", latLng.lng)
		},
		[form]
	)

	/**
	 * Handles location updates from map interactions with validation
	 */
	const handleLocationUpdate = useCallback(
		async (latLng: google.maps.LatLngLiteral) => {
			// Always show the marker immediately for visual feedback
			setSelectedLocation(latLng)

			// Use toast.promise for elegant loading/success/error handling
			const validationPromise = validateLocationCoordinates(latLng)

			toast.promise(validationPromise, {
				loading: "Validating location...",
				success: (result) => {
					if (result.isValid) {
						setIsLocationValid(true)
						return "Location confirmed! 📍"
					}
					return "Validation completed"
				},
				error: "Failed to validate location"
			})

			try {
				const validation = await validationPromise

				if (!validation.isValid) {
					setIsLocationValid(false)
					toast.error(
						validation.error ?? "Service not available in this area",
						{
							description: "Please select a location within our service areas",
							action: {
								label: "View Areas",
								onClick: () => {
									toast.info("Service Areas", {
										description:
											"Philippines (Bicol Region, Metro Manila, Calabarzon) and United States (California, New York)"
									})
								}
							}
						}
					)
					return
				}

				// Location is valid, proceed with normal flow
				setIsLocationValid(true)

				const addressComponents = await reverseGeocode(latLng)

				if (addressComponents) {
					updateFormWithLocationData(latLng, {
						...addressComponents,
						latitude: latLng.lat,
						longitude: latLng.lng
					})
				}
			} catch {
				setIsLocationValid(false)
				setSelectedLocation(latLng)
			}
		},
		[updateFormWithLocationData]
	)

	/**
	 * Clears the selected location and resets the form
	 */
	const clearLocation = useCallback(() => {
		setSelectedLocation(undefined)
		setIsLocationValid(null)
		form.reset()
	}, [form])

	return {
		selectedLocation,
		handleLocationUpdate,
		clearLocation,
		isLocationValid
	}
}
