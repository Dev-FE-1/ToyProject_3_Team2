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
} from 'firebase/firestore';

import { app } from '@/api'; // Firebase 앱 초기화 파일
import { Playlist } from '@/types/playlist';

const db = getFirestore(app);

// 전체 플레이리스트 가져오기
export const getAllPlaylists = async (limitCount: number = 20): Promise<Playlist[]> => {
  try {
    const playlistsCol = collection(db, 'playlists');
    const playlistQuery = query(playlistsCol, orderBy('createdAt', 'desc'), limit(limitCount));
    const playlistSnapshot = await getDocs(playlistQuery);

    // console.log('Playlists completely fetched');

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
    console.error('Error fetching playlists:', error);
    return [];
  }
};

// 특정 사용자가 포크한 플레이리스트 가져오기
export const getForkedPlaylists = async (userId: string): Promise<Playlist[]> => {
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
): Promise<Playlist[]> => {
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
