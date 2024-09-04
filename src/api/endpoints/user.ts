import { getFirestore, doc, getDoc } from 'firebase/firestore';

import { app } from '@/api'; // Firebase 앱 초기화 파일
import { UserModel } from '@/types/user';

const db = getFirestore(app);

export interface User {
  id: string;
  username: string;
  userBio: string;
  email: string;
  profileImg: string;
  playlistCount: number;
  totalLikes: number;
  totalForks: number;
}

export interface UserPlaylists {
  created: string[];
  forked: string[];
  liked: string[];
}

export const getUserData = async (userId: string): Promise<UserModel | null> => {
  if (!userId) {
    console.error('유효한 사용자 ID가 없습니다.');
    return null;
  }
  try {
    const userDocRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      console.log(`User with ID ${userId} not found`);
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
    console.error('Error fetching user data:', error);
    return null;
  }
};

export const getUserPlaylists = async (userId: string): Promise<UserPlaylists | null> => {
  try {
    const userPlaylistsRef = doc(db, 'userPlaylists', userId);
    const userPlaylistsDoc = await getDoc(userPlaylistsRef);

    if (!userPlaylistsDoc.exists()) {
      console.log(`UserPlaylists for user ${userId} not found`);
      return null;
    }

    const data = userPlaylistsDoc.data() as UserPlaylists;
    return {
      created: data.created || [],
      forked: data.forked || [],
      liked: data.liked || [],
    };
  } catch (error) {
    console.error('Error fetching user playlists:', error);
    return null;
  }
};
