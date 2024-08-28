import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface PlaylistItem {
  playlistId: string;
  initialLikeCount: number;
  commentCount: number;
}

interface LikeState {
  likes: { [playlistId: string]: number };
  isLiked: { [playlistId: string]: boolean };
  initializeLikes: (playlist: PlaylistItem[]) => void;
  setLike: (playlistId: string, likeCount: number) => void;
  incrementLike: (playlistId: string) => void;
  decrementLike: (playlistId: string) => void;
  toggleLiked: (playlistId: string) => void;
}

const useLikeStore = create<LikeState>()(
  devtools(
    (set) => ({
      // 각 플레이리스트의 좋아요 수를 저장하는 객체 상태
      likes: {},
      // 각 플레이리스트의 좋아요 클릭 여부를 저장하는 객체 상태
      isLiked: {},
      // 초기 데이터(playlists)로 likes 객체를 초기화하는 액션
      initializeLikes: (playlists) =>
        set((state) => ({
          likes: playlists.reduce(
            (acc, playlist) => {
              // 초기 데이터의 좋아요(값)를 playlistId(키)로 매핑
              acc[playlist.playlistId] = playlist.initialLikeCount;
              return acc;
            },
            { ...state.likes }
          ),
        })),
      // 특정 playlist의 좋아요 수를 직접 설정하는 액션
      setLike: (playlistId, count) =>
        set((state) => ({ likes: { ...state.likes, [playlistId]: count } })),
      // 좋아요 수를 1 증가
      incrementLike: (playlistId) =>
        set((state) => ({
          likes: { ...state.likes, [playlistId]: (state.likes[playlistId] || 0) + 1 },
        })),
      // 좋아요 수를 1 감소 (Math.max()사용해서 최소값이 0)
      decrementLike: (playlistId) =>
        set((state) => ({
          likes: { ...state.likes, [playlistId]: Math.max((state.likes[playlistId] || 0) - 1, 0) },
        })),
      // 버튼 클릭할 때마다, isLiked 상태 바꿔주는 액션
      toggleLiked: (playlistId) =>
        set((state) => ({
          // 추가된 부분
          isLiked: { ...state.isLiked, [playlistId]: !state.isLiked[playlistId] },
        })),
    }),
    {
      // devtool에 표시할 스토어 이름
      name: 'like-store',
    }
  )
);

export default useLikeStore;
