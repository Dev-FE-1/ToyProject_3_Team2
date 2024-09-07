import {
  useQueries,
  useQuery,
  UseQueryOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import {
  getAllPlaylists,
  getForkedPlaylists,
  getPlaylistsByCategory,
  deleteVideoFromPlaylist,
  deletePlaylist,
  updatePlaylist,
  getPlaylistWithUser,
  addVideoToPlaylist,
  updatePlaylistVideoOrder,
} from '@/api/endpoints/playlist';
import { QUERY_KEYS } from '@/constants/queryKey';
import { PlaylistModel, PlaylistFormDataModel, Video } from '@/types/playlist';
// 기본 옵션
const defaultOptions = {
  staleTime: 5 * 60 * 1000, // 기본 5분
};

// DB의 모든 플레이리스트 가져오기
export const useAllPlaylist = () =>
  useQuery({
    queryKey: [QUERY_KEYS.PLAYLIST_ALL_KEY],
    queryFn: () => getAllPlaylists(),
    ...defaultOptions,
  });

// 카테고리별로 플레이리스트 가져오기
export const usePlaylistsByCategory = (category: string) =>
  useQuery({
    queryKey: [QUERY_KEYS.PLAYLIST_CATEGORY_KEY, category],
    queryFn: () => getPlaylistsByCategory(category),
    ...defaultOptions,
  });

// 사용자(useId)가 포크한 플레이리스트 가져오기
export const useForkedPlaylists = (userId: string) =>
  useQuery({
    queryKey: [QUERY_KEYS.PLAYLIST_FORKED_KEY, userId],
    queryFn: () => getForkedPlaylists(userId),
    ...defaultOptions,
  });

// 여러 사용자(userIds)가 포크한 플레이리스트 가져오기
export const useForkedPlaylistsByUserIds = (userIds: string[]) =>
  useQueries({
    queries: userIds.map(
      (userId) =>
        ({
          queryKey: ['forkedPlaylists', userId],
          queryFn: () => getForkedPlaylists(userId),
        }) as UseQueryOptions<PlaylistModel[], Error, PlaylistModel[], [string, string]>
    ),
  });

// playlistId 의 플레이리스트 데이터 가져오기
export const usePlaylistQuery = (playlistId: string | undefined) =>
  useQuery({
    queryKey: [QUERY_KEYS.PLAYLIST_DETAIL_KEY, playlistId],
    queryFn: () => getPlaylistWithUser(playlistId || ''),
    enabled: !!playlistId,
  });

// playlistId 의 영상 삭제하기
export const useDeleteVideoMutation = (playlistId: string | undefined) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ playlistId, videoId }: { playlistId: string; videoId: string }) =>
      deleteVideoFromPlaylist(playlistId, videoId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PLAYLIST_DETAIL_KEY, playlistId] });
    },
  });
};

// playlistId 의 플레이리스트 삭제하기
export const useDeletePlaylistMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (playlistId: string) => deletePlaylist(playlistId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PLAYLIST_ALL_KEY] });
    },
  });
};

// playlistId 의 데이터 업데이트하기
export const useUpdatePlaylistMutation = (playlistId: string | undefined) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      playlistId,
      formData,
    }: {
      playlistId: string;
      formData: PlaylistFormDataModel;
    }) => updatePlaylist(playlistId, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PLAYLIST_DETAIL_KEY, playlistId] });
    },
  });
};

export const useAddVideoToPlaylistMutation = (playlistId: string | undefined) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newVideo: Video) => addVideoToPlaylist(playlistId, newVideo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PLAYLIST_DETAIL_KEY, playlistId] });
    },
  });
};

export const useUpdatePlaylistVideoOrderMutation = (playlistId: string | undefined) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newVideoOrder: Video[]) => {
      if (!playlistId) {
        throw new Error('Playlist ID is undefined');
      }
      return updatePlaylistVideoOrder(playlistId, newVideoOrder);
    },
    onSuccess: () => {
      if (playlistId) {
        queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PLAYLIST_DETAIL_KEY, playlistId] });
      }
    },
  });
};

// 아래는 useQueries 이해를 위한 주석
// React Query v4부터 useQueries의 인터페이스 변경, 객체를 인자로 받아요~
// const results = useQueries([
//   { queryKey: ['post', 1], queryFn: () => fetchPost(1) },
//   { queryKey: ['post', 2], queryFn: () => fetchPost(2) },
//   // ... 더 많은 쿼리들
// ]);

// React Query v4 이상의 버전
// const results = useQueries({
//   queries: [
//     { queryKey: ['post', 1], queryFn: fetchPost, staleTime: Infinity },
//     { queryKey: ['post', 2], queryFn: fetchPost, staleTime: Infinity },
//   // ... 더 많은 쿼리들
//   ],
// })
