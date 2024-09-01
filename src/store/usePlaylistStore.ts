import { create } from 'zustand';

import { PlaylistModel } from '@/types/playlist';

interface PlaylistStore {
  playlists: PlaylistModel[];
  setPlaylists: (playlists: PlaylistModel[]) => void;
  addPlaylist: (playlist: PlaylistModel) => void;
}

export const usePlaylistStore = create<PlaylistStore>((set) => ({
  playlists: [],
  setPlaylists: (playlists) => set({ playlists }),
  addPlaylist: (playlist) => set((state) => ({ playlists: [...state.playlists, playlist] })),
}));
