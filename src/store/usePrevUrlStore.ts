import { create } from 'zustand';

import { PlaylistModel } from '@/types/playlist';

interface PrevUrlProps {
  prevUrl: string;
  setPrevUrl: (prevUrl: string) => void;
  detailPagePlaylist: PlaylistModel[];
  setDetailPagePlaylist: (playlist: PlaylistModel[]) => void;
}

export const usePrevUrlStore = create<PrevUrlProps>((set) => ({
  prevUrl: '',
  setPrevUrl: (prevUrl: string) => set({ prevUrl }),
  detailPagePlaylist: [],
  setDetailPagePlaylist: (playlist: PlaylistModel[]) => set({ detailPagePlaylist: playlist }),
}));
