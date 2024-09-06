import { getFirestore, runTransaction, doc, getDoc } from 'firebase/firestore';

const db = getFirestore();

// isLiked 상태 초기화 함수
export const getInitialLikedState = async (
  userId: string,
  playlistId: string
): Promise<boolean> => {
  const userPlaylistRef = doc(db, 'userPlaylists', userId);
  const userPlaylistSnap = await getDoc(userPlaylistRef);
  if (userPlaylistSnap.exists()) {
    const userData = userPlaylistSnap.data();
    return userData.liked?.includes(playlistId) || false;
  }
  return false;
};

// 좋아요 토글 함수
export const togglePlaylistLike = async (
  playlistId: string,
  userId: string,
  isCurrentlyLiked: boolean
) => {
  try {
    const newLikeState = await runTransaction(db, async (transaction) => {
      const playlistRef = doc(db, 'playlists', playlistId);
      const userPlaylistRef = doc(db, 'userPlaylists', userId);

      const [playlistDoc, userPlaylistDoc] = await Promise.all([
        transaction.get(playlistRef),
        transaction.get(userPlaylistRef),
      ]);

      if (!playlistDoc.exists()) {
        throw new Error('Playlist not found');
      }

      const playlistData = playlistDoc.data();
      const userPlaylistData = userPlaylistDoc.data() || { liked: [] };
      const likedPlaylists = userPlaylistData.liked || [];

      if (isCurrentlyLiked) {
        // Unlike
        transaction.update(userPlaylistRef, {
          liked: likedPlaylists.filter((id: string) => id !== playlistId),
        });
        transaction.update(playlistRef, {
          likeCount: (playlistData.likeCount || 0) - 1,
        });
      } else {
        // Like
        transaction.update(userPlaylistRef, {
          liked: [...likedPlaylists, playlistId],
        });
        transaction.update(playlistRef, {
          likeCount: (playlistData.likeCount || 0) + 1,
        });
      }

      return !isCurrentlyLiked;
    });

    console.log('Like toggled successfully');
    return newLikeState;
  } catch (error) {
    console.error('Error toggling like:', error);
    throw error;
  }
};
