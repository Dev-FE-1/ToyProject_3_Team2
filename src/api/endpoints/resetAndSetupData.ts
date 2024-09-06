import { doc, setDoc, collection, deleteDoc, getDocs } from 'firebase/firestore';

import { db } from '@/api';
import { data } from '@/mock/data';

// 파이어스토어 데이터 초기화
export const resetFireStoreData = async () => {
  const collections = ['users', 'playlists', 'userPlaylists', 'comments'];

  for (const collectionName of collections) {
    try {
      const querySnapshot = await getDocs(collection(db, collectionName));

      const deletePromises = querySnapshot.docs.map((doc) => deleteDoc(doc.ref));

      await Promise.all(deletePromises);

      console.log(`${collectionName} collections deleted!!`);
    } catch (error) {
      console.error(`${collectionName} collections ERROR:`, error);
    }
  }

  console.log('Data reset completed!!');
};

// 파이어스토어 데이터 셋업
export const setUpFireStoreData = async () => {
  // Users 데이터 설정
  for (const [userId, userData] of Object.entries(data.users)) {
    await setDoc(doc(db, 'users', userId), userData);
  }

  // Playlists 데이터 설정
  for (const [playlistId, playlistData] of Object.entries(data.playlists)) {
    await setDoc(doc(db, 'playlists', playlistId), playlistData);
  }

  // UserPlaylists 데이터 설정
  for (const [userId, userPlaylistData] of Object.entries(data.userPlaylists)) {
    await setDoc(doc(db, 'userPlaylists', userId), userPlaylistData);
  }

  // Comments 데이터 설정
  for (const [playlistId, playlistComments] of Object.entries(data.comments)) {
    for (const [_, commentData] of Object.entries(playlistComments)) {
      await setDoc(doc(db, 'comments', commentData.commentId), {
        ...commentData,
        playlistId,
      });
    }
  }

  console.log('Data setup completed!!');
};
