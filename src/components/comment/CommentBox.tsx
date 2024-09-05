import React, { useEffect, useState } from 'react';

import { css } from '@emotion/react';
import { RiCloseFill } from 'react-icons/ri';

import defaultImg from '@/assets/images/default-avatar-man.svg';
import theme from '@/styles/theme';
import { Comment } from '@/types/playlist';
import { getUserIdBySession } from '@/utils/user';

const CommentBox: React.FC<Comment> = ({
  profileImg,
  userName,
  content,
  createdAt,
  userId: curUserId,
}: Comment) => {
  const [commentUserId, setCommentUserId] = useState<string | null>(null);
  const handleDelBtnClick = () => {
    console.log('delete!');
  };

  useEffect(() => {
    const uid = getUserIdBySession();
    setCommentUserId(uid);
  }, []);

  return (
    <>
      <div css={CommentListStyle}>
        <div>
          <img src={profileImg || defaultImg} alt='미니 썸네일' />
          <div>
            <h1>{userName}</h1>
            <h2>{createdAt}</h2>
            <h3>{content}</h3>
          </div>
        </div>
        {commentUserId === curUserId && (
          <RiCloseFill css={deleteIconStyle} onClick={handleDelBtnClick} />
        )}
      </div>
      <hr css={CommentHorizonSytle} />
    </>
  );
};

const CommentListStyle = css`
  margin: 10px 0;
  display: flex;
  justify-content: space-between;

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

const deleteIconStyle = css`
  display: flex;
  cursor: pointer;
  width: 20px;
  height: 20px;
`;

const CommentHorizonSytle = css`
  border: 0;
  height: 1px;
  background-color: ${theme.colors.tertiary};
  margin: 10px 0;
`;
export default CommentBox;
