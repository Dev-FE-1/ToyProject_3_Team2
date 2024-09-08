import React, { useEffect, useState } from 'react';

import { css } from '@emotion/react';
import { RiCloseFill } from 'react-icons/ri';

import { deleteComment } from '@/api/endpoints/comment';
import { getPlaylistById } from '@/api/endpoints/playlistFetch';
import defaultImg from '@/assets/images/default-avatar-man.svg';
import Toast from '@/components/common/Toast';
import { useCommentsList } from '@/hooks/queries/useCommentsQueries';
import { useToastStore } from '@/store/useToastStore';
import theme from '@/styles/theme';
import { Comment, PlaylistModel } from '@/types/playlist';
import { formatTimeWithUpdated } from '@/utils/formatDate';
import { getUserIdBySession } from '@/utils/user';

interface CommentBoxProps extends Comment {
  comments: Comment;
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
  playlistData?: PlaylistModel | undefined;
  setPlaylistData?: React.Dispatch<React.SetStateAction<PlaylistModel | undefined>>;
  playlistId: string | undefined;
}

const CommentBox: React.FC<CommentBoxProps> = ({
  comments,
  setComments,
  setPlaylistData,
  playlistId,
}: CommentBoxProps) => {
  const [commentUserId, setCommentUserId] = useState<string | null>(null);
  const { showToast } = useToastStore();
  const { refetch } = useCommentsList(playlistId);

  const handleDelBtnClick = async (commentData: {
    playlistId: string | undefined;
    commentId: string | undefined;
  }) => {
    if (!commentData.playlistId) {
      console.error('playlistId가 없습니다.');
      return;
    }
    if (!commentData.commentId) {
      console.error('commnetId가 없습니다.');
      return;
    }

    try {
      await deleteComment(commentData.playlistId, commentData.commentId);
      showToast('댓글이 삭제되었습니다');

      const updatedPlaylistData = await getPlaylistById(commentData.playlistId);

      if (setPlaylistData && updatedPlaylistData) {
        setPlaylistData(updatedPlaylistData);
      } // playlist의 commentCount 갱신

      setComments((prevComments) =>
        prevComments.filter((comment) => comment.commentId !== comments.commentId)
      ); // 삭제된 comment 빼고 comments 갱신

      await refetch();
    } catch (error) {
      console.error('댓글 삭제 중 오류 발생: ', error);
    }
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
          <RiCloseFill
            css={deleteIconStyle}
            onClick={() =>
              handleDelBtnClick({
                playlistId: comments.playlistId,
                commentId: comments.commentId,
              })
            }
          />
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
