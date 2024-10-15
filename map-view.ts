import { ItemView, WorkspaceLeaf } from "obsidian";

export const VIEW_TYPE_MAP = "map-view";

export class MapView extends ItemView {
  constructor(leaf: WorkspaceLeaf) {
    super(leaf);
  }

  getViewType() {
    return VIEW_TYPE_MAP;
  }

  getDisplayText() {
    return "Map view";
  }

  async onOpen() {
  }

  async onClose() {
    // Nothing to clean up.
  }
}