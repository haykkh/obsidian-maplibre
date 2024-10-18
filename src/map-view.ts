import { App, ItemView, WorkspaceLeaf } from "obsidian"
import MapComponent from "./MapComponent.svelte"

export const VIEW_TYPE_MAP = "map-view"

export class MapView extends ItemView {
  component?: MapComponent

  constructor(leaf: WorkspaceLeaf) {
    super(leaf)
  }

  getViewType() {
    return VIEW_TYPE_MAP
  }

  getDisplayText() {
    return "Map view"
  }

  async onOpen() {
    this.component = new MapComponent({ target: this.contentEl })

    this.component.$on("marker-click", (event) => {
      const file = this.app.vault.getFileByPath(event.detail.location.path)

      if (file) {
        const leaf = this.app.workspace.getMostRecentLeaf()
      
        if (leaf) leaf.openFile(file)
        else this.app.workspace.getLeaf(true).openFile(file)
      }
    })
  }

  async onClose() {
    // Nothing to clean up.
    this.component?.$destroy()
  }

  static async activateView(app: App) {
    const { workspace } = app

    let leaf: WorkspaceLeaf | null = null
    const leaves = workspace.getLeavesOfType(VIEW_TYPE_MAP)

    if (leaves.length > 0) {
      // A leaf with our view already exists, use that
      leaf = leaves[0]
    } else {
      // Our view could not be found in the workspace, create a new leaf
      // in the right sidebar for it
      leaf = workspace.getRightLeaf(false)
      await leaf?.setViewState({ type: VIEW_TYPE_MAP, active: true })
    }

    // "Reveal" the leaf in case it is in a collapsed sidebar
    if (leaf) workspace.revealLeaf(leaf)
  }
}