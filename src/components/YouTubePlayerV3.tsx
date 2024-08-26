// YouTube Data API v3를 사용해 영상 가져오기
import { useState, useEffect } from 'react';

import { css } from '@emotion/react';
import axios from 'axios';

interface VideoData {
  title: string; //영상 제목
  channelTitle: string; //채널 이름
  channelId: string; //체널 id
  thumbnailUrl: string; //썸네일 url
  publishedAt: string; //업로드 날짜
  viewCount: string; //조회수
  embedHtml: string; //html코드
}

interface YouTubePlayerProps {
  videoId: string;
}

const containerStyle = css`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const videoTitleStyle = css`
  font-size: 24px;
  margin-bottom: 20px;
`;

const videoContainerStyle = css`
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
  overflow: hidden;
  margin-bottom: 20px;

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

const videoInfoStyle = css`
  display: flex;
  align-items: flex-start;
`;

const videoThumbnailStyle = css`
  width: 120px;
  height: auto;
  margin-right: 20px;
`;

const videoDetailsStyle = css`
  flex-grow: 1;

  p {
    margin: 5px 0;
  }
`;

const loadingStyle = css`
  text-align: center;
  font-size: 18px;
  margin-top: 50px;
`;

const YouTubePlayerV3 = ({ videoId }: YouTubePlayerProps) => {
  const [videoData, setVideoData] = useState<VideoData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchVideoData = async () => {
    try {
      console.log('Fetching video data for ID:', videoId);
      console.log('Using API Key:', import.meta.env.VITE_YOUTUBE_API_KEY);

      const response = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
        params: {
          part: 'snippet,statistics,player',
          id: videoId,
          key: import.meta.env.VITE_YOUTUBE_API_KEY,
        },
      });

      console.log('API Response:', response.data);

      const item = response.data.items[0];

      if (!item) {
        throw new Error('No video data found');
      }

      setVideoData({
        title: item.snippet.title,
        channelTitle: item.snippet.channelTitle,
        channelId: item.snippet.channelId,
        thumbnailUrl: item.snippet.thumbnails.medium.url,
        publishedAt: new Date(item.snippet.publishedAt).toLocaleDateString(),
        viewCount: item.statistics.viewCount,
        embedHtml: item.player.embedHtml,
      });
    } catch (error) {
      console.error('Error fetching video data:', error);
      setError('Failed to load video data. Please check the console for more details.');
    }
  };

  useEffect(() => {
    fetchVideoData();
  }, [videoId]);

  if (!videoData) {
    return <div css={loadingStyle}>Loading...</div>;
  }

  return (
    <div css={containerStyle}>
      <h2 css={videoTitleStyle}>{videoData.title}</h2>
      <div css={videoContainerStyle} dangerouslySetInnerHTML={{ __html: videoData.embedHtml }} />
      <div css={videoInfoStyle}>
        <img css={videoThumbnailStyle} src={videoData.thumbnailUrl} alt={videoData.title} />
        <div css={videoDetailsStyle}>
          <p>
            Channel:{' '}
            <a href={`https://www.youtube.com/channel/${videoData.channelId}`}>
              {videoData.channelTitle}
            </a>
          </p>
          <p>Upload Date: {videoData.publishedAt}</p>
          <p>Views: {parseInt(videoData.viewCount).toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default YouTubePlayerV3;
