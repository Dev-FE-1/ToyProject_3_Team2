import { useState, useEffect } from 'react';

import { css } from '@emotion/react';
import { RiPencilLine } from 'react-icons/ri';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { getPlaylistById } from '@/api/endpoints/playlistFetch';
import IconTextButton from '@/components/common/buttons/IconTextButton';
import SelectBox from '@/components/common/SelectBox';
import Toast from '@/components/common/Toast';
import CommentBox from '@/components/page/comment/CommentBox';
import { COMMENT_FILTER_OPTIONS } from '@/constants/comment';
import { PATH } from '@/constants/path';
import { useCommentsList } from '@/hooks/queries/useCommentsQueries';
import Header from '@/layouts/layout/Header';
import { useToastStore } from '@/store/useToastStore';
import theme from '@/styles/theme';
import { Comment, PlaylistModel } from '@/types/playlist';

const CommentList = () => {
  const { playlistId } = useParams<{ playlistId: string | undefined }>();
  const [comments, setComments] = useState<Comment[]>([]); // 직접 comments 조작
  const [playlistData, setPlaylistData] = useState<PlaylistModel | undefined>();
  const [selectedFilter, setSelectedFilter] = useState<string>('latest');
  const showToast = useToastStore((state) => state.showToast);
  const navigate = useNavigate();
  const location = useLocation();
  const { toastMessage, refetchComments } = location.state || {};

  const filterOptions = COMMENT_FILTER_OPTIONS;

  const goToCommentForm = () => {
    navigate(`${PATH.COMMENT_ADD.replace(':playlistId', playlistId ?? '')}`, {
      state: {
        playlistId,
        title: playlistData?.title,
        userName: playlistData?.userName,
        thumbnailUrl: playlistData?.thumbnailUrl,
      },
    });
  };

  const handleFilterChange = (value: string) => {
    setSelectedFilter(value);
    setComments([...comments].reverse());
  }; // 댓글 필터링

  const { data: commentsData, error, refetch } = useCommentsList(playlistId);

  useEffect(() => {
    if (commentsData) {
      setComments(commentsData);
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

  useEffect(() => {
    if (toastMessage) {
      showToast(toastMessage);
      navigate(location.pathname, { replace: true });
    }
  }, [toastMessage, showToast, navigate, location.pathname]);

  useEffect(() => {
    if (refetchComments) {
      refetch(); // 댓글을 새로 불러옴
      navigate(location.pathname, { replace: true });
    }
  }, [refetchComments, refetch, navigate, location.pathname]);

  return (
    <div css={containerStyle}>
      <Header
        onBack={() =>
          navigate(`/playlist/${playlistId}`, {
            state: { previousPath: location.pathname },
          })
        }
      />
      <Toast />
      <div css={CommentTabStyle}>
        <div>
          <img src={playlistData?.thumbnailUrl} alt='playlist' />
          <div>
            <p>{playlistData?.title}</p>
            <p>{playlistData?.userName}</p>
          </div>
        </div>
        <IconTextButton
          Icon={RiPencilLine}
          variant='light'
          iconPosition='left'
          onClick={goToCommentForm}
        >
          쓰기
        </IconTextButton>
      </div>
      <div css={CommentListDivStyle}>
        <div css={CommentListTopStyle}>
          <p>댓글 수 {playlistData?.commentCount}</p>
          <SelectBox items={filterOptions} value={selectedFilter} onChange={handleFilterChange} />
        </div>
        {comments.map((comment) => (
          <CommentBox
            key={comment.commentId}
            comment={comment}
            setComments={setComments}
            setPlaylistData={setPlaylistData}
          />
        ))}
      </div>
    </div>
  );
};

export const CommentTabStyle = css`
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

const containerStyle = css`
  padding-bottom: 80px;
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

  p {
    display: flex;
    align-items: center;
  }
`;

export default CommentList;
