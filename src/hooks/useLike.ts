import { useState, useEffect, useCallback } from 'react';

import { doc, getDoc, getFirestore, onSnapshot, runTransaction } from 'firebase/firestore';

import { app } from '@/api'; // Firebase 앱 초기화 파일
import { useDebounce } from '@/hooks/useDebounce';

const db = getFirestore(app);

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
        // Unlike
        transaction.update(userPlaylistsRef, {
          liked: likedPlaylists.filter((id: string) => id !== playlistId),
        });
        transaction.update(playlistRef, {
          likeCount: playlistData.likeCount - 1,
        });
      } else {
        // Like
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

export const useLikeManagement = (playlistId: string, userId: string) => {
  const [likeCount, setLikeCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [pendingLike, setPendingLike] = useState(false);

  // 디바운스된 pendingLike 상태
  const debouncedPendingLike = useDebounce(pendingLike, 300); // 500ms 디바운스

  useEffect(() => {
    const fetchInitialState = async () => {
      try {
        // 플레이리스트 정보 가져오기
        const playlistRef = doc(db, 'playlists', playlistId);
        const playlistSnap = await getDoc(playlistRef);

        if (playlistSnap.exists()) {
          setLikeCount(playlistSnap.data().likeCount);
        }

        // 사용자의 좋아요 상태 확인
        const userPlaylistRef = doc(db, 'userPlaylists', userId);
        const userPlaylistSnap = await getDoc(userPlaylistRef);

        if (userPlaylistSnap.exists()) {
          const userData = userPlaylistSnap.data();
          setIsLiked(userData.liked?.includes(playlistId) || false);
        }
      } catch (error) {
        console.error('Error fetching initial like state:', error);
      }
    };

    fetchInitialState();

    // 실시간 업데이트를 위한 리스너 설정
    const unsubscribe = onSnapshot(doc(db, 'playlists', playlistId), (doc) => {
      if (doc.exists()) {
        setLikeCount(doc.data().likeCount);
      }
    });

    return () => unsubscribe(); // 컴포넌트 언마운트 시 리스너 해제
  }, [playlistId, userId]);

  // 디바운스된 좋아요 토글 처리
  useEffect(() => {
    const handleDebouncedLikeToggle = async () => {
      if (debouncedPendingLike !== isLiked) {
        try {
          await toggleLike(userId, playlistId);
          setIsLiked(debouncedPendingLike);
        } catch (error) {
          console.error('Failed to toggle like:', error);
          setPendingLike(isLiked); // 에러 시 원래 상태로 복구
        }
      }
    };

    handleDebouncedLikeToggle();
  }, [debouncedPendingLike, userId, playlistId, isLiked]);

  const handleLikeToggle = useCallback(() => {
    // 낙관전 UI 업데이트
    setPendingLike((prev) => !prev);
    setLikeCount((prev) => (pendingLike ? prev - 1 : prev + 1));
  }, [pendingLike]);

  return { likeCount, isLiked: pendingLike, handleLikeToggle };
};
