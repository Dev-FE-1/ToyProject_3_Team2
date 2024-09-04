import { useState, useEffect } from 'react';

import { css } from '@emotion/react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { RiPencilLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

import { db } from '@/api/index';
import CommentBox from '@/components/comment/CommentBox';
import IconTextButton from '@/components/common/buttons/IconTextButton';
import Header from '@/layouts/layout/Header';
import theme from '@/styles/theme';
import { Comment } from '@/types/playlist';
import { formatTimeWithUpdated } from '@/utils/formatDate';

const CommentList = () => {
  // const { commentData, loading, error } = usePlaylistComments(playlistId, 10);
  const [comments, setComments] = useState<Comment[]>([]);
  const navigate = useNavigate();

  // if (loading) <div>Loading comments...</div>;
  // if (error) <div>{error}</div>;

  const fetchComments = async () => {
    const q = query(collection(db, 'comments'), where('playlistId', '==', 'playlist101'));
    try {
      const querySnapshot = await getDocs(q);
      const commentsData = querySnapshot.docs.map((doc) => doc.data() as Comment);
      setComments(commentsData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchComments();
  });
  return (
    <div>
      <Header />
      <div css={commentTop}>
        <div>
          <img
            src='https://www.urbanbrush.net/web/wp-content/uploads/edd/2023/02/urban-20230228144115810458.jpg'
            alt='미니 썸네일'
          />
          <div>
            <p>개쩌는 플레이리스트 볼사람 여기여기 붙어라</p>
            <p>김아무개</p>
          </div>
        </div>
        <IconTextButton
          Icon={RiPencilLine}
          variant='light'
          iconPosition='left'
          onClick={() => navigate('/')}
        >
          쓰기
        </IconTextButton>
      </div>
      <div css={CommentListDivStyle}>
        <div css={CommentListTopStyle}>
          {/* 댓글 수 / 필터 div */}
          <p>댓글 수 3</p>
          <p>필터</p>
        </div>
        {comments.map((comment) => (
          <CommentBox
            key={comment.commentId}
            commentId={comment.commentId}
            playlistId={comment.playlistId}
            userId={comment.userId}
            userName={comment.userName}
            content={comment.content}
            createdAt={formatTimeWithUpdated(comment.createdAt)}
            updatedAt={comment.updatedAt}
          />
        ))}
        <hr css={horizonStyle} />
      </div>
    </div>
  );
};

const commentTop = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  background-color: ${theme.colors.tertiary};
  div {
    display: flex;
    justify-content: center;
    div {
      margin-left: 16px;
      display: flex;
      flex-direction: column;
      gap: 9px;
    }
  }

  img {
    width: 50px;
    height: 50px;
  }

  p {
    width: 200px;
    display: inline-block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

const CommentListDivStyle = css`
  display: flex;
  flex-direction: column;
  margin: 0 16px;
`;

const CommentListTopStyle = css`
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
`;

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

const horizonStyle = css`
  border: 0;
  height: 1px;
  background-color: ${theme.colors.tertiary};
  margin: 10px 0;
`;
export default CommentList;
