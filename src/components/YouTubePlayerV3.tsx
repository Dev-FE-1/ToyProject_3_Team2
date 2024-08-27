// YouTube Data API v3를 사용해 영상 가져오기
import { css } from '@emotion/react';

import { useVideoData } from '@/hooks/useVideoData';

interface YouTubePlayerProps {
  videoId: string | null;
}

const YouTubePlayerV3 = ({ videoId }: YouTubePlayerProps) => {
  const { data: videoData, isLoading, error } = useVideoData(videoId as string);

  if (isLoading) {
    return <div css={loadingStyle}>Loading...</div>;
  }

  if (error) {
    return <div css={loadingStyle}>Error: {(error as Error).message}</div>;
  }

  if (!videoData) {
    return <div css={loadingStyle}>No video data available</div>;
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

export default YouTubePlayerV3;
