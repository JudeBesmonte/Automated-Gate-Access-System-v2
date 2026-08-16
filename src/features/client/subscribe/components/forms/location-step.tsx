"use client"

import { useFormContext } from "react-hook-form"

import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from "@/core/components/ui/form"
import { Input } from "@/core/components/ui/input"

import { LocationMap } from "@/features/client/subscribe/components/location-map"
import { CheckoutStepCard } from "@/features/client/subscribe/components/ui/checkout-step-card"
import { useGeolocation } from "@/features/client/subscribe/lib/use-geolocation"
import { useMapLocation } from "@/features/client/subscribe/lib/use-map-location"
import type { LocationSchema } from "@/features/client/subscribe/server/validations"

const DEFAULT_MAP_CENTER = { lat: 13.145947, lng: 123.749353 }

export function LocationStep() {
	const form = useFormContext<LocationSchema>()
	const { latitude, longitude } = useGeolocation()
	const { selectedLocation, handleLocationUpdate, isLocationValid } =
		useMapLocation({ form })

	const watchedValues = form.watch()
	const locationData = {
		...watchedValues,
		latitude: watchedValues.latitude ?? latitude ?? DEFAULT_MAP_CENTER.lat,
		longitude: watchedValues.longitude ?? longitude ?? DEFAULT_MAP_CENTER.lng
	}

	const renderField = (
		name: keyof LocationSchema,
		label: string,
		placeholder: string,
		type: "text" | "number" = "text"
	) => (
		<FormField
			control={form.control}
			name={name}
			render={({ field }) => (
				<FormItem>
					<FormLabel>{label}</FormLabel>
					<FormControl>
						<Input
							type={type}
							placeholder={placeholder}
							{...field}
							onChange={(e) => {
								if (type === "number") {
									field.onChange(parseFloat(e.target.value) || 0)
								} else {
									field.onChange(e.target.value)
								}
							}}
						/>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	)

	return (
		<CheckoutStepCard
			title="Select Location"
			description="Pin the site location on the map. We'll automatically validate the address and service availability."
		>
			<LocationMap
				selectedLocation={selectedLocation}
				onLocationSelect={handleLocationUpdate}
				locationData={locationData}
				isLocationValid={isLocationValid}
			/>

			{/* Coordinate Fields */}
			<div className="grid grid-cols-2 gap-4">
				{renderField("latitude", "Latitude", "0.0000", "number")}
				{renderField("longitude", "Longitude", "0.0000", "number")}
			</div>

			{/* Address Fields */}
			<div className="grid grid-cols-2 gap-4">
				{renderField("country", "Country", "Enter country")}
				{renderField("region", "Region", "Enter region")}
			</div>

			<div className="grid grid-cols-2 gap-4">
				{renderField("state", "State/Province", "Enter state/province")}
				{renderField("city", "City", "Enter city")}
			</div>

			<div className="grid grid-cols-2 gap-4">
				{renderField(
					"barangay",
					"Barangay/District",
					"Enter barangay/district"
				)}
				{renderField("postalCode", "Postal Code", "Enter postal code")}
			</div>
		</CheckoutStepCard>
	)
}
