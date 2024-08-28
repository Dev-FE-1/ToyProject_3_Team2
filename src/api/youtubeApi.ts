import axios from 'axios';

const youtubeApi = axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3',
  params: {
    key: import.meta.env.VITE_YOUTUBE_API_KEY,
  },
});

export const getVideoData = async (videoId: string) => {
  const response = await youtubeApi.get('/videos', {
    params: {
      part: 'snippet,statistics,player',
      id: videoId,
    },
  });

  const item = response.data.items[0];

  if (!item) {
    throw new Error('No video data found');
  }

  return {
    title: item.snippet.title,
    channelTitle: item.snippet.channelTitle,
    channelId: item.snippet.channelId,
    thumbnailUrl: item.snippet.thumbnails.medium.url,
    publishedAt: new Date(item.snippet.publishedAt).toLocaleDateString(),
    viewCount: item.statistics.viewCount,
    embedHtml: item.player.embedHtml,
  };
};

// title: 영상 제목
// channelTitle: 채널 이름
// channelId: 체널 id
// thumbnailUrl: 썸네일 url
// publishedAt: 업로드 날짜
// viewCount: 조회수
// embedHtml: html코드
