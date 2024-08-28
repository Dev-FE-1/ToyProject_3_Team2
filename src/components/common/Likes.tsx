import React from 'react';

import { css } from '@emotion/react';
import { GoHeart, GoHeartFill } from 'react-icons/go';

import theme from '@/styles/theme';
import { formatNumberToK } from '@/utils/formatNumberToK';

interface LikesProps {
  playlistId: string;
  likeCount?: number;
  handleLikeClick: (playListId: string) => void;
  isLiked: boolean;
}

const Likes: React.FC<LikesProps> = ({ playlistId, likeCount = 0, handleLikeClick, isLiked }) => {
  const formattedLikeCount = formatNumberToK(likeCount as number);
  // console.log(isLiked);
  return (
    <button css={buttonStyle} onClick={() => handleLikeClick(playlistId)} aria-label='Likes'>
      {isLiked ? <GoHeartFill /> : <GoHeart />}
      <span>{formattedLikeCount}</span>
    </button>
  );
};

const buttonStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  height: 100%;
  background-color: transparent;
  color: inherit;
  border: 0;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:active {
    transform: scale(0.95);
  }

  svg {
    margin-right: 6px;
    font-size: ${theme.fontSizes.large};
  }

  span {
    font-weight: 300;
  }
`;

export default React.memo(Likes);
