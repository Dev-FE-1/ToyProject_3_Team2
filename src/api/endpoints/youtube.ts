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
    throw new Error('No video data found');
  }

  return {
    title: item.snippet.title,
    // channelTitle: item.snippet.channelTitle,
    // channelId: item.snippet.channelId,
    thumbnailUrl: item.snippet.thumbnails.medium.url,
    duration: item.contentDetails.duration,
    // publishedAt: new Date(item.snippet.publishedAt).toLocaleDateString(),
  };
};

// title: 영상 제목
// channelTitle: 채널 이름
// channelId: 체널 id
// thumbnailUrl: 썸네일 url
// publishedAt: 업로드 날짜
