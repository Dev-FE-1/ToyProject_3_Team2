import { useState } from 'react';

import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';

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
  const [visiblePlaylists, setVisiblePlaylists] = useState<PlaylistModel[]>(playlists.slice(0, 10)); // 처음 10개의 항목만 표시
  const [page, setPage] = useState(1);

  const loadMoreItems = () => {
    console.log('Load more items');
    const nextPage = page + 1;
    const newVisiblePlaylists = playlists.slice(0, nextPage * 5); // 다음 10개의 항목을 가져옴
    setVisiblePlaylists(newVisiblePlaylists);
    setPage(nextPage);
  };

  const targetRef = useInfiniteScroll(loadMoreItems);

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

      {/* 무한 스크롤 트리거 요소 */}
      <div ref={targetRef} style={{ height: '20px', backgroundColor: 'transparent' }} />
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
