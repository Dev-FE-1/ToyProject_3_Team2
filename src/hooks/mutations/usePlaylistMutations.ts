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
import { PlaylistFormDataModel, Video, PlaylistModel } from '@/types/playlist';
import { UserModel } from '@/types/user';
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

// 플레이리스트에 영상 추가
export const useAddVideoToPlaylistMutation = (playlistId: string | undefined) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newVideo: Video) => addVideoToPlaylist(playlistId, newVideo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PLAYLIST_DETAIL_KEY, playlistId] });
    },
  });
};

// 드래그 앤 드랍
export const useUpdatePlaylistVideoOrderMutation = (playlistId: string | undefined) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newVideoOrder: Video[]) =>
      updatePlaylistVideoOrder(playlistId || '', newVideoOrder),
    onMutate: async (newVideoOrder) => {
      if (!playlistId) return;

      // 기존 쿼리 취소
      await queryClient.cancelQueries({ queryKey: [QUERY_KEYS.PLAYLIST_DETAIL_KEY, playlistId] });

      // 이전 데이터 스냅샷
      const previousData = queryClient.getQueryData<{ playlist: PlaylistModel; user: UserModel }>([
        QUERY_KEYS.PLAYLIST_DETAIL_KEY,
        playlistId,
      ]);

      // 낙관적 업데이트
      if (previousData) {
        queryClient.setQueryData([QUERY_KEYS.PLAYLIST_DETAIL_KEY, playlistId], {
          ...previousData,
          playlist: { ...previousData.playlist, videos: newVideoOrder },
        });
      }

      return { previousData };
    },
    onError: (err, newVideoOrder, context) => {
      if (playlistId && context?.previousData) {
        queryClient.setQueryData(
          [QUERY_KEYS.PLAYLIST_DETAIL_KEY, playlistId],
          context.previousData
        );
      }
    },
    onSettled: () => {
      if (playlistId) {
        queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PLAYLIST_DETAIL_KEY, playlistId] });
      }
    },
  });
};
