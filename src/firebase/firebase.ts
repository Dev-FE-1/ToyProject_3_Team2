import { initializeApp } from 'firebase/app';
// import { getAuth } from 'firebase/auth';
import { getFirestore, doc, setDoc, collection, addDoc } from 'firebase/firestore';

import { firebaseConfig } from './firebaseConfig';

// Firebase 초기화
const app = initializeApp(firebaseConfig);

// Firestore 인스턴스 가져오기
export const db = getFirestore(app);

// getAuth의 용량이 크므로,
// 로그인/로그아웃 시 주석 비활성화하는 것이 좋아보임
// // Auth 인스턴스 가져오기
// export const auth = getAuth(app);

async function setupFinalData() {
  // users 컬렉션 추가
  const users = [
    { id: 'user1', username: '음악좋아', email: 'music@example.com' },
    { id: 'user2', username: '팝스타', email: 'popstar@example.com' },
    { id: 'user3', username: '록맨', email: 'rockman@example.com' },
  ];

  for (const user of users) {
    await setDoc(doc(db, 'users', user.id), {
      ...user,
      profileImg: `https://example.com/${user.id}.jpg`,
      playlistCount: 1,
      totalLikes: 2,
      totalForks: 1,
    });
  }

  // playlist 컬렉션 추가
  const playlists = [
    {
      userId: 'user1',
      title: '여름 플레이리스트',
      description: '시원한 여름 노래 모음',
      category: '팝',
      likeCount: 2,
      forkCount: 1,
      commentCount: 2,
      videoCount: 2,
    },
    {
      userId: 'user2',
      title: '운동할 때 듣는 음악',
      description: '활력 넘치는 운동 음악',
      category: '힙합',
      likeCount: 2,
      forkCount: 1,
      commentCount: 2,
      videoCount: 2,
    },
    {
      userId: 'user3',
      title: '클래식 명곡 모음',
      description: '편안한 클래식 음악',
      category: '클래식',
      likeCount: 2,
      forkCount: 1,
      commentCount: 2,
      videoCount: 2,
    },
  ];

  const playlistIds = [];

  for (const playlist of playlists) {
    const playlistRef = await addDoc(collection(db, 'playlists'), {
      ...playlist,
      createdAt: new Date(),
      updatedAt: new Date(),
      thumbnailUrl: `https://example.com/playlist${Math.floor(Math.random() * 10)}.jpg`,
      isPublic: true,
      videos: [
        {
          videoId: `video${Math.random().toString(36).substr(2, 9)}`,
          title: `${playlist.category} Hit Song`,
          thumbnailUrl: `https://example.com/thumb${Math.floor(Math.random() * 10)}.jpg`,
          duration: Math.floor(Math.random() * 300) + 120,
        },
        {
          videoId: `video${Math.random().toString(36).substr(2, 9)}`,
          title: `Another ${playlist.category} Song`,
          thumbnailUrl: `https://example.com/thumb${Math.floor(Math.random() * 10)}.jpg`,
          duration: Math.floor(Math.random() * 300) + 120,
        },
      ],
    });

    playlistIds.push(playlistRef.id);

    // 댓글 추가
    await addDoc(collection(db, 'comments', playlistRef.id, 'playlistComments'), {
      userId: 'user1',
      username: '음악좋아',
      content: '좋은 플레이리스트네요!',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await addDoc(collection(db, 'comments', playlistRef.id, 'playlistComments'), {
      userId: 'user2',
      username: '팝스타',
      content: '제 취향이에요.',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  // userPlaylists 추가
  await setDoc(doc(db, 'userPlaylists', 'user1'), {
    created: [playlistIds[0]],
    forked: [playlistIds[1]],
    liked: [playlistIds[1], playlistIds[2]],
  });

  await setDoc(doc(db, 'userPlaylists', 'user2'), {
    created: [playlistIds[1]],
    forked: [playlistIds[2]],
    liked: [playlistIds[0], playlistIds[2]],
  });

  await setDoc(doc(db, 'userPlaylists', 'user3'), {
    created: [playlistIds[2]],
    forked: [playlistIds[0]],
    liked: [playlistIds[0], playlistIds[1]],
  });

  console.log('Final initial data setup completed');
}

setupFinalData().catch(console.error);
