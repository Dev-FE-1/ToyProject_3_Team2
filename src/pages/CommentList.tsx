import { useState, useEffect } from 'react';

import { css } from '@emotion/react';
// import { collection, query, where, getDocs } from 'firebase/firestore';
import { RiPencilLine } from 'react-icons/ri';
import { useNavigate, useParams } from 'react-router-dom';

import { getPlaylistById } from '@/api/endpoints/playlist';
import CommentBox from '@/components/comment/CommentBox';
import IconTextButton from '@/components/common/buttons/IconTextButton';
import { useCommentsList } from '@/hooks/query/useComments';
import Header from '@/layouts/layout/Header';
import theme from '@/styles/theme';
import { Comment, PlaylistModel } from '@/types/playlist';
import { formatTimeWithUpdated } from '@/utils/formatDate';

const CommentList = () => {
  const { playlistId } = useParams<{ playlistId: string | undefined }>();
  const [comments, setComments] = useState<Comment[]>([]);
  const [playlistData, setPlaylistData] = useState<PlaylistModel | undefined>();
  const navigate = useNavigate();

  // const fetchComments = async () => {
  //   const q = query(collection(db, 'comments'), where('playlistId', '==', 'playlist101'));
  //   try {
  //     const querySnapshot = await getDocs(q);
  //     const commentsData = querySnapshot.docs.map((doc) => doc.data() as Comment);
  //     setComments(commentsData);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const { data: commentsData, error } = useCommentsList(playlistId);

  useEffect(() => {
    if (commentsData) {
      setComments(commentsData);
    } else if (error) {
      console.error('Failed to fetch comments:', error);
    }
    async function fetchPlaylistData() {
      if (playlistId) {
        try {
          const data = await getPlaylistById(playlistId);
          if (data) {
            setPlaylistData(data);
          }
        } catch (error) {
          console.error('Failed to fetch playlist data:', error);
        }
      }
    }

    fetchPlaylistData();
  }, [commentsData, error, playlistId]);

  return (
    <div>
      <Header />
      <div css={CommentTabStyle}>
        <div>
          <img src={playlistData?.thumbnailUrl} alt='미니 썸네일' />
          <div>
            <p>{playlistData?.title}</p>
            <p>{playlistData?.userName}</p>
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
          <p>댓글 수 {playlistData?.commentCount}</p>
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
      </div>
    </div>
  );
};

const CommentTabStyle = css`
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

export default CommentList;
