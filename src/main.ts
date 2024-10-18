import locationStore from "./location-store"
import { MapView } from "./map-view"
import { VIEW_TYPE_MAP } from "./map-view"
import { Plugin, TFile } from "obsidian"
import type { LngLat } from "./types"

export default class MapPlugin extends Plugin {
  async onload() {
    this.syncLocationStore()

    this.registerView(VIEW_TYPE_MAP, (leaf) => new MapView(leaf))

    this.addRibbonIcon("map", "Open map", () => MapView.activateView(this.app))
  }

  async onunload() {}

  syncLocationStore() {
    this.app.workspace.on("file-open", async () => {
      this.syncCoordinatesFromAllFiles()
    })
  }

  async syncCoordinatesFromAllFiles() {
    const files = this.app.vault.getFiles()

    files.forEach(async (file) => {
      const { lng, lat } = await this.getCoordinateFromFile(file)
      const isActive = file.path === this.app.workspace.getActiveFile()?.path

      if (lng && lat) {
        locationStore.locations.update((locations) => {
          const location = { name: file.name, path: file.path, lng, lat }
          locations.set(file.path, location)

          if (isActive) locationStore.activeLocation.set(location)

          return locations
        })
      }
    })
  }

  async getCoordinateFromFile(file: TFile): Promise<LngLat> {
    const content = await this.app.vault.cachedRead(file)
    const lngMatch = content.match(/lng:\s*([-\d.]+)/)
    const latMatch = content.match(/lat:\s*([-\d.]+)/)

    return {
      lng: lngMatch ? parseFloat(lngMatch[1]) : 0,
      lat: latMatch ? parseFloat(latMatch[1]) : 0
    }
  }
}
