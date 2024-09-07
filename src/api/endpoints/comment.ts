// 댓글 관련 파이어베이스 API 함수

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

import { Comment } from '@/types/playlist';

const db = getFirestore();

// 해당 플레이리스트 댓글 조회
export const getPlaylistComments = async (
  playlistId: string | undefined,
  limitCount: number = 20
): Promise<Comment[]> => {
  try {
    if (!playlistId) {
      throw new Error('Playlist ID가 필요합니다.');
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
    console.error(`getPlaylistComments의 ${playlistId}에 대한 에러가 발생했습니다.:`, error);
    return [];
  }
};

// 댓글 추가
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
    throw new Error('댓글 추가에 실패했습니다.');
  }
};

// 댓글 삭제
export const deleteComment = async (playlistId: string, commentId: string): Promise<string> => {
  try {
    const commentsRef = doc(db, 'comments', commentId); // comments의 특정 commentId를 가진 문서를 저장
    await deleteDoc(commentsRef); // 특정 commentId를 가진 문서(댓글) 삭제

    const playlistRef = doc(db, 'playlists', playlistId); // playlists의 특정 playlistId를 가진 문서를 저장
    await updateDoc(playlistRef, {
      commentCount: increment(-1), // 해당 문서(playlistRef)의 commentCount에 -1해서 문서 상태를 업데이트
    });

    return commentId;
  } catch (error) {
    throw new Error('댓글 삭제에 실패했습니다.');
  }
};
