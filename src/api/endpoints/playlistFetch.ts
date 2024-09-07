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
  startAfter,
  QueryDocumentSnapshot,
  DocumentData,
} from 'firebase/firestore';

import { app } from '@/api'; // Firebase 앱 초기화 파일
import { PlaylistModel, Video } from '@/types/playlist';
import { UserModel } from '@/types/user';

const db = getFirestore(app);

// 전체 플레이리스트 가져오기
export const getAllPlaylists = async (limitCount: number = 20): Promise<PlaylistModel[]> => {
  try {
    const playlistsCol = collection(db, 'playlists');
    const playlistQuery = query(playlistsCol, orderBy('createdAt', 'desc'), limit(limitCount));
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

// 로그인한 유저의 userId로, 해당 유저의 플레이리스트 가져오기
export const getUserPlaylists = async (loggedInUserId: string): Promise<PlaylistModel[]> => {
  try {
    const playlistsCol = collection(db, 'playlists');
    const playlistQuery = query(playlistsCol, orderBy('createdAt', 'desc'));
    const playlistSnapshot = await getDocs(playlistQuery);

    const allPlaylists = playlistSnapshot.docs.map(
      (doc) =>
        ({
          playlistId: doc.id,
          ...doc.data(),
        }) as PlaylistModel
    );

    // 로그인한 유저의 userId와 일치하는 플레이리스트만 필터링
    const userPlaylists = allPlaylists.filter((playlist) => playlist.userId === loggedInUserId);

    return userPlaylists;
  } catch (error) {
    console.error('Error fetching user playlists:', error);
    throw new Error('사용자의 플레이리스트를 가져오는 데 실패했습니다.');
  }
};

// 플레이리스트 ID로 특정 플레이리스트 가져오기
export const getPlaylist = async (playlistId: string): Promise<PlaylistModel | null> => {
  try {
    const playlistRef = doc(db, 'playlists', playlistId);

    const playlistSnap = await getDoc(playlistRef);

    if (playlistSnap.exists()) {
      const playlistData = playlistSnap.data() as PlaylistModel;

      return {
        ...playlistData,
        playlistId: playlistSnap.id,
      };
    } else {
      console.log('No such playlist!');
      return null;
    }
  } catch (error) {
    console.error('Error fetching playlist:', error);
    throw error;
  }
};

// 플레이리스트 ID로 특정 플레이리스트 가져오기
export const getPlaylistById = async (playlistId: string): Promise<PlaylistModel | null> => {
  try {
    const playlistRef = doc(db, 'playlists', playlistId);
    const playlistDoc = await getDoc(playlistRef);

    if (!playlistDoc.exists()) {
      throw new Error(`Playlist with ID ${playlistId} not found`);
    }

    const playlistData = playlistDoc.data();

    return {
      ...playlistData,
      commentCount: playlistData?.commentCount ?? 0,
    } as PlaylistModel;
  } catch (error) {
    console.error(`Error fetching playlist ${playlistId}:`, error);
    throw error;
  }
};

// 플레이리스트 ID로 특정 플레이리스트 가져온 후, 해당 플레이리스트의 유저 정보를 가져오기
export const getPlaylistWithUser = async (
  playlistId: string
): Promise<{ playlist: PlaylistModel; user: UserModel } | null> => {
  try {
    // 1. 플레이리스트 가져오기
    const playlistRef = doc(db, 'playlists', playlistId);

    const playlistSnap = await getDoc(playlistRef);

    if (!playlistSnap.exists()) {
      console.log('No such playlist!');
      return null;
    }

    const playlistData = playlistSnap.data() as PlaylistModel;
    const playlist: PlaylistModel = {
      ...playlistData,
      playlistId: playlistSnap.id,
      videos: playlistData.videos || [], // 비디오가 없으면 빈 배열로 초기화
    };

    // 2. 플레이리스트의 유저 정보 가져오기
    const userRef = doc(db, 'users', playlist.userId);
    const userSnap = await getDoc(userRef);
    if (!userSnap.exists()) {
      console.log('No such user!');
      return null;
    }
    const userData = userSnap.data() as UserModel;
    return { playlist, user: userData };
  } catch (error) {
    console.error('Error fetching playlist with user:', error);
    return null;
  }
};

// 특정 사용자가 포크한 플레이리스트 가져오기
export const getForkedPlaylists = async (userId: string): Promise<PlaylistModel[]> => {
  try {
    // 1. userPlaylists에서 포크한 플레이리스트 ID 목록 가져오기
    const userPlaylistsRef = doc(db, 'userPlaylists', userId);
    const userPlaylistsDoc = await getDoc(userPlaylistsRef);

    if (!userPlaylistsDoc.exists()) {
      throw new Error(`${userId}'s forked playlist is not exist`);
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

// 플레이리스트 ID로 특정 플레이리스트의 전체 Videos 가져오기
export const getPlaylistVideos = async (playlistId: string): Promise<Video[]> => {
  try {
    const playlistRef = doc(db, 'playlists', playlistId);
    const playlistSnap = await getDoc(playlistRef);

    if (playlistSnap.exists()) {
      const playlistData = playlistSnap.data();
      return playlistData.videos || [];
    } else {
      throw new Error('Playlist not found');
    }
  } catch (error) {
    console.error('Error fetching playlist videos:', error);
    throw error;
  }
};

// 전체 플레이리스트 가져온 후 무한스크롤 지원
export const getPlaylistsWithPagination = async (
  limitCount: number = 20,
  lastVisible: QueryDocumentSnapshot<DocumentData> | null = null
): Promise<{
  nextPageToken: QueryDocumentSnapshot<DocumentData> | null;
  playlists: PlaylistModel[];
  lastVisible: QueryDocumentSnapshot<DocumentData> | null;
}> => {
  try {
    const playlistsCol = collection(db, 'playlists');
    let playlistQuery;

    // 마지막 문서 이후의 데이터 가져오기 (페이지네이션)
    if (lastVisible) {
      playlistQuery = query(
        playlistsCol,
        orderBy('updatedAt', 'desc'),
        startAfter(lastVisible),
        limit(limitCount)
      );
    } else {
      // 첫 페이지 데이터 가져오기
      playlistQuery = query(playlistsCol, orderBy('updatedAt', 'desc'), limit(limitCount));
    }

    const playlistSnapshot = await getDocs(playlistQuery);
    const playlists = playlistSnapshot.docs.map((doc) => ({
      playlistId: doc.id,
      ...doc.data(),
    })) as PlaylistModel[];

    const lastDoc = playlistSnapshot.docs[playlistSnapshot.docs.length - 1]; // 마지막 문서 스냅샷

    // nextPageToken을 lastVisible로 반환
    return {
      playlists,
      lastVisible: lastDoc || null, // 마지막 문서가 없을 경우 null
      nextPageToken: lastDoc || null, // nextPageToken을 lastDoc으로 설정
    };
  } catch (error) {
    console.error('Error fetching playlists with pagination:', error);
    return { playlists: [], lastVisible: null, nextPageToken: null }; // 오류 발생 시 빈 값 반환
  }
};
