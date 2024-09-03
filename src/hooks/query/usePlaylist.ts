import { useQuery } from '@tanstack/react-query';

import { getAllPlaylists, getPlaylistsByCategory } from '@/api/endpoints/playlist';
import { QUERY_KEYS } from '@/constants/queryKey';

// 기본 옵션
const defaultOptions = {
  staleTime: 5 * 60 * 1000, // 기본 5분
};

export const useAllPlaylist = () =>
  useQuery({
    queryKey: [QUERY_KEYS.PLAYLIST_ALL_KEY],
    queryFn: () => getAllPlaylists(),
    ...defaultOptions,
  });

export const usePlaylistsByCategory = (category: string) =>
  useQuery({
    queryKey: [QUERY_KEYS.PLAYLIST_CATEGORY_KEY, category],
    queryFn: () => getPlaylistsByCategory(category),
    ...defaultOptions,
  });
