import { useEffect, useState } from "react"

interface GeolocationState {
	latitude: number | null
	longitude: number | null
	isLoading: boolean
	error: string | null
}

/**
 * Custom hook to get user's current geolocation
 */
export const useGeolocation = () => {
	const [state, setState] = useState<GeolocationState>({
		latitude: null,
		longitude: null,
		isLoading: true,
		error: null
	})

	useEffect(() => {
		if (!navigator.geolocation) {
			setState({
				latitude: null,
				longitude: null,
				isLoading: false,
				error: "Geolocation is not supported by this browser"
			})
			return
		}

		const defaultOptions: PositionOptions = {
			enableHighAccuracy: true,
			timeout: 10000,
			maximumAge: 300000 // 5 minutes
		}

		const onSuccess = (position: GeolocationPosition) => {
			setState({
				latitude: position.coords.latitude,
				longitude: position.coords.longitude,
				isLoading: false,
				error: null
			})
		}

		const onError = (error: GeolocationPositionError) => {
			let errorMessage = "Unable to retrieve your location"

			switch (error.code) {
				case error.PERMISSION_DENIED:
					errorMessage = "Location access denied by user"
					break
				case error.POSITION_UNAVAILABLE:
					errorMessage = "Location information is unavailable"
					break
				case error.TIMEOUT:
					errorMessage = "Location request timed out"
					break
			}

			setState({
				latitude: null,
				longitude: null,
				isLoading: false,
				error: errorMessage
			})
		}

		navigator.geolocation.getCurrentPosition(onSuccess, onError, defaultOptions)
	}, [])

	return state
}
