import React from 'react';

import { css } from '@emotion/react';
import { VscKebabVertical } from 'react-icons/vsc';

import VideoCard from '@/components/common/VideoCard';
import theme from '@/styles/theme';
import { Playlist } from '@/types/playlist';

interface VideoBoxDetailProps {
  video: Playlist['videos'][0];
  channelName: string;
  uploadDate: string;
  type: 'host' | 'visitor';
  onClick?: () => void;
  onClickKebob?: (_event: React.MouseEvent<SVGElement, MouseEvent>) => void;
}

const VideoBoxDetail: React.FC<VideoBoxDetailProps> = ({
  video,
  channelName,
  uploadDate,
  type,
  onClick,
  onClickKebob,
}) => {
  const { thumbnailUrl, duration, title } = video;

  const formatDuration = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div css={containerStyle} onClick={onClick}>
      {type === 'host' && (
        <VscKebabVertical
          css={kebabIconStyle}
          onClick={(e) => {
            e.stopPropagation();
            onClickKebob && onClickKebob(e);
          }}
        />
      )}
      <VideoCard type='main' thumbURL={thumbnailUrl} time={formatDuration(duration)} />
      <div css={detailsStyle}>
        <h3 css={titleStyle}>{title}</h3>
        <p css={channelStyle}>{channelName}</p>
        <p css={dateStyle}>{uploadDate}</p>
      </div>
    </div>
  );
};

const kebabIconStyle = css`
  position: absolute;
  top: 8px;
  right: 8px;
  color: ${theme.colors.white};
  cursor: pointer;
`;

const containerStyle = css`
  position: relative;
  display: flex;
  align-items: flex-start;
  margin-bottom: 1rem;
  margin-left: 1rem;
  margin-right: 1rem;
`;

const detailsStyle = css`
  margin-left: 1rem;
  flex: 1;
`;

const titleStyle = css`
  font-size: ${theme.fontSizes.normal};
  color: ${theme.colors.white};
  margin-top: 2px;
  height: 34px;
`;

const channelStyle = css`
  font-size: ${theme.fontSizes.small};
  color: ${theme.colors.disabled};
  margin-top: 8px;
  height: 14px;
`;

const dateStyle = css`
  font-size: ${theme.fontSizes.small};
  color: ${theme.colors.disabled};
  margin-top: 8px;
  height: 14px;
`;

export default VideoBoxDetail;
