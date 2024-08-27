// starStore.ts
import { create } from 'zustand';

interface StarState {
  isToggled: boolean;
  toggleStar: () => void;
}

export const useStarStore = create<StarState>((set) => ({
  isToggled: false,
  toggleStar: () => set((state) => ({ isToggled: !state.isToggled })),
}));
