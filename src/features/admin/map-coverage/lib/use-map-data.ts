import { useCallback } from "react"

import { extractMapDataFromOverlays } from "@/features/admin/map-coverage/lib/map-utils"
import type {
	MapControlConfig,
	ShapeData
} from "@/features/admin/map-coverage/lib/use-map-control"

// Debug utilities
const debugLog = (
	config: MapControlConfig,
	message: string,
	data?: unknown
) => {
	if (config.debugMode) {
		console.log(`[MapControl] ${message}`, data)
	}
}

export function useMapData(
	overlays: google.maps.MVCObject[],
	config: MapControlConfig,
	validateAndCleanupAllMarkers: () => void
) {
	// Function to extract serializable data from overlays
	const extractMapData = useCallback((): ShapeData[] => {
		return extractMapDataFromOverlays(overlays)
	}, [overlays])

	const saveMapData = useCallback(async () => {
		// Validate markers before saving
		validateAndCleanupAllMarkers()

		const mapData = extractMapData()
		debugLog(config, "Saving map data", { count: mapData.length })

		// Call the onSave callback if provided
		if (config.onSave) await config.onSave(mapData)
		else console.log("All map data:", mapData)
	}, [validateAndCleanupAllMarkers, config, extractMapData])

	return {
		extractMapData,
		saveMapData,
		// Legacy aliases for backward compatibility
		extractShapeData: extractMapData,
		saveShapes: saveMapData
	}
}
