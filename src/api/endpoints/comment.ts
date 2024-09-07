import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit,
  addDoc,
  increment,
  updateDoc,
  doc,
  deleteDoc,
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

export const addComment = async (
  playlistId: string,
  userId: string,
  userName: string,
  profileImg: string,
  content: string
): Promise<string> => {
  try {
    const commentsRef = collection(db, 'comments');

    const docRef = await addDoc(commentsRef, {
      playlistId,
      userId,
      userName,
      profileImg,
      content,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    const commentId = docRef.id;
    await updateDoc(docRef, { commentId });

    const playlistRef = doc(db, 'playlists', playlistId);
    await updateDoc(playlistRef, {
      commentCount: increment(1),
    });

    return commentId;
  } catch (error) {
    console.error('Error adding comment:', error);
    throw new Error('댓글 추가에 실패했습니다.');
  }
};

export const deleteComment = async (playlistId: string, commentId: string): Promise<string> => {
  try {
    const commentsRef = doc(db, 'comments', commentId); //comments의 특정 commentId를 가진 문서를 저장
    await deleteDoc(commentsRef); // 특정 commentId를 가진 문서(댓글) 삭제

    const playlistRef = doc(db, 'playlists', playlistId); // playlists의 특정 playlistId를 가진 문서를 저장
    await updateDoc(playlistRef, {
      commentCount: increment(-1), //해당 문서(playlistRef)의 commentCount에 -1해서 문서 상태를 업데이트
    });

    return commentId;
  } catch (error) {
    console.error('Error adding comment:', error);
    throw new Error('댓글 삭제에 실패했습니다.');
  }
};
