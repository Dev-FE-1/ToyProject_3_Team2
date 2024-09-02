import { css } from '@emotion/react';
import { RiArrowRightSLine } from 'react-icons/ri';

import PlaylistSection from '@/components/home/PlaylistSextion';
import { useAuthStatus } from '@/hooks/useAuthStaus';
import theme from '@/styles/theme';

const Home: React.FC = () => {
  const interestPlaylists = [
    // "내 관심사와 비슷한 플레이리스트" 데이터
  ];

  const popularPlaylists = [
    // "인기 플레이리스트" 데이터
  ];

  return (
    <div>
      <img src='/logo.svg' alt='Logo' css={logoStyle} />
      <PlaylistSection
        title='내 관심사와 비슷한 플레이리스트'
        playlists={interestPlaylists}
        onSeeAllClick={() => console.log('내 관심사 더보기 클릭')}
      />
      <PlaylistSection
        title='인기 플레이리스트'
        playlists={popularPlaylists}
        onSeeAllClick={() => console.log('인기 플레이리스트 더보기 클릭')}
      />
    </div>
  );
};

// 스타일 정의
const logoStyle = css`
  width: 120px;
  margin: 2rem 0 1rem 1rem;
`;

export default Home;
