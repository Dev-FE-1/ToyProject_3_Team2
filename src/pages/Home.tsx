import React from 'react';

import { css } from '@emotion/react';

import PlaylistSection from '@/components/home/PlaylistSection';
import RecentUpdateSection from '@/components/home/RecentUpdateSection';

const HomePage = () => {
  const mockMyInterestPlaylists = [
    {
      playlistId: '1',
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
      videos: [],
    },
    {
      playlistId: '2',
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
      videos: [],
    },
    {
      playlistId: '3',
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
      videos: [],
    },
    {
      playlistId: '4',
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
      videos: [],
    },
    {
      playlistId: '5',
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
      videos: [],
    },
    {
      playlistId: '6',
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
      videos: [],
    },
    {
      playlistId: '7',
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
      videos: [],
    },
    {
      playlistId: '8',
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
      videos: [],
    },
  ];

  // 인기 플레이리스트 목업 데이터
  const mockPopularPlaylists = [
    {
      playlistId: '1',
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
      videos: [],
    },
    {
      playlistId: '2',
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
      videos: [],
    },
    {
      playlistId: '3',
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
      videos: [],
    },
    {
      playlistId: '4',
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
      videos: [],
    },
  ];

  return (
    <div css={homeContainerStyle}>
      <img src='/logo.svg' alt='Logo' css={logoStyle} />
      <PlaylistSection
        title='내 관심사와 비슷한 플레이리스트'
        playlists={mockMyInterestPlaylists}
      />
      <PlaylistSection title='인기 플레이리스트' playlists={mockPopularPlaylists} />
      <RecentUpdateSection
        title='내 관심사와 비슷한 플레이리스트'
        playlists={mockMyInterestPlaylists}
      />
    </div>
  );
};

// 스타일 정의

const homeContainerStyle = css`
  overflow-y: auto;
  height: 100vh;
  -webkit-overflow-scrolling: touch;
  padding-bottom: 80px;

  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const logoStyle = css`
  width: 120px;
  margin: 2rem 0 1rem 1rem;
`;

export default HomePage;
