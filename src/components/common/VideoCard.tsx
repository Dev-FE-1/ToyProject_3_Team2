import React from 'react';

import { css } from '@emotion/react';

import Badge from '@/components/common/Badge';

interface VideoCardProps {
  onClick?: () => void;
  thumbURL?: string;
  time?: string;
  width?: string;
  height?: string;
  type: 'main' | 'underbar';
}

const VideoCard: React.FC<VideoCardProps> = ({ onClick, thumbURL, time, type, width, height }) => (
  <div css={cardStyle(type, width, height)} onClick={onClick}>
    <img src={thumbURL} alt='Video thumbnail' css={imageStyle} />
    {type === 'main' && time && <Badge position='corner'>{time}</Badge>}
  </div>
);
const cardStyle = (type: 'main' | 'underbar', width?: string, height?: string) => css`
  position: relative;
  cursor: pointer;
  overflow: hidden;
  border-radius: 8px;
  min-width: ${type === 'main' ? '145px' : width || 'auto'};
  min-height: ${type === 'main' ? '85px' : height || 'auto'};
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.3);
`;

const imageStyle = css`
  height: 100%;
  width: auto;
  object-fit: cover;
`;
export default VideoCard;
