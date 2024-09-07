// Youtube API

import { fetchYoutubeData } from '@/api/apiClient';
import { getVideoId } from '@/utils/getVideoId';

export const getVideoData = async (url: string) => {
  const videoId = getVideoId(url);
  const response = await fetchYoutubeData.get('/videos', {
    params: {
      part: 'snippet,statistics,player,contentDetails',
      id: videoId,
    },
  });

  const item = response.data.items[0];

  if (!item) {
    throw new Error('해당 동영상을 찾을 수 없습니다.');
  }

  return {
    title: item.snippet.title,
    thumbnailUrl: item.snippet.thumbnails.medium.url,
    duration: item.contentDetails.duration,
  };
};
