import { useMutation, useQueryClient } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/constants/queryKey';
import { usePlaylistStore } from '@/store/usePlaylistStore';
import { PlaylistFormDataModel } from '@/types/playlist';

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
