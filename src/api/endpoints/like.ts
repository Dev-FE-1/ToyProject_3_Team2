import { getFirestore, runTransaction, doc } from 'firebase/firestore';

const db = getFirestore();

export const toggleLike = async (userId: string, playlistId: string): Promise<boolean> => {
  try {
    await runTransaction(db, async (transaction) => {
      const userPlaylistsRef = doc(db, 'userPlaylists', userId);
      const playlistRef = doc(db, 'playlists', playlistId);

      const userPlaylistsDoc = await transaction.get(userPlaylistsRef);
      const playlistDoc = await transaction.get(playlistRef);

      if (!userPlaylistsDoc.exists() || !playlistDoc.exists()) {
        throw 'Document does not exist!';
      }

      const userData = userPlaylistsDoc.data();
      const playlistData = playlistDoc.data();

      const likedPlaylists = userData.liked || [];
      const isLiked = likedPlaylists.includes(playlistId);

      if (isLiked) {
        // 좋아요 취소
        transaction.update(userPlaylistsRef, {
          liked: likedPlaylists.filter((id: string) => id !== playlistId),
        });
        transaction.update(playlistRef, {
          likeCount: playlistData.likeCount - 1,
        });
      } else {
        // 좋아요
        transaction.update(userPlaylistsRef, {
          liked: [...likedPlaylists, playlistId],
        });
        transaction.update(playlistRef, {
          likeCount: playlistData.likeCount + 1,
        });
      }
    });

    console.log('Transaction successfully committed!');
    return true;
  } catch (e) {
    console.log('Transaction failed: ', e);
    return false;
  }
};
