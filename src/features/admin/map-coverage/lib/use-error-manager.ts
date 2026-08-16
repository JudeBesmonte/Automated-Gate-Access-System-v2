import { useCallback, useState } from "react"

import type { MapControlConfig } from "./use-map-control"

export interface ValidationError {
	type:
		| "MARKER_OUTSIDE_BOUNDARY"
		| "MAX_OVERLAYS_EXCEEDED"
		| "INVALID_OVERLAY_DATA"
	message: string
	timestamp: number
	overlay?: google.maps.MVCObject
}

export function useErrorManager(config: MapControlConfig) {
	const [error, setError] = useState<ValidationError | null>(null)

	const clearError = useCallback(() => setError(null), [])

	// Enhanced error handler that manages both internal state and external callbacks
	const handleError = useCallback(
		(error: ValidationError) => {
			// Set internal error state
			setError(error)

			// Call external onError callback if provided
			if (config.onError) {
				config.onError(error)
			}
		},
		[config]
	)

	return {
		// Error state
		error,

		// Error actions
		handleError,
		setError,
		clearError
	}
}
