import { useEffect, useState } from 'react';

import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';

import { getAllPlaylists } from '@/api/endpoints/playlist';
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
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isFirstLoadComplete, setIsFirstLoadComplete] = useState(false);

  const loadMoreItems = async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    setTimeout(async () => {
      console.log('Load more items');
      try {
        const newPlaylists = await getAllPlaylists(5 * page); // API 호출, 페이지당 5개 가져오기
        if (newPlaylists.length === 0) {
          setHasMore(false);
        } else {
          setVisiblePlaylists((prev) => [...prev, ...newPlaylists]); // 새로운 데이터를 기존 배열에 추가
          setPage(page + 1);
        }
      } catch (error) {
        console.error('Error fetching playlists:', error);
      } finally {
        setIsLoading(false);
      }
    }, 1000); // 데이터 불러오는 속도가 너무 빨라서 1초 딜레이
  };

  const targetRef = useInfiniteScroll(() => {
    if (isFirstLoadComplete) {
      loadMoreItems();
    }
  }, hasMore);

  // 첫 로딩시 데이터 가져오기
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const initialPlaylists = await getAllPlaylists(5); // 처음 5개 데이터를 불러오기
        setVisiblePlaylists(initialPlaylists);
        setIsFirstLoadComplete(true);
      } catch (error) {
        console.error('Error fetching initial playlists:', error);
      }
    };

    fetchInitialData();
  }, []);

  return (
    <div>
      <h2 css={titleStyle}>{title}</h2>
      {visiblePlaylists.map((playlist, index) => (
        <div
          key={`${playlist.playlistId}-${index}`}
          onClick={() => navigate(`playlist/${playlist.playlistId}`)}
        >
          <ThumbNailBox
            type='details'
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
