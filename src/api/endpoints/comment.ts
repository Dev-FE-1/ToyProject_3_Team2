import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit,
} from 'firebase/firestore';

import { app } from '@/api'; // Firebase 앱 초기화 파일
import { Comment } from '@/types/playlist';

const db = getFirestore(app);

export const getPlaylistComments = async (
  playlistId: string | undefined,
  limitCount: number = 10
): Promise<Comment[]> => {
  try {
    if (!playlistId) {
      throw new Error('Playlist ID is required');
    }

    const commentsRef = collection(db, 'comments');
    const q = query(
      commentsRef,
      where('playlistId', '==', playlistId),
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    );

    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        commentId: doc.id,
        userId: data.userId,
        profileImg: data.profileImg,
        playlistId: data.playlistId,
        userName: data.userName,
        content: data.content,
        createdAt: data.createdAt,
      };
    });
  } catch (error) {
    console.error(`Error fetching comments for playlist ${playlistId}:`, error);
    return [];
  }
};
