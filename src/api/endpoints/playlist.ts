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
  startAt,
  endAt,
  setDoc,
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { IoMdReturnRight } from 'react-icons/io';

import { app, storage } from '@/api'; // Firebase 앱 초기화 파일
import { PlaylistFormDataModel, PlaylistModel, Video } from '@/types/playlist';
import { UserModel } from '@/types/user';

const db = getFirestore(app);

// 전체 플레이리스트 가져오기
export const getAllPlaylists = async (): Promise<PlaylistModel[]> => {
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

// 로그인한 유저의 userId로, 해당 유저가 포함된 모든 플레이리스트 가져오기
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

// 플레이리스트 아이디로 특정 플레이리스트 가져오기
export async function getPlaylist(playlistId: string): Promise<PlaylistModel | null> {
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
}
// 플레이리스트 아이디로 플레이리스트를 가져온 후, 해당 플레이리스트의 유저 정보를 가져오기
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

// 플레이리스트 아이디로 해당 플레이리스트의 전체 Videos 가져오기
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

export const getPlaylistsByKeyword = async (
  keyword: string,
  limitCount: number = 20
): Promise<PlaylistModel[]> => {
  try {
    const keywordLower = keyword.toLowerCase();
    const keywordUpper = keyword.toLowerCase() + '\uf8ff';

    const playlistsCol = collection(db, 'playlists');
    const playlistQuery = query(
      playlistsCol,
      orderBy('title'),
      startAt(keywordLower),
      endAt(keywordUpper),
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
    console.error('Error fetching playlists by keyword:', error);
    return [];
  }
};

// 새 플레이리스트 만들기
export const addPlaylist = async (
  playlistData: PlaylistFormDataModel,
  userId: string,
  userName: string
): Promise<string> => {
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
    const playlistId = docRef.id;
    console.log('Document written with ID: ', docRef.id);

    // playlistId를 포함한 최종 데이터 생성
    const finalPlaylistData: PlaylistModel = {
      ...playlistToAdd,
      playlistId,
      userId,
      userName,
    };

    // playlistId를 포함하여 문서 업데이트
    await setDoc(doc(db, 'playlists', playlistId), finalPlaylistData);

    console.log('Document written with ID: ', playlistId);
    return playlistId;
  } catch (error) {
    console.error('Error adding playlist:', error);
    throw error; // Add a throw statement to propagate the error
  }
};
