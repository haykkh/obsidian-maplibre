import { derived, writable } from "svelte/store"

export interface ILocationFile {
    name: string
    path: string
    lng: number
    lat: number
}

export const locations = writable<Map<string, ILocationFile>>(new Map())


export const name = writable<string>("")
export const lng = writable<number>()
export const lat = writable<number>()
export const lngLat = derived([lng, lat], ([$lng, $lat]) => ({ lng: $lng, lat: $lat }))

export default { lng, lat, lngLat, name, locations }