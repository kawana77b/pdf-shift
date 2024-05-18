import { create } from "zustand";

export interface OpenFileState {
  filePath: string;
  setFilePath: (filePath: string) => void;
}

export const useOpenFileState = create<OpenFileState>((set) => ({
  filePath: "",
  setFilePath: (filePath: string) => set({ filePath }),
}));
