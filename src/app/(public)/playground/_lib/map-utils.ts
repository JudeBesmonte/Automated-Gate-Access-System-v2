/**
 * Extracts a specific address component from Google Maps geocoding results
 */
export const getAddressComponent = (
	components: google.maps.GeocoderAddressComponent[],
	types: string[]
) => {
	const component = components.find((comp) =>
		types.some((type) => comp.types.includes(type))
	)
	return component?.long_name ?? ""
}

/**
 * Parses Google Maps address components into a structured format
 */
export const parseAddressComponents = (
	components: google.maps.GeocoderAddressComponent[]
) => ({
	country: getAddressComponent(components, ["country"]),
	region: getAddressComponent(components, ["administrative_area_level_1"]),
	state: getAddressComponent(components, ["administrative_area_level_2"]),
	city: getAddressComponent(components, [
		"locality",
		"administrative_area_level_3"
	]),
	barangay: getAddressComponent(components, [
		"sublocality",
		"sublocality_level_1"
	]),
	postalCode: getAddressComponent(components, ["postal_code"])
})

/**
 * Performs reverse geocoding to get address components from coordinates
 */
export const reverseGeocode = async (latLng: google.maps.LatLngLiteral) => {
	const geocoder = new google.maps.Geocoder()
	const response = await geocoder.geocode({ location: latLng })

	if (response.results && response.results.length > 0) {
		const result = response.results[0]
		const components = result?.address_components ?? []
		return parseAddressComponents(components)
	}

	return null
}
