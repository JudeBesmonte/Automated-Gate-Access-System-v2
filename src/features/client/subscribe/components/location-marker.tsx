"use client"

import { useState } from "react"
import {
	AdvancedMarker,
	InfoWindow,
	Pin,
	useAdvancedMarkerRef
} from "@vis.gl/react-google-maps"
import { CheckCircle, Info, X } from "lucide-react"

import { cn } from "@/core/lib/utils"

import type { LocationSchema } from "@/features/client/subscribe/server/validations"

interface LocMarker {
	position: google.maps.LatLngLiteral
	locationData?: LocationSchema
	isValid?: boolean
}

export const LocMarker = ({
	position,
	locationData,
	isValid = true
}: LocMarker) => {
	const [infoWindowShown, setInfoWindowShown] = useState(false)
	const [hovered, setHovered] = useState(false)
	const [markerRef, marker] = useAdvancedMarkerRef()

	const handleMarkerClick = () => setInfoWindowShown((prev) => !prev)
	const handleInfoWindowClose = () => setInfoWindowShown(false)

	const formatAddress = () => {
		if (!locationData) return null

		const addressParts = [
			locationData.barangay,
			locationData.city,
			locationData.state,
			locationData.region,
			locationData.country
		].filter(Boolean)

		return addressParts.length > 0 ? addressParts.join(", ") : null
	}

	return (
		<>
			<AdvancedMarker
				ref={markerRef}
				position={position}
				onMouseEnter={() => setHovered(true)}
				onMouseLeave={() => setHovered(false)}
				onClick={handleMarkerClick}
				className={cn(
					"transition-all duration-200 ease-in-out",
					hovered ? "scale-110" : ""
				)}
			>
				<Pin
					background={isValid ? "#22c55e" : "#ef4444"}
					borderColor={isValid ? "#16a34a" : "#dc2626"}
					glyphColor="white"
				>
					{isValid ? (
						<CheckCircle className="h-4 w-4" />
					) : (
						<X className="h-4 w-4" />
					)}
				</Pin>
			</AdvancedMarker>

			{infoWindowShown && marker && (
				<InfoWindow
					anchor={marker}
					headerDisabled
					className="flex max-w-xs flex-col p-0"
				>
					<button
						className="absolute right-2 top-2 h-6 w-6 !text-black"
						onClick={handleInfoWindowClose}
					>
						<X className="h-4 w-4" />
					</button>

					{/* Validation status */}
					<div
						className={cn(
							"mb-2 flex items-center gap-2 rounded-t px-3 py-2",
							isValid ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"
						)}
					>
						{isValid ? (
							<CheckCircle className="h-4 w-4 text-green-600" />
						) : (
							<X className="h-4 w-4 text-red-600" />
						)}
						<span className="text-sm font-medium">
							{isValid ? "Service Available" : "Service Not Available"}
						</span>
					</div>

					{locationData?.city ? (
						<div className="mb-2 px-3">
							<h4 className="text-lg font-semibold text-gray-900">
								{locationData.city}
							</h4>
						</div>
					) : (
						<div className="mb-2 px-3">
							<h4 className="text-lg font-semibold text-gray-900">
								Location Details
							</h4>
							<p className="text-sm text-gray-600">
								Fill in the form to add location information
							</p>
						</div>
					)}

					{formatAddress() && (
						<div className="mb-2 px-3">
							<p className="flex items-start gap-1 text-sm text-gray-600">
								<Info className="mt-0.5 h-3 w-3 flex-shrink-0" />
								<span>{formatAddress()}</span>
							</p>
							{locationData?.postalCode && (
								<p className="ml-4 mt-1 text-sm text-gray-600">
									Postal Code: {locationData.postalCode}
								</p>
							)}
						</div>
					)}

					<div className="border-t border-gray-200 px-3 py-2 text-xs text-gray-500">
						<p>Lat: {position.lat.toFixed(6)}</p>
						<p>Lng: {position.lng.toFixed(6)}</p>
					</div>
				</InfoWindow>
			)}
		</>
	)
}
