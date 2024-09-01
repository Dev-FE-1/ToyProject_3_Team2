import { useQuery } from '@tanstack/react-query';

import { getAllPlaylists, getPlaylistsByCategory } from '@/api/endpoints/playlist';

// 쿼리 키(queryKey)
export const playlistKeys = {
  all: ['playlists'] as const,
  byCategory: (category: string) => [...playlistKeys.all, 'category', category] as const,
};

// 기본 옵션
const defaultOptions = {
  staleTime: 5 * 60 * 1000, // 기본 5분
};

export const useAllPlaylist = () =>
  useQuery({
    queryKey: playlistKeys.all,
    queryFn: () => getAllPlaylists(),
    ...defaultOptions,
  });

export const usePlaylistsByCategory = (category: string) =>
  useQuery({
    queryKey: playlistKeys.byCategory(category),
    queryFn: () => getPlaylistsByCategory(category),
    ...defaultOptions,
  });
