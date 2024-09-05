import React from 'react';

import { css } from '@emotion/react';
import { GoKebabHorizontal } from 'react-icons/go';

import VideoCard from '@/components/common/VideoCard';
import theme from '@/styles/theme';
import { PlaylistModel } from '@/types/playlist';
import { formatDurationISOToTime, formatDurationSecondToTime } from '@/utils/formatTime';

interface VideoBoxDetailProps {
  video: PlaylistModel['videos'][0];
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
  return (
    <div css={containerStyle} onClick={onClick}>
      {type === 'host' && (
        <GoKebabHorizontal
          css={kebabIconStyle}
          onClick={(e) => {
            e.stopPropagation();
            onClickKebob && onClickKebob(e);
          }}
        />
      )}
      <VideoCard type='main' thumbURL={thumbnailUrl} duration={duration} />
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
  top: 2px;
  right: 8px;
  color: ${theme.colors.white};
  cursor: pointer;
  transform: rotate(90deg);
  width: 16px;
  height: 16px;
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
  width: 90%;
  font-size: ${theme.fontSizes.normal};
  color: ${theme.colors.white};
  margin-top: 2px;
  height: 28px;

  /* 여러 줄 오버플로우 처리 */
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
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
