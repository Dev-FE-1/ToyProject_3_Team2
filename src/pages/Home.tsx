import { css } from '@emotion/react';

import CrossScrolling from '@/components/home/CrossScrolling';
import RecentUpdateSection from '@/components/home/RecentUpdateSection';
import { usePopularPlaylists } from '@/hooks/useSortedPlaylists';

const POPULAR_PLAYLIST = '인기 플레이리스트';
const INTERESTED_PLAYLIST = '내 관심사와 비슷한 플레이리스트';
const RECENTUPDATE_PLAYLIST = '최신 플레이리스트';
const LOGO = 'BOMVI';

const Home = () => {
  const { popularAndRecentPlaylists, interestedPlaylists } = usePopularPlaylists();

  return (
    <div css={containerStyle}>
      <img src='/logo.svg' alt={LOGO} css={logoStyle} />

      <CrossScrolling
        title={INTERESTED_PLAYLIST}
        playlists={interestedPlaylists.allForkedPlaylists}
      />
      <CrossScrolling
        title={POPULAR_PLAYLIST}
        playlists={popularAndRecentPlaylists.playlistsByPopularity}
      />
      <RecentUpdateSection
        title={RECENTUPDATE_PLAYLIST}
        playlists={popularAndRecentPlaylists.recentPlaylists}
      />
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

export default Home;
