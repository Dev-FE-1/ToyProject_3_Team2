import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  deleteVideoFromPlaylist,
  deletePlaylist,
  updatePlaylist,
  addVideoToPlaylist,
  updatePlaylistVideoOrder,
} from '@/api/endpoints/playlist';
import { QUERY_KEYS } from '@/constants/queryKey';
import { usePlaylistStore } from '@/store/usePlaylistStore';
import { PlaylistFormDataModel, Video } from '@/types/playlist';
interface AddPlaylistProps {
  formData: PlaylistFormDataModel;
  userId: string;
  userName: string;
}
export const useAddPlaylist = () => {
  const queryClient = useQueryClient();
  const { addNewPlaylist } = usePlaylistStore();

  return useMutation<string, Error, AddPlaylistProps>({
    mutationFn: async ({ formData, userId, userName }) => {
      const newPlaylistId = await addNewPlaylist(formData, userId, userName);
      return newPlaylistId;
    },
    onSuccess: (_, variables) => {
      // 플레이스트 추가한후에 관련 쿼리 무효화해주기
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PLAYLIST_ALL_KEY, variables.userId] }); // 해당 사용자의 모든 플레이리스트
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USER_USERID_KEY, variables.userId] }); // 해당 사용자의 정보
    },
  });
};

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
