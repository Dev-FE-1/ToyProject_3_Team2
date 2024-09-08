// 플레이리스트 좋아요 관련 파이어베이스 API 함수

import { getFirestore, runTransaction, doc, getDoc } from 'firebase/firestore';

const db = getFirestore();

// 사용자가 해당 플레이리스트를 좋아요했는지 확인
export const getIsLikedState = async (userId: string, playlistId: string): Promise<boolean> => {
  const userPlaylistRef = doc(db, 'userPlaylists', userId);
  const userPlaylistSnap = await getDoc(userPlaylistRef);

  if (!userPlaylistSnap.exists()) {
    return false;
  }

  const userPlaylist = userPlaylistSnap.data();
  return userPlaylist.liked?.includes(playlistId) || false;
};

// 좋아요 토글 버튼 처리
// 좋아요가 되어있다면, liked 배열에서 해당 플레이리스트 ID 삭제 / 플레이리스트 좋아요 수(likeCount) -1
// 좋아요가 안 되어있다면, liked 배열에 해당 플레이리스트 ID 추가 / 플레이리스트 좋아요 수(likeCount) +1
export const toggleLikePlaylist = async (
  playlistId: string,
  userId: string,
  isCurrentlyLiked: boolean
) => {
  try {
    const newLikeState = await runTransaction(db, async (transaction) => {
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
      const userPlaylistData = userPlaylistDoc.data() || { liked: [] };
      const likedPlaylists = userPlaylistData.liked || [];

      if (isCurrentlyLiked) {
        // 좋아요 취소
        transaction.update(userPlaylistRef, {
          liked: likedPlaylists.filter((id: string) => id !== playlistId), // 플레이리스트 ID 삭제
        });
        transaction.update(playlistRef, {
          likeCount: (playlistData.likeCount || 0) - 1,
        });
      } else {
        // 좋아요
        transaction.update(userPlaylistRef, {
          liked: [...likedPlaylists, playlistId], // 플레이리스트 ID 추가
        });
        transaction.update(playlistRef, {
          likeCount: (playlistData.likeCount || 0) + 1,
        });
      }

      return !isCurrentlyLiked;
    });

    return newLikeState;
  } catch (error) {
    console.error('toggleLikePlaylist() 에러가 발생했습니다: ', error);
    throw error;
  }
};
