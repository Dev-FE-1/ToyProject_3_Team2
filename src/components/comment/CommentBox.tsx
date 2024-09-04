import React from 'react';

import { css } from '@emotion/react';

import theme from '@/styles/theme';
import { Comment } from '@/types/playlist';

const CommentBox: React.FC<Comment> = ({
  commentId,
  userId,
  playlistId,
  userName,
  content,
  createdAt,
  updatedAt,
}: Comment) => {
  const a = 1;

  return (
    <div css={CommentListStyle}>
      <div>
        <img src='' alt='미니 썸네일' />
        <div>
          <h1>{userName}</h1>
          <h2>{createdAt}</h2>
          <h3>
            {content}
            {/* {' '}
            나 지금 심심한데 뭐 할거없나...? 이거 누가 봐??? 아님 혼자 그냥 하는거야? 나 지금
            심심한데 뭐 할거없나...? 이거 누가 봐??? 아님 혼자 그냥 하는거야? */}
          </h3>
        </div>
      </div>
    </div>
  );
};

const CommentListStyle = css`
  margin: 10px 0;
  display: flex;

  div {
    display: flex;
    justify-content: center;

    div {
      margin-left: 8px;
      display: flex;
      flex-direction: column;
      gap: 5px;

      ::after {
        border: 0;
        height: 1px;
        background-color: ${theme.colors.tertiary};
        margin: 10px 0;
      }
    }
  }

  img {
    width: 35px;
    height: 35px;
    border-radius: 50%;
  }
  h1 {
    font-size: ${theme.fontSizes.normal};
    height: 17px;
    max-width: 100px; //한글 8글자 기준
  }

  h2 {
    font-size: ${theme.fontSizes.small};
    height: 14px;
    max-width: 70px; // 0000-00-00 형태 기준
  }
  h3 {
    display: flex;
    align-items: center;
    margin-top: 12px;
    // height: 22px;
    font-size: ${theme.fontSizes.normal};
  }
`;

export default CommentBox;
