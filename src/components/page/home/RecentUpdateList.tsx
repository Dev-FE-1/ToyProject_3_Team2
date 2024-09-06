import { useEffect, useState } from 'react';

import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';

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

const RecentUpdateList: React.FC<RecentUpdateListProps> = ({ title, playlists }) => {
  const navigate = useNavigate();
  const [visiblePlaylists, setVisiblePlaylists] = useState<PlaylistModel[]>([]); // 초기값을 빈 배열로 설정
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isFirstLoadComplete, setIsFirstLoadComplete] = useState(false);

  const loadMoreItems = () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    setTimeout(() => {
      console.log('Load more items');
      const nextPage = page + 1;
      const newVisiblePlaylists = playlists.slice(0, nextPage * 5); // 다음 5개의 항목을 가져옴
      setVisiblePlaylists(newVisiblePlaylists);
      setPage(nextPage);
      setIsLoading(false);

      // 모든 데이터를 로드했으면 더 이상 불러오지 않도록 무한 호출 방지
      if (newVisiblePlaylists.length >= playlists.length) {
        setHasMore(false);
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
    setVisiblePlaylists(playlists.slice(0, 5)); // 처음 5개 데이터를 불러오기
    setIsFirstLoadComplete(true); // 첫 로드가 끝났음을 표시
  }, [playlists]);

  return (
    <div>
      <h2 css={titleStyle}>{title}</h2>
      {visiblePlaylists.map((playlist) => (
        <div key={playlist.playlistId} onClick={() => navigate(`playlist/${playlist.playlistId}`)}>
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
