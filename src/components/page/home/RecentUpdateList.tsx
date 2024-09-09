import { useState } from 'react';

import { css } from '@emotion/react';
import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

import { getPlaylistsWithPagination } from '@/api/endpoints/playlistFetch';
import Spinner from '@/components/common/Spinner';
import ThumbNailBox from '@/components/common/ThumbNailBox';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import theme from '@/styles/theme';
import { PlaylistModel } from '@/types/playlist';
import { formatTimeWithUpdated } from '@/utils/formatDate';

interface RecentUpdateListProps {
  title: string;
  playlists: PlaylistModel[];
}

const RecentUpdateList: React.FC<RecentUpdateListProps> = ({ title }) => {
  const navigate = useNavigate();
  const [visiblePlaylists, setVisiblePlaylists] = useState<PlaylistModel[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const pageSize = 5; // 한 번에 불러올 항목의 개수
  const [lastVisible, setLastVisible] = useState<QueryDocumentSnapshot<DocumentData> | null>(null); // 페이지네이션을 위한 마지막 문서 스냅샷

  const loadMoreItems = async () => {
    if (isLoading) return;

    setIsLoading(true);
    setTimeout(async () => {
      try {
        const { playlists, lastVisible: newLastVisible } = await getPlaylistsWithPagination(
          pageSize,
          lastVisible
        );

        const publicPlaylists = playlists.filter((playlist) => playlist.isPublic === true);

        // 불러온 데이터가 있으면 상태 업데이트
        if (publicPlaylists.length > 0) {
          setVisiblePlaylists((prev) => [...prev, ...publicPlaylists]);
        }

        // 데이터를 다 가져왔을 경우 처음부터 다시 시작
        if (!newLastVisible) {
          setLastVisible(null); // lastVisible을 초기화하여 처음부터 다시 가져오도록 설정
          setHasMore(true); // 다시 처음부터 가져오기 위해 hasMore를 true로 설정
        } else {
          // 마지막 문서가 존재하면 업데이트
          setLastVisible(newLastVisible);
        }
      } catch (error) {
        console.error('Error fetching playlists:', error);
      } finally {
        setIsLoading(false);
      }
    }, 200); // 데이터 불러오는 속도가 너무 빨라서 딜레이
  };

  const targetRef = useInfiniteScroll(loadMoreItems, hasMore);

  return (
    <div>
      <h2 css={titleStyle}>{title}</h2>
      {visiblePlaylists.map((playlist) => (
        <div
          key={playlist.playlistId}
          onClick={() =>
            navigate(`/playlist/${playlist.playlistId}`, {
              state: { previousPath: location.pathname },
            })
          }
        >
          <ThumbNailBox
            type='recent'
            thumURL={playlist.thumbnailUrl}
            title={playlist.title}
            subtitle={playlist.description}
            likes={playlist.likeCount}
            comments={playlist.commentCount}
            uploader={playlist.userName}
            update={formatTimeWithUpdated(playlist.updatedAt)}
            listnum={playlist.videoCount}
          />
        </div>
      ))}

      {isLoading && (
        <div css={spinnerStyle}>
          <Spinner />
        </div>
      )}

      {/* 무한 스크롤 트리거 요소 */}
      {hasMore && (
        <div ref={targetRef} style={{ height: '20px', backgroundColor: 'transparent' }} />
      )}
    </div>
  );
};

const titleStyle = css`
  display: flex;
  align-items: center;
  font-size: ${theme.fontSizes.normal};
  font-weight: 700;
  margin-left: 1rem;
`;

const spinnerStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default RecentUpdateList;
