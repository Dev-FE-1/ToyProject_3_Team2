import {
  getFirestore,
  collection,
  doc,
  getDoc,
  addDoc,
  setDoc,
  deleteDoc,
  arrayUnion,
  increment,
  arrayRemove,
  updateDoc,
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadString, deleteObject } from 'firebase/storage';

import { app, storage } from '@/api';
import { PlaylistFormDataModel, PlaylistModel, Video } from '@/types/playlist';

const db = getFirestore(app);

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

// 플레이리스트 삭제
export const deletePlaylist = async (playlistId: string): Promise<void> => {
  try {
    // 플레이리스트 문서 참조 생성
    const playlistRef = doc(db, 'playlists', playlistId);

    // 플레이리스트 데이터 가져오기
    const playlistSnapshot = await getDoc(playlistRef);

    if (!playlistSnapshot.exists()) {
      throw new Error('Playlist not found');
    }

    const playlistData = playlistSnapshot.data();

    // 썸네일 URL이 존재하고 storage 경로를 포함하는 경우 삭제
    if (playlistData.thumbnailUrl && playlistData.thumbnailUrl.includes('firebasestorage')) {
      const imageRef = ref(storage, playlistData.thumbnailUrl);
      await deleteObject(imageRef);
    }

    // Firestore에서 플레이리스트 문서 삭제
    await deleteDoc(playlistRef);
  } catch (error) {
    console.error('Error deleting playlist:', error);
    throw error; // 에러를 상위로 전파
  }
};

// 플레이리스트에 새 비디오 추가
export const addVideoToPlaylist = async (
  playlistId: string | undefined,
  newVideo: Video
): Promise<boolean> => {
  try {
    if (!playlistId) {
      throw new Error('Playlist ID is missing in the URL.');
    }

    const playlistRef = doc(db, 'playlists', playlistId);

    await updateDoc(playlistRef, {
      // 중복 방지, 여러 사용자가 동시에 업데이트를 시도해도 데이터 일관성 유지 가능
      videos: arrayUnion(newVideo),
      videoCount: increment(1),
      updatedAt: new Date().toISOString(),
    });

    return true;
  } catch (error) {
    console.error('Error adding video to playlist:', error);
    return false;
  }
};

// 비디오 삭제
export const deleteVideoFromPlaylist = async (
  playlistId: string,
  videoId: string
): Promise<void> => {
  try {
    // 플레이리스트 문서 참조 생성
    const playlistRef = doc(db, 'playlists', playlistId);

    // 플레이리스트 데이터 가져오기
    const playlistSnapshot = await getDoc(playlistRef);

    if (!playlistSnapshot.exists()) {
      throw new Error('Playlist not found');
    }

    const playlistData = playlistSnapshot.data() as PlaylistModel;

    // 삭제할 비디오 찾기
    const videoToDelete = playlistData.videos.find((video) => video.videoId === videoId);

    if (!videoToDelete) {
      throw new Error('Video not found in the playlist');
    }

    // videos 배열에서 해당 비디오 제거
    await updateDoc(playlistRef, {
      videos: arrayRemove(videoToDelete),
      videoCount: playlistData.videoCount - 1,
    });
  } catch (error) {
    console.error('Error deleting video from playlist:', error);
    throw error; // 에러를 상위로 전파
  }
};

// 플레이리스트 수정
export const updatePlaylist = async (
  playlistId: string,
  formData: PlaylistFormDataModel
): Promise<void> => {
  try {
    const playlistRef = doc(db, 'playlists', playlistId);

    // 이미지가 base64 형식인 경우에만, storage에 업로드하고 URL을 받아옴
    let updatedUrl = formData.thumbnailUrl;
    if (updatedUrl && updatedUrl.startsWith('data:image')) {
      // 기존 이미지가 있다면 삭제
      const oldPlaylistData = (await getDoc(playlistRef)).data();
      if (
        oldPlaylistData?.thumbnailUrl &&
        oldPlaylistData.thumbnailUrl.includes('firebasestorage')
      ) {
        const oldImageRef = ref(storage, oldPlaylistData.thumbnailUrl);
        await deleteObject(oldImageRef);
      }

      // 새 이미지 업로드
      const storageRef = ref(storage, `thumbnails/${Date.now()}_${formData.title}`);
      await uploadString(storageRef, updatedUrl, 'data_url');

      // 업로드 된 이미지의 다운로드 URL을 받아옴
      updatedUrl = await getDownloadURL(storageRef);
    }

    // 업데이트할 데이터 준비
    const updateData = {
      title: formData.title,
      description: formData.description,
      category: formData.category,
      thumbnailUrl: updatedUrl,
      isPublic: formData.isPublic,
      updatedAt: new Date().toISOString(),
    };

    // Firestore 문서 업데이트
    await updateDoc(playlistRef, updateData);
  } catch (error) {
    console.error('Error updating playlist:', error);
    throw error;
  }
};

// 플레이리스트의 비디오 순서 변경 후 업데이트
export const updatePlaylistVideoOrder = async (
  playlistId: string,
  newVideoOrder: Video[]
): Promise<void> => {
  try {
    const playlistRef = doc(db, 'playlists', playlistId);
    await updateDoc(playlistRef, {
      videos: newVideoOrder, // 새로운 비디오 순서로 업데이트
      updatedAt: new Date().toISOString(), // 업데이트 시간을 업데이트
    });
    console.log('플레이리스트 비디오 순서 업데이트 성공!');
  } catch (error) {
    console.error('Error updating playlist video order:', error);
    throw error;
  }
};
