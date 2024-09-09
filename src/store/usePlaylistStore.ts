import { create } from 'zustand';

import { addPlaylist } from '@/api/endpoints/playlistOperations';
import { PlaylistFormDataModel, PlaylistModel } from '@/types/playlist';

interface PlaylistStore {
  playlists: PlaylistModel[];
  setPlaylists: (playlists: PlaylistModel[]) => void;
  addNewPlaylist: (
    formData: PlaylistFormDataModel,
    userId: string,
    userName: string
  ) => Promise<string>;
}

export const usePlaylistStore = create<PlaylistStore>((set) => ({
  playlists: [],
  setPlaylists: (playlists) => set({ playlists }),
  addNewPlaylist: async (formData, userId, userName) => {
    const newPlaylistId = await addPlaylist(formData, userId, userName);
    set((state) => ({
      playlists: [...state.playlists, { ...formData, playlistId: newPlaylistId, userId, userName }],
    }));
    return newPlaylistId;
  },
}));
