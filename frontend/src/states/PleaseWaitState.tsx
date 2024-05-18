import { create } from "zustand";

export interface PleaseWaitState {
  isWaiting: boolean;
  setIsWaiting: (isWaiting: boolean) => void;
}

export const usePleaseWaitState = create<PleaseWaitState>((set) => ({
  isWaiting: false,
  setIsWaiting: (isWaiting: boolean) => set({ isWaiting }),
}));
