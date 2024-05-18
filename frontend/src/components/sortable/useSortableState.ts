import { type UniqueIdentifier } from "@dnd-kit/core";
import { create } from "zustand";

export interface Item {
  id: UniqueIdentifier;
}

export interface SortableState {
  items: Item[];
  setItems: (items: Item[]) => void;
  removeItem: (id: UniqueIdentifier) => void;
}

/**
 * Hook to control the state of sortable items for `SortableList` Component.
 * @description This is a universal and **unique** state.
 */
export const useSortableState = create<SortableState>((set) => ({
  items: [],
  setItems: (items: Item[]) => set({ items }),
  removeItem: (id: UniqueIdentifier) =>
    set((state) => ({
      items:
        state.items.length > 1
          ? state.items.filter((item) => item.id !== id)
          : state.items,
    })),
}));
