import { useEffect } from 'react';

import { css } from '@emotion/react';

import Comments from '@/components/common/Comments';
import Likes from '@/components/common/Likes';
import useLikeStore from '@/store/LikeStore';
import theme from '@/styles/theme';

interface PlaylistItem {
  playlistId: string;
  initialLikeCount: number;
  commentCount: number;
}

const Home = () => {
  const playlists: PlaylistItem[] = [
    { playlistId: 'pl1', initialLikeCount: 2334, commentCount: 233 },
    { playlistId: 'pl2', initialLikeCount: 100, commentCount: 150 },
    { playlistId: 'pl3', initialLikeCount: 50, commentCount: 75 },
  ];

  const likes = useLikeStore((state) => state.likes);
  const isLiked = useLikeStore((state) => state.isLiked);
  const initializeLikes = useLikeStore((state) => state.initializeLikes);
  const incrementLike = useLikeStore((state) => state.incrementLike);
  const decrementLike = useLikeStore((state) => state.decrementLike);
  const toggleLiked = useLikeStore((state) => state.toggleLiked);

  useEffect(() => {
    initializeLikes(playlists);
  }, []);

  const handleLikeClick = (playlistId: string) => {
    // 좋아요 클릭 여부를 저장하는 객체 상태에 있다면, -1
    if (isLiked[playlistId]) {
      decrementLike(playlistId);
      // 아니라면 +1
    } else {
      incrementLike(playlistId);
    }

    toggleLiked(playlistId);
  };

  return (
    <div>
      <h1>Logo</h1>
      <p>Home</p>
      {playlists.map((playlist) => (
        <div css={containerStyle} key={playlist.playlistId}>
          <Comments playListId={playlist.playlistId} commentCount={playlist.commentCount} />
          <div css={dividerStyle} />
          <Likes
            playlistId={playlist.playlistId}
            likeCount={likes[playlist.playlistId] || playlist.initialLikeCount}
            handleLikeClick={() => handleLikeClick(playlist.playlistId)}
            isLiked={isLiked[playlist.playlistId] || false}
          />
        </div>
      ))}
    </div>
  );
};

const containerStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: ${theme.heights.short};
  background-color: ${theme.colors.tertiary};
  border-radius: 22px;
  font-size: ${theme.fontSizes.normal};
  color: ${theme.colors.white};
  overflow: hidden;
`;

const dividerStyle = css`
  width: 1px;
  height: 23px;
  background-color: ${theme.colors.white};
  opacity: 0.3;
`;

export default Home;
