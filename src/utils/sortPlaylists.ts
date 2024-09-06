import { PlaylistModel } from '@/types/playlist';

const DAYAGO = 7; // 최신 7일까지의 플레이리스트

// '좋아요'가 많은 순서대로 플레이리스트 정렬
export const sortPlaylistsByPopularity = (playlists: PlaylistModel[]) =>
  [...playlists].sort((a, b) => b.likeCount - a.likeCount);

// 최신 n일 중 최신순으로 플레이리스트 정렬
export const sortRecentPlaylists = (playlists: PlaylistModel[], dayAgo: number = DAYAGO) => {
  const currentDate = new Date();
  const cutoffDate = new Date(currentDate.getTime() - dayAgo * 24 * 60 * 60 * 1000);

  return playlists.filter((playlist) => {
    const playlistCreatedDate = new Date(playlist.createdAt);
    return playlistCreatedDate >= cutoffDate;
  });
};
