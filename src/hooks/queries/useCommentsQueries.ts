import { useQuery } from '@tanstack/react-query';

import { getPlaylistComments } from '@/api/endpoints/comment';
import { QUERY_KEYS } from '@/constants/queryKey';

const defaultOptions = {
  staleTime: 2000, // 기본 20초
};

export const useCommentsList = (playlistId: string | undefined) =>
  useQuery({
    queryKey: [QUERY_KEYS.COMMENT_KEY, playlistId],
    queryFn: () => getPlaylistComments(playlistId),
    ...defaultOptions,
  });
