import locationStore from "./location-store"
import { MapView } from "./map-view"
import { VIEW_TYPE_MAP } from "./map-view"
import { Plugin, TAbstractFile, TFile } from "obsidian"
import type { LngLat } from "./types"

export default class MapPlugin extends Plugin {
  async onload() {
    this.initialSyncLocationStore()

    this.startWatchers()

    this.registerView(VIEW_TYPE_MAP, (leaf) => new MapView(leaf))

    this.addRibbonIcon("map", "Open map", () => MapView.activateView(this.app))
  }

  async onunload() {}

  /**
   * First sync of the location store from the files in the vault
   */
  private initialSyncLocationStore = () => {
    const files = this.app.vault.getFiles()

    if (!files.length) {
      setTimeout(this.initialSyncLocationStore, 1000)
      return
    }
    files.forEach(async (file) => this.updateLocationStoreFromFile(file))
  }

  /**
   * Start the watchers
   */
  private startWatchers = () => {
    this.app.workspace.on("file-open", (file) =>
      this.updateLocationStoreFromFile(file)
    )
    this.app.workspace.on("quick-preview", (file, data) =>
      this.updateLocationStoreFromContent(file.path, file.name, data)
    )
    this.app.vault.on("delete", (file) =>
      this.deleteFileFromLocationStore(file)
    )
  }

  /**
   * Update the location store from a file
   *
   * @param file - The file to update the location store from
   */
  private updateLocationStoreFromFile = async (file: TFile | null) => {
    if (file) {
      const content = await this.app.vault.cachedRead(file)
      this.updateLocationStoreFromContent(file.path, file.name, content)
    }
  }

  /**
   * Delete a location from the location store
   *
   * @param file - The location's file to delete
   */
  private deleteFileFromLocationStore = async (file: TFile | TAbstractFile) => {
    locationStore.locations.update((locations) => {
      locations.delete(file.path)
      return locations
    })
  }

  /**
   * Update the location store from the content
   *
   * @param path - The path of the file
   * @param name - The name of the file
   * @param content - The content of the file
   */
  private updateLocationStoreFromContent = (
    path: string,
    name: string,
    content: string
  ) => {
    const { lng, lat } = this.getLngLatFromContent(content)
    const isActive = path === this.app.workspace.getActiveFile()?.path

    if (lng && lat) {
      locationStore.locations.update((locations) => {
        const location = { name, path, lng, lat }

        locations.set(path, location)

        if (isActive) locationStore.activeLocation.set(location)

        return locations
      })
    }
  }

  /**
   * Get the longitude and latitude from the content
   *
   * @param content - The content to get the longitude and latitude from
   * @returns The longitude and latitude
   */
  private getLngLatFromContent = (content: string): LngLat => {
    const lngMatch = content.match(/lng:\s*([-\d.]+)/)
    const latMatch = content.match(/lat:\s*([-\d.]+)/)

    return {
      lng: lngMatch ? parseFloat(lngMatch[1]) : 0,
      lat: latMatch ? parseFloat(latMatch[1]) : 0
    }
  }
}
