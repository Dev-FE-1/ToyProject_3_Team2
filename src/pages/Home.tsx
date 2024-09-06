import { css } from '@emotion/react';

import Spinner from '@/components/common/Spinner';
import CrossScrollingList from '@/components/page/home/CrossScrollingList';
import RecentUpdateList from '@/components/page/home/RecentUpdateList';
import { usePopularPlaylists } from '@/hooks/useSortedPlaylists';

const POPULAR_PLAYLIST = '인기 플레이리스트';
const INTERESTED_PLAYLIST = '내 관심사와 비슷한 플레이리스트';
const RECENTUPDATE_PLAYLIST = '최신 플레이리스트';
const LOGO = 'BOMVI';

const Home = () => {
  const { popularAndRecentPlaylists, interestedPlaylists } = usePopularPlaylists();
  const isLoading = popularAndRecentPlaylists.isLoadingForAllPlaylist;

  return (
    <div css={containerStyle}>
      <img src='/logo.svg' alt={LOGO} css={logoStyle} />

      {isLoading ? (
        <div css={spinnerStyle}>
          <Spinner />
        </div>
      ) : (
        <>
          {interestedPlaylists.allForkedPlaylists.length > 1 && (
            <CrossScrollingList
              title={INTERESTED_PLAYLIST}
              playlists={interestedPlaylists.allForkedPlaylists}
            />
          )}
          <CrossScrollingList
            title={POPULAR_PLAYLIST}
            playlists={popularAndRecentPlaylists.playlistsByPopularity}
          />
          <RecentUpdateList
            title={RECENTUPDATE_PLAYLIST}
            playlists={popularAndRecentPlaylists.recentPlaylists}
          />
        </>
      )}
    </div>
  );
};

const containerStyle = css`
  overflow-y: auto;
  padding-bottom: 80px;
`;

const logoStyle = css`
  width: 120px;
  margin: 2rem 0 1rem 1rem;
`;

const spinnerStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export default Home;
