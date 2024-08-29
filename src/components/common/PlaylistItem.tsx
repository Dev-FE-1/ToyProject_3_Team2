import React from 'react';

import { css } from '@emotion/react';
import { GoBookmark, GoBookmarkFill } from 'react-icons/go';

import theme from '@/styles/theme';

interface PlaylistItemProps {
  onClick: () => void;
  thumURL: string;
  title: string;
  isPublic: boolean;
  isBookmarked: boolean;
}

const PlaylistItem: React.FC<PlaylistItemProps> = ({
  title,
  isPublic,
  thumURL,
  isBookmarked,
  onClick,
}) => (
  <div css={itemStyle} onClick={onClick}>
    <div css={thumbnailStyle(thumURL)}></div>
    <div css={textContainerStyle}>
      <p css={titleStyle}>{title}</p>
      <p css={subtitleStyle}>{isPublic ? '공개' : '비공개'}</p>
    </div>
    {isBookmarked ? <GoBookmarkFill css={iconStyle} /> : <GoBookmark css={iconStyle} />}
  </div>
);

const itemStyle = css`
  display: flex;
  align-items: center;
  padding: 0.5rem;
  cursor: pointer;
`;

const thumbnailStyle = (thumbnailUrl: string) => css`
  width: 50px;
  height: 50px;
  background-color: ${theme.colors.primary};
  background-image: url(${thumbnailUrl});
  background-size: cover;
  background-position: center;
  border-radius: 4px;
  margin-right: 19px;
`;

const textContainerStyle = css`
  flex: 1;
`;

const titleStyle = css`
  color: ${theme.colors.white};
  font-size: ${theme.fontSizes.large};
  margin: 0;
`;

const subtitleStyle = css`
  color: ${theme.colors.darkGray};
  font-size: ${theme.fontSizes.normal};
  margin: 4px 0 0;
`;

const iconStyle = css`
  color: white;
  font-size: 1.5rem;
`;

export default PlaylistItem;
