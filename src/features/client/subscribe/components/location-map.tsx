"use client"

import {
	ControlPosition,
	Map,
	MapControl,
	type MapMouseEvent
} from "@vis.gl/react-google-maps"

import { LocMarker } from "@/features/client/subscribe/components/location-marker"
import { UndoRedoControl } from "@/features/client/subscribe/components/undo-control"
import { useDrawingManager } from "@/features/client/subscribe/lib/use-drawing-manager"
import type { LocationSchema } from "@/features/client/subscribe/server/validations"

// Map configuration constants
const MAP_CONFIG = {
	defaultZoom: 14,
	minZoom: 2,
	maxZoom: 20,
	restriction: {
		latLngBounds: { north: 85, south: -85, west: -180, east: 180 }
	}
} as const

interface LocationMapProps {
	selectedLocation?: google.maps.LatLngLiteral
	onLocationSelect: (latLng: google.maps.LatLngLiteral) => Promise<void>
	locationData: LocationSchema
	isLocationValid?: boolean | null
}

export const LocationMap = ({
	selectedLocation,
	onLocationSelect,
	locationData,
	isLocationValid
}: LocationMapProps) => {
	const drawingManager = useDrawingManager()

	const handleMapClick = async (ev: MapMouseEvent) => {
		if (ev.detail?.latLng) {
			await onLocationSelect({
				lat: ev.detail.latLng.lat,
				lng: ev.detail.latLng.lng
			})
		}
	}

	return (
		<>
			<Map
				mapId={process.env.NEXT_PUBLIC_GOOGLE_MAP_ID ?? ""}
				className="aspect-video overflow-hidden rounded-md text-black"
				defaultCenter={{
					lat: locationData.latitude,
					lng: locationData.longitude
				}}
				defaultZoom={MAP_CONFIG.defaultZoom}
				clickableIcons={false}
				disableDefaultUI
				fullscreenControl
				gestureHandling="greedy"
				onClick={handleMapClick}
				restriction={MAP_CONFIG.restriction}
				minZoom={MAP_CONFIG.minZoom}
				maxZoom={MAP_CONFIG.maxZoom}
				zoomControl
				zoomControlOptions={{ position: 3 }}
			>
				{selectedLocation && (
					<LocMarker
						position={selectedLocation}
						locationData={locationData}
						isValid={isLocationValid ?? true}
					/>
				)}
			</Map>

			<MapControl position={ControlPosition.TOP_CENTER}>
				<UndoRedoControl drawingManager={drawingManager} />
			</MapControl>
		</>
	)
}
