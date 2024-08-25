// starStore.ts
import { create } from 'zustand';

interface StarState {
  isStarred: boolean;
  toggleStar: () => void;
}

export const useStarStore = create<StarState>((set) => ({
  isStarred: false,
  toggleStar: () => set((state) => ({ isStarred: !state.isStarred })),
}));
