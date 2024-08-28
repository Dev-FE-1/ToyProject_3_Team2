import { getFirestore, collection, doc, getDocs, getDoc } from 'firebase/firestore';

import { app } from './firebase'; // Firebase 앱 초기화 파일

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

export interface Playlist {
  id: string;
  title: string;
  description: string;
  thumbnailUrl?: string;
  videoCount: number;
}

export const getUserById = async (userId: string): Promise<User | null> => {
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

export const getPlaylists = async (): Promise<Playlist[]> => {
  const playlistsCol = collection(db, 'playlists');
  const playlistSnapshot = await getDocs(playlistsCol);
  return playlistSnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      title: data.title,
      description: data.description,
      thumbnailUrl: data.thumbnailUrl,
      videoCount: data.videoCount,
    };
  });
};
