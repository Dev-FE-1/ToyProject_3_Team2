import React, { useEffect, useState } from 'react';

import { css } from '@emotion/react';
import { RiCloseFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

import { deleteComment } from '@/api/endpoints/comment';
import { getPlaylistById } from '@/api/endpoints/playlistFetch';
import defaultImg from '@/assets/images/default-avatar-man.svg';
import CustomDialog from '@/components/common/modals/Dialog';
import Toast from '@/components/common/Toast';
import { COMMENTS } from '@/constants/comment';
import { useToastStore } from '@/store/useToastStore';
import theme from '@/styles/theme';
import { Comment, PlaylistModel } from '@/types/playlist';
import { formatTimeWithUpdated } from '@/utils/formatDate';
import { getUserIdBySession } from '@/utils/user';

interface CommentBoxProps {
  comment: Comment;
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
  setPlaylistData?: React.Dispatch<React.SetStateAction<PlaylistModel | undefined>>;
}

const CommentBox: React.FC<CommentBoxProps> = ({
  comment,
  setComments,
  setPlaylistData,
}: CommentBoxProps) => {
  const [commentUserId, setCommentUserId] = useState<string | null>(null);
  const { showToast } = useToastStore();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleDelBtnClick = async () => {
    if (!comment.playlistId || !comment.commentId) {
      console.error('Missing playlistId or commentId');
      return;
    }

    try {
      await deleteComment(comment.playlistId, comment.commentId);
      showToast(COMMENTS.toast.del_successed);

      const updatedPlaylistData = await getPlaylistById(comment.playlistId);
      setPlaylistData?.(updatedPlaylistData);

      setComments((prevComments) =>
        prevComments.filter((prevComment) => prevComment.commentId !== comment.commentId)
      );
    } catch (error) {
      console.error('댓글 삭제 중 오류 발생: ', error);
      showToast(COMMENTS.toast.del_failed);
    }
  };

  const handleProfileClick = () => {
    if (commentUserId !== comment.userId) {
      navigate(`/mypage/${comment.userId}`);
    }
  };

  useEffect(() => {
    const uid = getUserIdBySession();
    setCommentUserId(uid);
  }, []);

  const isMyComment = commentUserId === comment.userId;

  return (
    <>
      <div css={CommentListStyle(isMyComment)}>
        <div>
          <img src={comment.profileImg || defaultImg} alt='profile' onClick={handleProfileClick} />
          <div>
            <h1>{comment.userName}</h1>
            <h2>{formatTimeWithUpdated(comment.createdAt)}</h2>
            <h3>{comment.content}</h3>
          </div>
        </div>
        {isMyComment && <RiCloseFill css={deleteIconStyle} onClick={openModal} />}
      </div>
      <hr css={CommentHorizonSytle} />
      <CustomDialog
        type='alertConfirm'
        customContent={{
          title: '댓글을 삭제하시겠습니까?',
          confirmText: '삭제',
          cancelText: '취소',
        }}
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={handleDelBtnClick}
      />
      <Toast />
    </>
  );
};

const CommentListStyle = (isClickable: boolean) => css`
  margin: 10px 0;
  display: flex;
  justify-content: space-between;

  div {
    display: flex;
    justify-content: center;

    img {
      cursor: ${isClickable ? 'default' : 'pointer'};
    }
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
