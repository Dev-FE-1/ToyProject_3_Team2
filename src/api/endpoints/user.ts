// 사용자 관련 파이어베이스 API 함수

import { getFirestore, doc, getDoc } from 'firebase/firestore';

import { app } from '@/api'; // Firebase 앱 초기화 파일
import { UserModel, UserPlaylistsModel } from '@/types/user';

const db = getFirestore(app);

// 사용자 정보 조회
export const getUserData = async (userId: string): Promise<UserModel | null> => {
  if (!userId) {
    throw new Error('유효한 사용자 ID가 없습니다.');
  }

  try {
    const userDocRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      return null;
    }

    const data = userDoc.data();

    return {
      userId: userDoc.id,
      userName: data.userName || '',
      userBio: data.userBio || '',
      email: data.email || '',
      profileImg: data.profileImg || '',
      playlistCount: data.playlistCount || 0,
      totalLikes: data.totalLikes || 0,
      totalForks: data.totalForks || 0,
    };
  } catch (error) {
    throw new Error('getUserData() 에러가 발생했습니다.');
  }
};

// 사용자와 플레이리스트와의 관계(생성, 좋아요, 포크) 조회
export const getUserPlaylists = async (userId: string): Promise<UserPlaylistsModel | null> => {
  try {
    const userPlaylistsRef = doc(db, 'userPlaylists', userId);
    const userPlaylistsDoc = await getDoc(userPlaylistsRef);

    if (!userPlaylistsDoc.exists()) {
      return null;
    }

    const data = userPlaylistsDoc.data() as UserPlaylistsModel;
    return {
      userId: data.userId || '',
      created: data.created || [],
      forked: data.forked || [],
      liked: data.liked || [],
    };
  } catch (error) {
    throw new Error('getUserPlaylists() 에러가 발생했습니다.');
  }
};
