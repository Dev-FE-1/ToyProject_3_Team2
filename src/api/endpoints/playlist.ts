import {
  getFirestore,
  collection,
  getDocs,
  query,
  limit,
  orderBy,
  doc,
  getDoc,
  where,
  addDoc,
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';

import { app, storage } from '@/api'; // Firebase 앱 초기화 파일
import { PlaylistFormDataModel, PlaylistModel } from '@/types/playlist';

const db = getFirestore(app);

// 전체 플레이리스트 가져오기
export const getAllPlaylists = async (userId: string): Promise<PlaylistModel[]> => {
  try {
    const playlistsCol = collection(db, 'playlists');
    const playlistQuery = query(playlistsCol, orderBy('createdAt', 'desc'));
    const playlistSnapshot = await getDocs(playlistQuery);

    return playlistSnapshot.docs.map(
      (doc) =>
        ({
          playlistId: doc.id,
          ...doc.data(),
        }) as PlaylistModel
    );
  } catch (error) {
    console.error('Error fetching playlists:', error);
    return [];
  }
};

// 특정 사용자가 포크한 플레이리스트 가져오기
export const getForkedPlaylists = async (userId: string): Promise<PlaylistModel[]> => {
  try {
    // 1. userPlaylists에서 포크한 플레이리스트 ID 목록 가져오기
    const userPlaylistsRef = doc(db, 'userPlaylists', userId);
    const userPlaylistsDoc = await getDoc(userPlaylistsRef);

    if (!userPlaylistsDoc.exists()) {
      console.log(`${userId}'s forked playlist is not exist`);
      return [];
    }

    const forkedPlaylistIds = userPlaylistsDoc.data().forked || [];

    if (forkedPlaylistIds.length === 0) {
      return [];
    }

    // 2. playlists 컬렉션에서 해당 ID들의 플레이리스트 데이터 가져오기
    const playlistsRef = collection(db, 'playlists');
    const q = query(playlistsRef, where('playlistId', 'in', forkedPlaylistIds));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        playlistId: doc.id,
        userId: data.userId,
        userName: data.userName,
        title: data.title,
        description: data.description,
        category: data.category,
        videoCount: data.videoCount,
        likeCount: data.likeCount,
        forkCount: data.forkCount,
        commentCount: data.commentCount,
        thumbnailUrl: data.thumbnailUrl,
        isPublic: data.isPublic,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        videos: data.videos,
      };
    });
  } catch (error) {
    console.error('Error fetching forked playlists:', error);
    return [];
  }
};

// 카테고리에 따른 플레이리스트 가져오기
export const getPlaylistsByCategory = async (
  category: string,
  limitCount: number = 20
): Promise<PlaylistModel[]> => {
  try {
    const playlistsCol = collection(db, 'playlists');
    const playlistQuery = query(
      playlistsCol,
      where('category', '==', category),
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    );
    const playlistSnapshot = await getDocs(playlistQuery);

    return playlistSnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        playlistId: doc.id,
        userName: data.userName,
        userId: data.userId,
        title: data.title,
        description: data.description,
        category: data.category,
        videoCount: data.videoCount,
        likeCount: data.likeCount,
        forkCount: data.forkCount,
        commentCount: data.commentCount,
        thumbnailUrl: data.thumbnailUrl,
        isPublic: data.isPublic,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        videos: data.videos,
      };
    });
  } catch (error) {
    console.error('Error fetching playlists by category:', error);
    return [];
  }
};

// 새 플레이리스트 만들기
export const addPlaylist = async (playlistData: PlaylistFormDataModel): Promise<string> => {
  try {
    const playlistsRef = collection(db, 'playlists');

    // 이미지가 base64형식인 경우에만, storage에 업로드하고 URL을 받아옴
    let updatedUrl = playlistData.thumbnailUrl;
    if (updatedUrl && updatedUrl.startsWith('data:image')) {
      // Storage에 이미지 업로드
      const storageRef = ref(storage, `thumbnails/${Date.now()}_${playlistData.title}`);
      await uploadString(storageRef, updatedUrl, 'data_url');

      // 업로드 된 이미지의 다운로드 URL을 받아옴
      updatedUrl = await getDownloadURL(storageRef);
    }

    // 서버 타임스탬프 사용 및 필요한 필드 추가
    const playlistToAdd: PlaylistFormDataModel = {
      ...playlistData,
      thumbnailUrl: updatedUrl, // 업데이트 된 썸네일 URL 또는 원래 기존의 URL
    };

    // Firestore에 플레이리스트 추가
    const docRef = await addDoc(playlistsRef, playlistToAdd);
    console.log('Document written with ID: ', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error adding playlist:', error);
    throw error; // Add a throw statement to propagate the error
  }
};
