import { useEffect, useState } from 'react';

import { css } from '@emotion/react';

import MyPlaylists from '@/components/mypage/MyPlaylists';
import MyProfile from '@/components/mypage/MyProfile';
import { Playlist } from '@/types/playlist';

const fetchMyPlaylists = async (): Promise<Playlist[]> => {
  const response = await fetch('/src/mock/playlists.json');
  const data = await response.json();
  return data;
};

const MyPage = () => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchMyPlaylists();
        setPlaylists(data);
      } catch (error) {
        console.error('Error fetching playlists:', error);
      }
    };

    fetchData();
  }, []);
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
