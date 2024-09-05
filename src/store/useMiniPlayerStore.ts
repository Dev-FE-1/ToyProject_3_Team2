import { create } from 'zustand';

import { PlaylistModel } from '@/types/playlist';

interface MiniPlayerProps {
  isOpen: boolean;
  videoId: string | null;
  playlist: PlaylistModel | null;
  userId: string | null;
  openMiniPlayer: (videoId: string, playlist: PlaylistModel, userId: string) => void;
  updateMiniPlayer: (videoId: string, playlist: PlaylistModel) => void;
  closeMiniPlayer: () => void;
}

export const useMiniPlayerStore = create<MiniPlayerProps>((set) => ({
  isOpen: false,
  videoId: null,
  playlist: null,
  userId: null,
  openMiniPlayer: (videoId, playlist, userId) => set({ isOpen: true, videoId, playlist, userId }),
  updateMiniPlayer: (videoId, playlist) => set((state) => ({ videoId, playlist, isOpen: true })),
  closeMiniPlayer: () => set({ isOpen: false, videoId: null, playlist: null, userId: null }),
}));
