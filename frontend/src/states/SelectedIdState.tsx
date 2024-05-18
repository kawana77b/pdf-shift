import { create } from "zustand";

export interface SelectedIdState {
  selectedId: string;
  setSelectedId: (selectedId: string) => void;
  clearSelectedId: () => void;
}

export const useSelectedIdState = create<SelectedIdState>((set) => ({
  selectedId: "",
  setSelectedId: (selectedId: string) => set({ selectedId }),
  clearSelectedId: () => set({ selectedId: "" }),
}));
