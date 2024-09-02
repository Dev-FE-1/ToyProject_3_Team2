import { css } from '@emotion/react';
import { FaRegComment } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import theme from '@/styles/theme';
import { formatNumberToK } from '@/utils/formatNumber';

interface CommentsButtonProps {
  playListId: string;
  commentCount?: number;
}

const CommentsButton: React.FC<CommentsButtonProps> = ({ playListId, commentCount = 0 }) => {
  const navigate = useNavigate();

  const handleCommentClick = () => navigate(`/${playListId}/comments`);

  const formattedCommentCount = formatNumberToK(commentCount);

  return (
    // aria-label: 스크린 리더 사용자에게 요소의 목적이나 기능을 설명 */
    <button css={buttonStyle} onClick={handleCommentClick} aria-label='Comments'>
      <FaRegComment />
      <span>{formattedCommentCount}</span>
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

export default CommentsButton;

// 사용방법
// 아래처럼 container와 divider이 필요
// <div css={containerStyle} key={playlist.playListId}>
//    <CommentsButton playListId={playlist.playListId} commentCount={playlist.commentCount} />
//    <div css={dividerStyle} />
//    <LikesButton initialLikeCount={playlist.initialLikeCount} />
// </div>

// '좋아요'와 '댓글' 컴포넌트를 사용하는 부모 컴포넌트에서 아래 스타일을 추가
// 1. 배경이 없는 경우,
// containerStyle의 background-color를 transparent로 수정
// dividerStyle 제거

// const containerStyle = css`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   width: 150px;
//   height: ${theme.heights.short};
//   background-color: ${theme.colors.tertiary};
//   border-radius: 22px;
//   font-size: ${theme.fontSizes.normal};
//   color: ${theme.colors.white};
//   overflow: hidden;
// `;

// const dividerStyle = css`
//   width: 1px;
//   height: 23px;
//   background-color: ${theme.colors.white};
//   opacity: 0.3;
// `;
