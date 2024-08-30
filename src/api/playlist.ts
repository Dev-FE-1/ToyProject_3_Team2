import { getFirestore, collection, getDocs } from 'firebase/firestore';

import { app } from '@/api'; // Firebase 앱 초기화 파일

const db = getFirestore(app);

export interface Playlist {
  id: string;
  title: string;
  description: string;
  thumbnailUrl?: string;
  videoCount: number;
}

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
