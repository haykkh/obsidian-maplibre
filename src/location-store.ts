import { derived, writable } from "svelte/store"

export const name = writable<string>("")
export const lng = writable<number>()
export const lat = writable<number>()
export const lngLat = derived([lng, lat], ([$lng, $lat]) => ({ lng: $lng, lat: $lat }))

export default { lng, lat, lngLat, name }