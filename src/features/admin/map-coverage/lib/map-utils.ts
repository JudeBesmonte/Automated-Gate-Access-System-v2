// Import type for map data extraction (avoiding circular dependency)
type ShapeDataType = {
	position?: { lat: number; lng: number }
	center?: { lat: number; lng: number }
	radius?: number
	path?: { lat: number; lng: number }[]
	bounds?: {
		north: number
		south: number
		east: number
		west: number
	}
}

// Overlay detection and categorization
export const detectOverlay = {
	getOverlayType: (overlay: google.maps.MVCObject) => {
		if (overlay instanceof google.maps.Marker) return "Marker"
		if (overlay instanceof google.maps.Circle) return "Circle"
		if (overlay instanceof google.maps.Polygon) return "Polygon"
		if (overlay instanceof google.maps.Rectangle) return "Rectangle"
		if (overlay instanceof google.maps.Polyline) return "Polyline"
		return "Shape"
	},
	isMarker: (overlay: google.maps.MVCObject) =>
		overlay instanceof google.maps.Marker,
	isCircle: (overlay: google.maps.MVCObject) =>
		overlay instanceof google.maps.Circle,
	isPolygon: (overlay: google.maps.MVCObject) =>
		overlay instanceof google.maps.Polygon,
	isRectangle: (overlay: google.maps.MVCObject) =>
		overlay instanceof google.maps.Rectangle,
	isPolyline: (overlay: google.maps.MVCObject) =>
		overlay instanceof google.maps.Polyline
}

// Utility functions
export const overlayUtils = {
	isEditableOverlay: (overlay: google.maps.MVCObject) => {
		return (
			detectOverlay.isMarker(overlay) ||
			detectOverlay.isCircle(overlay) ||
			detectOverlay.isPolygon(overlay) ||
			detectOverlay.isRectangle(overlay) ||
			detectOverlay.isPolyline(overlay)
		)
	},

	isDraggableOverlay: (overlay: google.maps.MVCObject) => {
		return (
			detectOverlay.isMarker(overlay) ||
			detectOverlay.isCircle(overlay) ||
			detectOverlay.isPolygon(overlay) ||
			detectOverlay.isRectangle(overlay) ||
			detectOverlay.isPolyline(overlay)
		)
	},

	getOverlayType: detectOverlay.getOverlayType,

	isOverlayCurrentlyEditable: (overlay: google.maps.MVCObject) => {
		if (detectOverlay.isMarker(overlay)) return overlay.getDraggable()
		if (detectOverlay.isCircle(overlay))
			return overlay.getEditable() && overlay.getDraggable()
		if (detectOverlay.isPolygon(overlay))
			return overlay.getEditable() && overlay.getDraggable()
		if (detectOverlay.isRectangle(overlay))
			return overlay.getEditable() && overlay.getDraggable()
		if (detectOverlay.isPolyline(overlay))
			return overlay.getEditable() && overlay.getDraggable()
		return false
	},

	getOverlayInfo: (overlay: google.maps.MVCObject | null) => {
		if (!overlay) return null

		return {
			type: overlayUtils.getOverlayType(overlay),
			isEditing: overlayUtils.isOverlayCurrentlyEditable(overlay),
			canEdit: overlayUtils.isEditableOverlay(overlay)
		}
	},

	setOverlayMap: (
		overlay: google.maps.MVCObject,
		mapInstance: google.maps.Map | null
	) => {
		if (overlayUtils.isDraggableOverlay(overlay)) {
			overlay.setMap(mapInstance)
		}
	},

	updateOverlayEditability: (
		overlay: google.maps.MVCObject,
		editable: boolean
	) => {
		if (detectOverlay.isMarker(overlay)) {
			overlay.setDraggable(editable)
		}
		if (detectOverlay.isCircle(overlay)) {
			overlay.setEditable(editable)
			overlay.setDraggable(editable)
		}
		if (detectOverlay.isPolygon(overlay)) {
			overlay.setEditable(editable)
			overlay.setDraggable(editable)
		}
		if (detectOverlay.isRectangle(overlay)) {
			overlay.setEditable(editable)
			overlay.setDraggable(editable)
		}
		if (detectOverlay.isPolyline(overlay)) {
			overlay.setEditable(editable)
			overlay.setDraggable(editable)
		}
	}
}

export const positionUtils = {
	getMarkerPosition: (marker: google.maps.Marker) => {
		const position = marker.getPosition()
		if (!position) return null
		return new google.maps.LatLng(position.lat(), position.lng())
	},

	getCircleTopPosition: (circle: google.maps.Circle) => {
		const center = circle.getCenter()
		const radius = circle.getRadius()
		return center
			? google.maps.geometry.spherical.computeOffset(center, radius, 0)
			: null
	},

	getRectangleTopPosition: (rectangle: google.maps.Rectangle) => {
		const bounds = rectangle.getBounds()
		if (!bounds) return null

		const northeast = bounds.getNorthEast()
		const southwest = bounds.getSouthWest()
		const north = northeast.lat()
		const centerLng = (northeast.lng() + southwest.lng()) / 2
		return new google.maps.LatLng(north, centerLng)
	},

	getPathTopPosition: (overlay: google.maps.Polygon | google.maps.Polyline) => {
		const path = overlay.getPath()
		if (!path || path.getLength() === 0) return null

		let northernmost = path.getAt(0)
		for (let i = 1; i < path.getLength(); i++) {
			const point = path.getAt(i)
			if (point.lat() > northernmost.lat()) {
				northernmost = point
			}
		}
		return northernmost
	},

	getOverlayPosition: (overlay: google.maps.MVCObject) => {
		if (detectOverlay.isMarker(overlay)) {
			return positionUtils.getMarkerPosition(overlay)
		}
		if (detectOverlay.isCircle(overlay)) {
			return positionUtils.getCircleTopPosition(overlay)
		}
		if (detectOverlay.isRectangle(overlay)) {
			return positionUtils.getRectangleTopPosition(overlay)
		}
		if (detectOverlay.isPolygon(overlay) || detectOverlay.isPolyline(overlay)) {
			return positionUtils.getPathTopPosition(overlay)
		}
		return null
	}
}

// Geometry utilities for boundary checking
export const geometryUtils = {
	isPointInPolygon: (
		point: google.maps.LatLng,
		polygon: google.maps.Polygon
	) => {
		const path = polygon.getPath()
		if (!path || path.getLength() === 0) return false
		return google.maps.geometry.poly.containsLocation(point, polygon)
	},

	isPointInCircle: (point: google.maps.LatLng, circle: google.maps.Circle) => {
		const center = circle.getCenter()
		const radius = circle.getRadius()
		if (!center || !radius) return false

		const distance = google.maps.geometry.spherical.computeDistanceBetween(
			point,
			center
		)
		return distance <= radius
	},

	isPointInRectangle: (
		point: google.maps.LatLng,
		rectangle: google.maps.Rectangle
	) => {
		const bounds = rectangle.getBounds()
		if (!bounds) return false
		return bounds.contains(point)
	},

	isPointNearPolyline: (
		point: google.maps.LatLng,
		polyline: google.maps.Polyline,
		toleranceMeters = 50
	) => {
		const path = polyline.getPath()
		if (!path || path.getLength() === 0) return false

		return google.maps.geometry.poly.isLocationOnEdge(
			point,
			polyline,
			toleranceMeters
		)
	},

	isMarkerInsideAnyShape: (
		marker: google.maps.Marker,
		overlays: google.maps.MVCObject[]
	) => {
		const position = marker.getPosition()
		if (!position) return false

		return overlays.some((overlay) => {
			// Skip the marker itself
			if (overlay === marker) return false

			if (detectOverlay.isPolygon(overlay)) {
				return geometryUtils.isPointInPolygon(position, overlay)
			}
			if (detectOverlay.isCircle(overlay)) {
				return geometryUtils.isPointInCircle(position, overlay)
			}
			if (detectOverlay.isRectangle(overlay)) {
				return geometryUtils.isPointInRectangle(position, overlay)
			}
			if (detectOverlay.isPolyline(overlay)) {
				return geometryUtils.isPointNearPolyline(position, overlay)
			}
			return false
		})
	}
}

// Map data extraction utilities
export const mapDataExtractors = {
	extractMarkerData: (marker: google.maps.Marker): ShapeDataType => {
		const data: ShapeDataType = {}
		const position = marker.getPosition()
		if (position) {
			data.position = { lat: position.lat(), lng: position.lng() }
		}
		return data
	},

	extractCircleData: (circle: google.maps.Circle): ShapeDataType => {
		const data: ShapeDataType = {}
		const center = circle.getCenter()
		if (center) {
			data.center = { lat: center.lat(), lng: center.lng() }
		}
		data.radius = circle.getRadius()
		return data
	},

	extractPolygonData: (polygon: google.maps.Polygon): ShapeDataType => {
		const data: ShapeDataType = {}
		const path = polygon.getPath()
		if (path) {
			data.path = path.getArray().map((latLng) => ({
				lat: latLng.lat(),
				lng: latLng.lng()
			}))
		}
		return data
	},

	extractRectangleData: (rectangle: google.maps.Rectangle): ShapeDataType => {
		const data: ShapeDataType = {}
		const bounds = rectangle.getBounds()
		if (bounds) {
			data.bounds = {
				north: bounds.getNorthEast().lat(),
				south: bounds.getSouthWest().lat(),
				east: bounds.getNorthEast().lng(),
				west: bounds.getSouthWest().lng()
			}
		}
		return data
	},

	extractPolylineData: (polyline: google.maps.Polyline): ShapeDataType => {
		const data: ShapeDataType = {}
		const path = polyline.getPath()
		if (path) {
			data.path = path.getArray().map((latLng) => ({
				lat: latLng.lat(),
				lng: latLng.lng()
			}))
		}
		return data
	}
}

// Main extraction functions
export function extractMapDataFromOverlay(
	overlay: google.maps.MVCObject,
	index: number
) {
	const id = `shape_${Date.now()}_${index}`
	let type: "marker" | "circle" | "polygon" | "rectangle" | "polyline"
	let data: ShapeDataType

	// Use overlay type detection and extract appropriate data
	if (detectOverlay.isMarker(overlay)) {
		type = "marker"
		data = mapDataExtractors.extractMarkerData(overlay)
	} else if (detectOverlay.isCircle(overlay)) {
		type = "circle"
		data = mapDataExtractors.extractCircleData(overlay)
	} else if (detectOverlay.isPolygon(overlay)) {
		type = "polygon"
		data = mapDataExtractors.extractPolygonData(overlay)
	} else if (detectOverlay.isRectangle(overlay)) {
		type = "rectangle"
		data = mapDataExtractors.extractRectangleData(overlay)
	} else if (detectOverlay.isPolyline(overlay)) {
		type = "polyline"
		data = mapDataExtractors.extractPolylineData(overlay)
	} else {
		// Fallback for unknown overlay types
		type = "marker"
		data = {}
	}

	return {
		id,
		type,
		data,
		metadata: {
			createdAt: Date.now(),
			visible: true,
			editable: overlayUtils.isOverlayCurrentlyEditable(overlay)
		}
	}
}

// Helper function to extract data from multiple overlays
export function extractMapDataFromOverlays(overlays: google.maps.MVCObject[]) {
	return overlays.map((overlay, index) =>
		extractMapDataFromOverlay(overlay, index)
	)
}

// Legacy aliases for backward compatibility
export const extractShapeDataFromOverlays = extractMapDataFromOverlays
export const extractShapeDataFromOverlay = extractMapDataFromOverlay
