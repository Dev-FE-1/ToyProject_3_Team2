import { getFirestore, runTransaction, doc, getDoc } from 'firebase/firestore';

import { app } from '@/api'; // Firebase 앱 초기화 파일

const db = getFirestore(app);

// 초기 구독 상태 확인 함수
export const getInitialForkedState = async (
  userId: string,
  playlistId: string
): Promise<boolean> => {
  const userPlaylistRef = doc(db, 'userPlaylists', userId);
  const userPlaylistSnap = await getDoc(userPlaylistRef);
  if (userPlaylistSnap.exists()) {
    const userData = userPlaylistSnap.data();
    return userData.forked?.includes(playlistId) || false;
  }
  return false;
};

// 구독 토글 함수
export const toggleFork = async (
  playlistId: string,
  userId: string,
  isCurrentlyForked: boolean
) => {
  try {
    const newForkState = await runTransaction(db, async (transaction) => {
      const userPlaylistRef = doc(db, 'userPlaylists', userId);
      const userPlaylistDoc = await transaction.get(userPlaylistRef);

      if (!userPlaylistDoc.exists()) {
        throw new Error('User playlist document not found');
      }

      const userData = userPlaylistDoc.data() || { forked: [] };
      const forkedPlaylists = userData.forked || [];

      if (isCurrentlyForked) {
        // 구독 취소
        transaction.update(userPlaylistRef, {
          forked: forkedPlaylists.filter((id: string) => id !== playlistId),
        });
      } else {
        // 구독
        transaction.update(userPlaylistRef, {
          forked: [...forkedPlaylists, playlistId],
        });
      }

      return !isCurrentlyForked;
    });

    console.log('Fork toggled successfully');
    return newForkState;
  } catch (error) {
    console.error('Error toggling fork:', error);
    throw error;
  }
};
