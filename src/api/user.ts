import { getFirestore, doc, getDoc } from 'firebase/firestore';

import { app } from '@/api'; // Firebase 앱 초기화 파일

const db = getFirestore(app);

export interface User {
  id: string;
  username: string;
  email: string;
  profileImg: string;
  playlistCount: number;
  totalLikes: number;
  totalForks: number;
}

export const getUserData = async (userId: string): Promise<User | null> => {
  const userDocRef = doc(db, 'users', userId);
  const userDoc = await getDoc(userDocRef);
  if (!userDoc.exists()) {
    return null;
  }
  const data = userDoc.data();
  return {
    id: userDoc.id,
    username: data?.username || '',
    email: data?.email || '',
    profileImg: data?.profileImg || '',
    playlistCount: data?.playlistCount || 0,
    totalLikes: data?.totalLikes || 0,
    totalForks: data?.totalForks || 0,
  };
};
