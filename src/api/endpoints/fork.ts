// 플레이리스트 포크(구독) 관련 파이어베이스 API 함수

import { getFirestore, runTransaction, doc, getDoc } from 'firebase/firestore';

const db = getFirestore();

// 사용자가 해당 플레이리스트를 포크(구독)했는지 확인
export const getIsForkedState = async (userId: string, playlistId: string): Promise<boolean> => {
  const userPlaylistRef = doc(db, 'userPlaylists', userId);
  const userPlaylistSnap = await getDoc(userPlaylistRef);

  if (!userPlaylistSnap.exists()) {
    return false;
  }

  const userPlaylist = userPlaylistSnap.data();
  return userPlaylist.forked?.includes(playlistId) || false;
};

// 포크(구독) 토글 버튼 처리
// 포크가 되어있다면, forked 배열에서 해당 플레이리스트 ID 삭제 / 플레이리스트 포크 수(forkCount) -1
// 포크가 안 되어있다면, forked 배열에 해당 플레이리스트 ID 추가 / 플레이리스트 포크 수(forkCount) +1
export const toggleForkPlaylist = async (
  playlistId: string,
  userId: string,
  isCurrentlyForked: boolean
) => {
  try {
    const newForkState = await runTransaction(db, async (transaction) => {
      const userPlaylistRef = doc(db, 'userPlaylists', userId); // 사용자와 플레이리스트 관계를 알 수 있는 컬렉션
      const playlistRef = doc(db, 'playlists', playlistId); // 플레이리스트 컬렉션

      const [playlistDoc, userPlaylistDoc] = await Promise.all([
        transaction.get(playlistRef),
        transaction.get(userPlaylistRef),
      ]);

      if (!playlistDoc.exists()) {
        throw new Error('플레이리스트가 없습니다.');
      }

      const playlistData = playlistDoc.data();
      const userPlaylistData = userPlaylistDoc.data() || { forked: [] };
      const forkedPlaylists = userPlaylistData.forked || [];

      if (isCurrentlyForked) {
        // 포크(구독) 취소
        transaction.update(userPlaylistRef, {
          forked: forkedPlaylists.filter((id: string) => id !== playlistId), // 플레이리스트 ID 삭제
        });
        transaction.update(playlistRef, {
          forkCount: (playlistData.forkCount || 0) - 1,
        });
      } else {
        // 포크(구독)
        transaction.update(userPlaylistRef, {
          forked: [...forkedPlaylists, playlistId], // 플레이리스트 ID 추가
        });
        transaction.update(playlistRef, {
          forkCount: (playlistData.forkCount || 0) + 1,
        });
      }

      return !isCurrentlyForked;
    });
    return newForkState;
  } catch (error) {
    console.error('toggleForkPlaylist() 에러가 발생했습니다: ', error);
    throw error;
  }
};
