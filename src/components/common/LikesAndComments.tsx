import { css } from '@emotion/react';
import { FaRegComment, FaRegHeart, FaHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import useLikeCount from '@/hooks/useLikeCount';
import theme from '@/styles/theme';
import { formatNumberToK } from '@/utils/formatNumberToK';

interface LikesAndCommentsProps {
  playListId: number;
  commentCount?: number;
  initialLikeCount?: number;
  isBackGround?: boolean;
}

const LikesAndComments: React.FC<LikesAndCommentsProps> = ({
  playListId,
  commentCount = 0,
  initialLikeCount = 0,
  isBackGround = true,
}) => {
  const navigate = useNavigate();

  const { likeCount, handleLikeClick, isLiked } = useLikeCount(initialLikeCount);

  const handleCommentClick = () => {
    navigate(`/${playListId}/comments`);
  };

  const formattedCommentCount = formatNumberToK(commentCount);
  const formattedLikeCount = formatNumberToK(likeCount);

  return (
    <div css={containerStyle(isBackGround)}>
      {/* aria-label: 스크린 리더 사용자에게 요소의 목적이나 기능을 설명 */}
      <button css={buttonStyle} onClick={handleCommentClick} aria-label='Comments'>
        <FaRegComment />
        <span>{formattedCommentCount}</span>
      </button>
      {isBackGround && <div css={dividerStyle} />}
      <button css={buttonStyle} onClick={handleLikeClick} aria-label='Likes'>
        {isLiked ? <FaHeart /> : <FaRegHeart />}
        <span>{formattedLikeCount}</span>
      </button>
    </div>
  );
};

const containerStyle = (isBackGround: boolean) => css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: ${theme.heights.short};
  background-color: ${isBackGround ? theme.colors.tertiary : 'transparent'};
  border-radius: 22px;
  font-size: ${theme.fontSizes.normal};
  color: ${theme.colors.white};
  overflow: hidden;
`;

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

const dividerStyle = css`
  width: 1px;
  height: 23px;
  background-color: ${theme.colors.white};
  opacity: 0.3;
`;

export default LikesAndComments;
