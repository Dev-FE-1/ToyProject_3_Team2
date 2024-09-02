import React from 'react';

import { css } from '@emotion/react';

import PlaylistSection from '@/components/home/PlaylistSextion';
import { useAllPlaylist, usePlaylistsByCategory } from '@/hooks/query/usePlaylist';

const Home = () => {
  const mockMyInterestPlaylists = [
    {
      id: 1,
      thumURL: 'https://i.imgur.com/zvHEnru.png',
      title: '월요병 물리치는 플리',
      likes: 1200,
      uploader: 'DJ Smooth',
      listnum: 20,
    },
    {
      id: 2,
      thumURL: 'https://i.imgur.com/zvHEnru.png',
      title: '월요병 전부 물리치는 플리',
      likes: 1500,
      uploader: 'Fitness Guru',
      listnum: 30,
    },
    {
      id: 3,
      thumURL: 'https://i.imgur.com/zvHEnru.png',
      title: '월요병 싫어병 플리',
      likes: 800,
      uploader: 'Study Buddy',
      listnum: 25,
    },
    {
      id: 4,
      thumURL: 'https://i.imgur.com/zvHEnru.png',
      title: '월요병 싫다구요',
      likes: 2200,
      uploader: 'Party Master',
      listnum: 40,
    },
  ];

  // 인기 플레이리스트 목업 데이터
  const mockPopularPlaylists = [
    {
      id: 1,
      thumURL: 'https://i.imgur.com/zvHEnru.png',
      title: '월요병 물리치는 플리',
      likes: 1200,
      uploader: 'DJ Smooth',
      listnum: 20,
    },
    {
      id: 2,
      thumURL: 'https://i.imgur.com/zvHEnru.png',
      title: '월요병 전부 물리치는 플리',
      likes: 1500,
      uploader: 'Fitness Guru',
      listnum: 30,
    },
    {
      id: 3,
      thumURL: 'https://i.imgur.com/zvHEnru.png',
      title: '월요병 싫어병 플리',
      likes: 800,
      uploader: 'Study Buddy',
      listnum: 25,
    },
    {
      id: 4,
      thumURL: 'https://i.imgur.com/zvHEnru.png',
      title: '월요병 싫다구요',
      likes: 2200,
      uploader: 'Party Master',
      listnum: 40,
    },
  ];

  // 목업 데이터를 사용하는 로직
  const myInterestPlaylists = mockMyInterestPlaylists;
  const popularPlaylists = mockPopularPlaylists;

  return (
    <div>
      <img src='/logo.svg' alt='Logo' css={logoStyle} />
      <PlaylistSection
        title='내 관심사와 비슷한 플레이리스트'
        playlists={myInterestPlaylists}
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
