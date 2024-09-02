import React from 'react';

import { css } from '@emotion/react';

import PlaylistSection from '@/components/home/PlaylistSextion';
import { useAllPlaylist, usePlaylistsByCategory } from '@/hooks/query/usePlaylist';

const Home = () => {
  const mockMyInterestPlaylists = [
    {
      id: 1,
      thumbnailUrl: 'https://i.imgur.com/zvHEnru.png',
      title: '월요병 물리치는 플리',
      description: '월요일 아침을 활기차게 시작할 수 있는 플레이리스트입니다.',
      category: '힐링',
      createdAt: '2024-08-01',
      updatedAt: '2024-08-25',
      likeCount: 1200,
      forkCount: 100,
      commentCount: 50,
      videoCount: 20,
      isPublic: true,
      userId: 'DJ Smooth',
      videos: [], // 실제 비디오 데이터는 나중에 채워야 함
    },
    {
      id: 2,
      thumbnailUrl: 'https://i.imgur.com/zvHEnru.png',
      title: '월요병 전부 물리치는 플리',
      description: '모든 월요병을 날려버릴 만큼 에너지 넘치는 플레이리스트입니다.',
      category: '운동',
      createdAt: '2024-08-03',
      updatedAt: '2024-08-25',
      likeCount: 1500,
      forkCount: 150,
      commentCount: 75,
      videoCount: 30,
      isPublic: true,
      userId: 'Fitness Guru',
      videos: [], // 실제 비디오 데이터는 나중에 채워야 함
    },
    {
      id: 3,
      thumbnailUrl: 'https://i.imgur.com/zvHEnru.png',
      title: '월요병 싫어병 플리',
      description: '월요일을 조금이라도 덜 싫어할 수 있게 도와주는 음악들.',
      category: '공부',
      createdAt: '2024-08-05',
      updatedAt: '2024-08-25',
      likeCount: 800,
      forkCount: 80,
      commentCount: 30,
      videoCount: 25,
      isPublic: true,
      userId: 'Study Buddy',
      videos: [], // 실제 비디오 데이터는 나중에 채워야 함
    },
    {
      id: 4,
      thumbnailUrl: 'https://i.imgur.com/zvHEnru.png',
      title: '월요병 싫다구요',
      description: '월요병이 더 이상 두렵지 않도록 힘을 주는 플레이리스트입니다.',
      category: '파티',
      createdAt: '2024-08-07',
      updatedAt: '2024-08-25',
      likeCount: 2200,
      forkCount: 200,
      commentCount: 90,
      videoCount: 40,
      isPublic: true,
      userId: 'Party Master',
      videos: [], // 실제 비디오 데이터는 나중에 채워야 함
    },
    {
      id: 5,
      thumbnailUrl: 'https://i.imgur.com/zvHEnru.png',
      title: '월요병 물리치는 플리',
      description: '월요일 아침을 활기차게 시작할 수 있는 플레이리스트입니다.',
      category: '힐링',
      createdAt: '2024-08-01',
      updatedAt: '2024-08-25',
      likeCount: 1200,
      forkCount: 100,
      commentCount: 50,
      videoCount: 20,
      isPublic: true,
      userId: 'DJ Smooth',
      videos: [], // 실제 비디오 데이터는 나중에 채워야 함
    },
    {
      id: 6,
      thumbnailUrl: 'https://i.imgur.com/zvHEnru.png',
      title: '월요병 전부 물리치는 플리',
      description: '모든 월요병을 날려버릴 만큼 에너지 넘치는 플레이리스트입니다.',
      category: '운동',
      createdAt: '2024-08-03',
      updatedAt: '2024-08-25',
      likeCount: 1500,
      forkCount: 150,
      commentCount: 75,
      videoCount: 30,
      isPublic: true,
      userId: 'Fitness Guru',
      videos: [], // 실제 비디오 데이터는 나중에 채워야 함
    },
    {
      id: 7,
      thumbnailUrl: 'https://i.imgur.com/zvHEnru.png',
      title: '월요병 싫어병 플리',
      description: '월요일을 조금이라도 덜 싫어할 수 있게 도와주는 음악들.',
      category: '공부',
      createdAt: '2024-08-05',
      updatedAt: '2024-08-25',
      likeCount: 800,
      forkCount: 80,
      commentCount: 30,
      videoCount: 25,
      isPublic: true,
      userId: 'Study Buddy',
      videos: [], // 실제 비디오 데이터는 나중에 채워야 함
    },
    {
      id: 8,
      thumbnailUrl: 'https://i.imgur.com/zvHEnru.png',
      title: '월요병 싫다구요',
      description: '월요병이 더 이상 두렵지 않도록 힘을 주는 플레이리스트입니다.',
      category: '파티',
      createdAt: '2024-08-07',
      updatedAt: '2024-08-25',
      likeCount: 2200,
      forkCount: 200,
      commentCount: 90,
      videoCount: 40,
      isPublic: true,
      userId: 'Party Master',
      videos: [], // 실제 비디오 데이터는 나중에 채워야 함
    },
  ];

  // 인기 플레이리스트 목업 데이터
  const mockPopularPlaylists = [
    {
      id: 1,
      thumbnailUrl: 'https://i.imgur.com/zvHEnru.png',
      title: '월요병 물리치는 플리',
      description: '월요일 아침을 활기차게 시작할 수 있는 플레이리스트입니다.',
      category: '힐링',
      createdAt: '2024-08-01',
      updatedAt: '2024-08-25',
      likeCount: 1200,
      forkCount: 100,
      commentCount: 50,
      videoCount: 20,
      isPublic: true,
      userId: 'DJ Smooth',
      videos: [], // 실제 비디오 데이터는 나중에 채워야 함
    },
    {
      id: 2,
      thumbnailUrl: 'https://i.imgur.com/zvHEnru.png',
      title: '월요병 전부 물리치는 플리',
      description: '모든 월요병을 날려버릴 만큼 에너지 넘치는 플레이리스트입니다.',
      category: '운동',
      createdAt: '2024-08-03',
      updatedAt: '2024-08-25',
      likeCount: 1500,
      forkCount: 150,
      commentCount: 75,
      videoCount: 30,
      isPublic: true,
      userId: 'Fitness Guru',
      videos: [], // 실제 비디오 데이터는 나중에 채워야 함
    },
    {
      id: 3,
      thumbnailUrl: 'https://i.imgur.com/zvHEnru.png',
      title: '월요병 싫어병 플리',
      description: '월요일을 조금이라도 덜 싫어할 수 있게 도와주는 음악들.',
      category: '공부',
      createdAt: '2024-08-05',
      updatedAt: '2024-08-25',
      likeCount: 800,
      forkCount: 80,
      commentCount: 30,
      videoCount: 25,
      isPublic: true,
      userId: 'Study Buddy',
      videos: [], // 실제 비디오 데이터는 나중에 채워야 함
    },
    {
      id: 4,
      thumbnailUrl: 'https://i.imgur.com/zvHEnru.png',
      title: '월요병 싫다구요',
      description: '월요병이 더 이상 두렵지 않도록 힘을 주는 플레이리스트입니다.',
      category: '파티',
      createdAt: '2024-08-07',
      updatedAt: '2024-08-25',
      likeCount: 2200,
      forkCount: 200,
      commentCount: 90,
      videoCount: 40,
      isPublic: true,
      userId: 'Party Master',
      videos: [], // 실제 비디오 데이터는 나중에 채워야 함
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
