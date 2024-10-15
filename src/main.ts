import { MapView } from "./map-view"
import { VIEW_TYPE_MAP } from "./map-view"
import {  Plugin } from "obsidian"

export default class MapPlugin extends Plugin {
	async onload() {
		this.registerView(VIEW_TYPE_MAP, (leaf) => new MapView(leaf))

		this.addRibbonIcon("map", "Open map", () =>
			MapView.activateView(this.app),
		)
	}

	async onunload() {}
}
