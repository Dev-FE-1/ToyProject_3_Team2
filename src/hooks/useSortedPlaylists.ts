import { useEffect, useState } from 'react';

import {
  useAllPlaylist,
  useForkedPlaylists,
  useForkedPlaylistsByUserIds,
} from '@/hooks/queries/usePlaylistQueries';
import { PlaylistModel } from '@/types/playlist';
import { sortPlaylistsByPopularity, sortRecentPlaylists } from '@/utils/sortPlaylists';
import { getUserIdBySession } from '@/utils/user';

// 인기순, 최신순으로 플레이리스트 정렬
export const usePopularPlaylists = () => {
  const [playlistsByPopularity, setPlaylistsByPopularity] = useState<PlaylistModel[]>([]);
  const [recentPlaylists, setRecentPlaylists] = useState<PlaylistModel[]>([]);

  const {
    data: allPlaylists,
    isLoading: isLoadingForAllPlaylist,
    error: errorForAllPlaylist,
  } = useAllPlaylist(); // 모든 플레이리스트 가져오기

  const userId = getUserIdBySession();

  const { data: forkedPlaylists } = useForkedPlaylists(userId); // 사용자가 포크한 플레이리스트 가져오기
  const userIds = forkedPlaylists?.map((playlist: PlaylistModel) => playlist.userId);
  const uniqueUserIds = [...new Set(userIds)]; // 중복 userId 제거 후, 다시 배열로
  const forkedPlaylistsQueries = useForkedPlaylistsByUserIds(uniqueUserIds); // 여러 사용자가 포크한 플레이리스트 가져오기

  const isLoadingForAllForkedPlaylist = forkedPlaylistsQueries.some((query) => query.isLoading);
  const errorForAllForkedPlaylist = forkedPlaylistsQueries.find((query) => query.error);
  const allForkedPlaylists = forkedPlaylistsQueries.flatMap((query) => query.data || []);

  useEffect(() => {
    const fetchPlaylists = async () => {
      const playlistsByPopularity = sortPlaylistsByPopularity(allPlaylists as PlaylistModel[]);
      const recentPlaylists = sortRecentPlaylists(allPlaylists as PlaylistModel[]);

      setPlaylistsByPopularity(playlistsByPopularity);
      setRecentPlaylists(recentPlaylists);
    };

    fetchPlaylists();
  }, [allPlaylists]);

  return {
    popularAndRecentPlaylists: {
      playlistsByPopularity,
      recentPlaylists,
      isLoadingForAllPlaylist,
      errorForAllPlaylist,
    },
    interestedPlaylists: {
      allForkedPlaylists,
      isLoadingForAllForkedPlaylist,
      errorForAllForkedPlaylist,
    },
  };
};
