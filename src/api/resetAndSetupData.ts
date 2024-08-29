import { doc, setDoc, collection, addDoc, deleteDoc, getDocs } from 'firebase/firestore';

import { db } from './firebase';

const resetAndSetupData = async () => {
  // // 기존 데이터 삭제
  const collections = ['users', 'playlists', 'userPlaylists', 'comments'];
  for (const collectionName of collections) {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const deletePromises = querySnapshot.docs.map((doc) => deleteDoc(doc.ref));
    await Promise.all(deletePromises);
    console.log(`Deleted all documents in ${collectionName}`);
  }

  // 사용자 추가
  const users = [
    { id: 'user1', username: '음악좋아', email: 'music@example.com' },
    { id: 'user2', username: '팝스타', email: 'popstar@example.com' },
    { id: 'user3', username: '록맨', email: 'rockman@example.com' },
  ];

  for (const user of users) {
    await setDoc(doc(db, 'users', user.id), {
      ...user,
      profileImg: `https://example.com/profiles/${user.username}.jpg`,
      playlistCount: 1,
      totalLikes: 2,
      totalForks: 1,
    });
  }

  // 플레이리스트 추가
  const playlists = [
    {
      userId: 'user1',
      title: '여름 플레이리스트',
      description: '시원한 여름 노래 모음',
      category: '팝',
      thumbnailUrl:
        'https://pimg.mk.co.kr/meet/neds/2015/10/image_readtop_2015_1003729_14453904372182822.jpg',
      videos: [
        { videoId: 'dQw4w9WgXcQ', title: 'Rick Astley - Never Gonna Give You Up', duration: 213 },
        { videoId: 'JGwWNGJdvx8', title: 'Ed Sheeran - Shape of You', duration: 261 },
      ],
    },
    {
      userId: 'user2',
      title: '운동할 때 듣는 음악',
      description: '활력 넘치는 운동 음악',
      category: '힙합',
      thumbnailUrl:
        'https://t1.daumcdn.net/thumb/R720x0.fpng/?fname=http://t1.daumcdn.net/brunch/service/user/8fXh/image/0_JTh3JET7ZCHaT_IJhG4VbhEpI.png',
      videos: [
        { videoId: '5qm8PH4xAss', title: 'Eminem - Till I Collapse', duration: 298 },
        { videoId: 'j5-yKhDd64s', title: 'Eminem - Not Afraid', duration: 248 },
      ],
    },
    {
      userId: 'user3',
      title: '클래식 명곡 모음',
      description: '편안한 클래식 음악',
      category: '클래식',
      thumbnailUrl:
        'https://talkimg.imbc.com/TVianUpload/tvian/TViews/image/2022/04/14/47e220f1-ac87-4313-a7e0-db72f1387356.jpg',
      videos: [
        { videoId: '4Tr0otuiQuU', title: 'Beethoven - Moonlight Sonata', duration: 900 },
        { videoId: 'PKhB4QRIKjk', title: 'Mozart - Eine kleine Nachtmusik', duration: 1080 },
      ],
    },
  ];

  const playlistRefs = [];
  for (const playlist of playlists) {
    const playlistRef = await addDoc(collection(db, 'playlists'), {
      ...playlist,
      createdAt: new Date(),
      updatedAt: new Date(),
      likeCount: 2,
      forkCount: 1,
      commentCount: 2,
      videoCount: playlist.videos.length,
      isPublic: true,
    });
    playlistRefs.push(playlistRef);

    // 각 플레이리스트에 댓글 추가
    for (let i = 0; i < 2; i++) {
      const commentUser = users[i];
      await addDoc(collection(db, 'comments', playlistRef.id, 'playlistComments'), {
        userId: commentUser.id,
        username: commentUser.username,
        content: `Great playlist! Comment ${i + 1}`,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
  }

  // 사용자의 플레이리스트에 대한 활동(포크, 생성, 좋아요) 관계 userPlaylists 추가
  for (let i = 0; i < users.length; i++) {
    await setDoc(doc(db, 'userPlaylists', users[i].id), {
      created: [playlistRefs[i].id],
      forked: [playlistRefs[(i + 1) % 3].id],
      liked: [playlistRefs[(i + 1) % 3].id, playlistRefs[(i + 2) % 3].id],
    });
  }

  console.log('Data reset and setup completed');
};

resetAndSetupData().catch(console.error);
