import React, { useEffect, useState } from 'react';

import { css } from '@emotion/react';
import { doc, deleteDoc } from 'firebase/firestore';
import { RiCloseFill } from 'react-icons/ri';

import { db } from '@/api';
import defaultImg from '@/assets/images/default-avatar-man.svg';
import Toast from '@/components/common/Toast';
import { useToastStore } from '@/store/useToastStore';
import theme from '@/styles/theme';
import { Comment } from '@/types/playlist';
import { formatTimeWithUpdated } from '@/utils/formatDate';
import { getUserIdBySession } from '@/utils/user';
interface CommentBoxProps extends Comment {
  comments: Comment;
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
}
const CommentBox: React.FC<CommentBoxProps> = ({ comments, setComments }: CommentBoxProps) => {
  const [commentUserId, setCommentUserId] = useState<string | null>(null);
  const { showToast } = useToastStore();

  const handleDelBtnClick = async () => {
    if (!comments.commentId) {
      console.error('commentId가 없습니다.');
      return;
    }
    try {
      if (commentUserId === comments.userId) {
        const commentRef = doc(db, 'comments', comments.commentId);
        await deleteDoc(commentRef);

        showToast('댓글이 삭제되었습니다');
      } else {
        console.log('삭제 권한이 없습니다.');
      }
    } catch (error) {
      console.error('댓글 삭제 중 오류 발생:', error);
    }

    setComments((prevComments) =>
      prevComments.filter((comment) => comment.commentId !== comments.commentId)
    );
  };

  useEffect(() => {
    const uid = getUserIdBySession();
    setCommentUserId(uid);
  }, []);

  return (
    <>
      <div css={CommentListStyle}>
        <div>
          <img src={comments.profileImg || defaultImg} alt='미니 썸네일' />
          <div>
            <h1>{comments.userName}</h1>
            <h2>{formatTimeWithUpdated(comments.createdAt)}</h2>
            <h3>{comments.content}</h3>
          </div>
        </div>
        {commentUserId === comments.userId && (
          <RiCloseFill css={deleteIconStyle} onClick={handleDelBtnClick} />
        )}
      </div>
      <hr css={CommentHorizonSytle} />
      <Toast />
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
    object-fit: cover;
  }
  h1 {
    font-size: ${theme.fontSizes.normal};
    height: 17px;
    max-width: 100px; //한글 8글자 기준
  }

  h2 {
    font-size: ${theme.fontSizes.small};
    height: 14px;
    max-width: 100px; // 0000-00-00 형태 기준
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
