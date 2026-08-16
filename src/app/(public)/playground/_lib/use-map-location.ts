import { useState } from "react"
import { type UseFormReturn } from "react-hook-form"

import { reverseGeocode } from "./map-utils"
import { type AddressComponents, type LocationFormData } from "./types"

/**
 * Custom hook for managing map location state and form updates
 */
export const useMapLocation = ({
	form
}: {
	form: UseFormReturn<LocationFormData>
}) => {
	const [selectedLocation, setSelectedLocation] =
		useState<google.maps.LatLngLiteral>()

	/**
	 * Updates form fields with location data from address components
	 */
	const updateFormWithLocationData = (
		latLng: google.maps.LatLngLiteral,
		addressComponents: AddressComponents
	) => {
		form.setValue("country", addressComponents.country)
		form.setValue("region", addressComponents.region)
		form.setValue("state", addressComponents.state)
		form.setValue("city", addressComponents.city)
		form.setValue("barangay", addressComponents.barangay)
		form.setValue("postalCode", addressComponents.postalCode)
		form.setValue("latitude", latLng.lat)
		form.setValue("longitude", latLng.lng)
	}

	/**
	 * Handles location updates from map interactions
	 */
	const handleLocationUpdate = async (latLng: google.maps.LatLngLiteral) => {
		setSelectedLocation(latLng)

		const addressComponents = await reverseGeocode(latLng)

		if (addressComponents) {
			updateFormWithLocationData(latLng, addressComponents)
		}
	}

	/**
	 * Clears the selected location and resets the form
	 */
	const clearLocation = () => {
		setSelectedLocation(undefined)
		form.reset()
	}

	return { selectedLocation, handleLocationUpdate, clearLocation }
}
