import { derived, writable } from "svelte/store"

export interface ILocationFile {
  name: string
  path: string
  lng: number
  lat: number
  isActive: boolean
}

export const locations = writable<Map<string, ILocationFile>>(new Map())

export const activeLocation = derived(locations, ($locations) =>
  Array.from($locations.values()).find((location) => location.isActive)
)

export default { locations }
