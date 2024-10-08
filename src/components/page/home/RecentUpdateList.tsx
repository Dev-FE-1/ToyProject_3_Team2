import { useState } from 'react';

import { css } from '@emotion/react';
import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

import { getPlaylistsWithPagination } from '@/api/endpoints/playlistFetch';
import ThumbNailBox from '@/components/common/ThumbNailBox';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import theme from '@/styles/theme';
import { PlaylistModel } from '@/types/playlist';
import { formatTimeWithUpdated } from '@/utils/formatDate';
import { formatNumberToK } from '@/utils/formatNumber';

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
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    try {
      const { playlists, lastVisible: newLastVisible } = await getPlaylistsWithPagination(
        pageSize,
        lastVisible
      );

      const publicPlaylists = playlists.filter((playlist) => playlist.isPublic === true);

      if (publicPlaylists.length > 0) {
        setVisiblePlaylists((prev) => [...prev, ...publicPlaylists]);
      }
      // 마지막 문서가 존재하지 않으면 데이터가 더 이상 없다고 판단
      if (!newLastVisible) {
        setHasMore(false);
      } else {
        setLastVisible(newLastVisible);
      }
    } catch (error) {
      console.error('Error fetching playlists:', error);
    } finally {
      setIsLoading(false);
    }
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
            likes={formatNumberToK(playlist.likeCount)}
            comments={playlist.commentCount}
            uploader={playlist.userName}
            update={formatTimeWithUpdated(playlist.updatedAt)}
            listnum={playlist.videoCount}
          />
        </div>
      ))}
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

export default RecentUpdateList;
