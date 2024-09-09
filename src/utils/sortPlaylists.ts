import { PlaylistModel } from '@/types/playlist';

const DAYAGO = 7; // 최신 7일까지의 플레이리스트

// '좋아요'가 많은 순서대로 플레이리스트 정렬
export const sortPlaylistsByPopularity = (playlists: PlaylistModel[] | undefined) => {
  if (!playlists) {
    return [];
  }

  return [...playlists]?.sort((a, b) => b.likeCount - a.likeCount);
};

// 최신 n일 중 최근 업데이트순으로 플레이리스트 정렬
export const sortRecentPlaylists = (
  playlists: PlaylistModel[] | undefined,
  dayAgo: number = DAYAGO
) => {
  if (!playlists) {
    return [];
  }

  const currentDate = new Date();
  const cutoffDate = new Date(currentDate.getTime() - dayAgo * 24 * 60 * 60 * 1000);

  return playlists
    .filter((playlist) => {
      const playlistUpdatedDate = new Date(playlist.updatedAt); // updatedAt 기준으로 필터링
      return playlistUpdatedDate >= cutoffDate;
    })
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()); // 최신순으로 정렬
};
