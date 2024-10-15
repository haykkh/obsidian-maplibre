import locationStore from "./location-store"
import { MapView } from "./map-view"
import { VIEW_TYPE_MAP } from "./map-view"
import { Plugin } from "obsidian"

export default class MapPlugin extends Plugin {
	async onload() {
		this.syncLocationStore()

		this.registerView(VIEW_TYPE_MAP, (leaf) => new MapView(leaf))

		this.addRibbonIcon("map", "Open map", () =>
			MapView.activateView(this.app),
		)
	}

	async onunload() {}

	syncLocationStore() {
		this.app.workspace.on('active-leaf-change', async () => {
			const { lng, lat } = await this.getCoordinates()
			
			if (lng && lat) {
				locationStore.lng.set(lng)
				locationStore.lat.set(lat)
			}
		})
	}

	async getCoordinates() {
		const activeFile = this.app.workspace.getActiveFile()
		if (!activeFile) return { lng: null, lat: null }
	
		const content = await this.app.vault.read(activeFile)
		const lngMatch = content.match(/lng:\s*([-\d.]+)/)
		const latMatch = content.match(/lat:\s*([-\d.]+)/)

		return {
		  lng: lngMatch ? parseFloat(lngMatch[1]) : null,
		  lat: latMatch ? parseFloat(latMatch[1]) : null
		}
	  }
}
