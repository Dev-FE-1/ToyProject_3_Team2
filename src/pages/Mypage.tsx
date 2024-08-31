import { useEffect, useState } from 'react';

import { css } from '@emotion/react';

import { getAllPlaylists } from '@/api/playlist';
import MyPlaylists from '@/components/mypage/MyPlaylists';
import MyProfile from '@/components/mypage/MyProfile';
import { Playlist } from '@/types/playlist';

const MyPage = () => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        setIsLoading(true);
        const data = await getAllPlaylists();
        setPlaylists(data);
      } catch (error) {
        setError(error instanceof Error ? error : new Error('알 수 없는 에러 발생!'));
      } finally {
        setIsLoading(false);
      }
    };
    fetchPlaylists();
  }, []);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <div css={containerStyle}>
      <MyProfile />
      <MyPlaylists playlists={playlists} />
    </div>
  );
};
const containerStyle = css`
  padding-bottom: 80px;
`;
export default MyPage;
