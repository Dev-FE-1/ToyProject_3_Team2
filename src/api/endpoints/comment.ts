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

const db = getFirestore(app);

interface Comment {
  commentId: string;
  userId: string;
  username: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export const getPlaylistComments = async (
  playlistId: string,
  limitCount: number = 10
): Promise<Comment[]> => {
  try {
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
        username: data.username,
        content: data.content,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      };
    });
  } catch (error) {
    console.error(`Error fetching comments for playlist ${playlistId}:`, error);
    return [];
  }
};
