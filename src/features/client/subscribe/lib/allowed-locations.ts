export interface AllowedLocation {
	country: string
	regions: Array<{
		region: string
		states: Array<{
			state: string
			cities: string[]
		}>
	}>
}

/**
 * Mock data for allowed locations
 * This restricts the subscription service to specific geographic areas
 */
export const ALLOWED_LOCATIONS: AllowedLocation[] = [
	{
		country: "Philippines",
		regions: [
			{
				region: "Bicol Region",
				states: [
					{
						state: "Albay",
						cities: [
							"Legazpi City",
							"Tabaco City",
							"Ligao City",
							"Guinobatan",
							"Daraga",
							"Camalig",
							"Malilipot"
						]
					},
					{
						state: "Camarines Sur",
						cities: [
							"Naga City",
							"Iriga City",
							"Pili",
							"Nabua",
							"Bula",
							"Baao",
							"Calabanga"
						]
					},
					{
						state: "Camarines Norte",
						cities: [
							"Daet",
							"Jose Panganiban",
							"Vinzons",
							"Talisay",
							"Mercedes",
							"Basud"
						]
					}
				]
			},
			{
				region: "Metro Manila",
				states: [
					{
						state: "National Capital Region",
						cities: [
							"Manila",
							"Quezon City",
							"Makati",
							"Taguig",
							"Pasig",
							"Mandaluyong",
							"San Juan",
							"Marikina",
							"Caloocan",
							"Malabon",
							"Navotas",
							"Valenzuela",
							"Las Piñas",
							"Muntinlupa",
							"Parañaque",
							"Pasay"
						]
					}
				]
			},
			{
				region: "Calabarzon",
				states: [
					{
						state: "Laguna",
						cities: [
							"Santa Rosa",
							"Biñan",
							"San Pedro",
							"Calamba",
							"Los Baños",
							"Cabuyao",
							"Sta. Cruz"
						]
					},
					{
						state: "Cavite",
						cities: [
							"Bacoor",
							"Imus",
							"Dasmariñas",
							"Carmona",
							"General Trias",
							"Trece Martires",
							"Kawit"
						]
					}
				]
			}
		]
	},
	{
		country: "United States",
		regions: [
			{
				region: "California",
				states: [
					{
						state: "California",
						cities: [
							"Los Angeles",
							"San Francisco",
							"San Diego",
							"Sacramento",
							"San Jose",
							"Fresno",
							"Long Beach",
							"Oakland"
						]
					}
				]
			},
			{
				region: "New York",
				states: [
					{
						state: "New York",
						cities: [
							"New York City",
							"Buffalo",
							"Rochester",
							"Yonkers",
							"Syracuse",
							"Albany",
							"New Rochelle"
						]
					}
				]
			}
		]
	}
]

/**
 * Checks if a specific location is allowed based on country, region, state, and city
 */
export const isLocationAllowed = (
	country: string,
	region: string,
	state: string,
	city: string
): boolean => {
	const allowedCountry = ALLOWED_LOCATIONS.find(
		(loc) => loc.country.toLowerCase() === country.toLowerCase()
	)

	if (!allowedCountry) return false

	const allowedRegion = allowedCountry.regions.find(
		(reg) => reg.region.toLowerCase() === region.toLowerCase()
	)

	if (!allowedRegion) return false

	const allowedState = allowedRegion.states.find(
		(st) => st.state.toLowerCase() === state.toLowerCase()
	)

	if (!allowedState) return false

	return allowedState.cities.some(
		(allowedCity) => allowedCity.toLowerCase() === city.toLowerCase()
	)
}

/**
 * Gets all allowed countries
 */
export const getAllowedCountries = (): string[] => {
	return ALLOWED_LOCATIONS.map((loc) => loc.country)
}

/**
 * Gets allowed regions for a specific country
 */
export const getAllowedRegions = (country: string): string[] => {
	const allowedCountry = ALLOWED_LOCATIONS.find(
		(loc) => loc.country.toLowerCase() === country.toLowerCase()
	)
	return allowedCountry?.regions.map((reg) => reg.region) ?? []
}

/**
 * Gets allowed states for a specific country and region
 */
export const getAllowedStates = (country: string, region: string): string[] => {
	const allowedCountry = ALLOWED_LOCATIONS.find(
		(loc) => loc.country.toLowerCase() === country.toLowerCase()
	)

	const allowedRegion = allowedCountry?.regions.find(
		(reg) => reg.region.toLowerCase() === region.toLowerCase()
	)

	return allowedRegion?.states.map((state) => state.state) ?? []
}

/**
 * Gets allowed cities for a specific country, region, and state
 */
export const getAllowedCities = (
	country: string,
	region: string,
	state: string
): string[] => {
	const allowedCountry = ALLOWED_LOCATIONS.find(
		(loc) => loc.country.toLowerCase() === country.toLowerCase()
	)

	const allowedRegion = allowedCountry?.regions.find(
		(reg) => reg.region.toLowerCase() === region.toLowerCase()
	)

	const allowedState = allowedRegion?.states.find(
		(st) => st.state.toLowerCase() === state.toLowerCase()
	)

	return allowedState?.cities ?? []
}

/**
 * Validates if coordinates fall within an allowed location
 * Returns the location info if valid, null if invalid
 */
export const validateLocationCoordinates = async (
	latLng: google.maps.LatLngLiteral
): Promise<{
	isValid: boolean
	location?: {
		country: string
		region: string
		state: string
		city: string
		barangay?: string
		postalCode?: string
	}
	error?: string
}> => {
	try {
		const geocoder = new google.maps.Geocoder()
		const response = await geocoder.geocode({ location: latLng })

		if (!response.results || response.results.length === 0) {
			return {
				isValid: false,
				error: "Unable to determine location from coordinates"
			}
		}

		const result = response.results[0]
		const components = result?.address_components ?? []

		const getComponent = (types: string[]) => {
			const component = components.find((comp) =>
				types.some((type) => comp.types.includes(type))
			)
			return component?.long_name ?? ""
		}

		const country = getComponent(["country"])
		const region = getComponent(["administrative_area_level_1"])
		const state =
			getComponent(["administrative_area_level_2"]) ||
			getComponent(["administrative_area_level_1"])
		const city = getComponent([
			"locality",
			"administrative_area_level_3",
			"sublocality",
			"administrative_area_level_2"
		])

		const location = {
			country,
			region,
			state,
			city,
			barangay: getComponent(["sublocality", "sublocality_level_1"]),
			postalCode: getComponent(["postal_code"])
		}

		// Debug log (remove in production)
		console.log("Geocoded location:", location)

		// For now, let's be more permissive and allow Philippines locations
		// You can make this stricter once you verify the geocoding results
		const isValid =
			country.toLowerCase() === "philippines" ||
			isLocationAllowed(country, region, state, city)

		return {
			isValid,
			location,
			error: isValid
				? undefined
				: `Service not available in ${city}, ${state}, ${region}, ${country}`
		}
	} catch {
		return {
			isValid: false,
			error: "Failed to validate location"
		}
	}
}
