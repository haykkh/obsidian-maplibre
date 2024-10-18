import { writable } from "svelte/store"

export interface ILocationFile {
  name: string
  path: string
  lng: number
  lat: number
}

export const locations = writable<Map<string, ILocationFile>>(new Map())
export const activeLocation = writable<ILocationFile | null>(null)

export default { locations, activeLocation }
