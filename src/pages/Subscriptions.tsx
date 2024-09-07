import { useState, useEffect } from 'react';

import { css } from '@emotion/react';

import { getForkedPlaylists } from '@/api/endpoints/playlistFetch';
import Toast from '@/components/common/Toast';
import PlaylistBox from '@/components/page/playlist/PlaylistBox';
import theme from '@/styles/theme';
import { PlaylistModel } from '@/types/playlist';
import { getUserIdBySession } from '@/utils/user';

const Subscriptions: React.FC = () => {
  const [forkedPlaylists, setForkedPlaylist] = useState<PlaylistModel[]>([]);
  // const { isToggled, toggle } = useToggleStore();
  // const { showToast } = useToastStore();

  const useId = getUserIdBySession();

  useEffect(() => {
    const fetchForkedPlaylists = async (useId: string) => {
      const forkedPlaylists = await getForkedPlaylists(useId);
      setForkedPlaylist(forkedPlaylists);
    };

    fetchForkedPlaylists(useId);
  }, [useId]);

  return (
    <div css={containerStyle}>
      <header css={header}>
        <p>내가 구독중인 플레이리스트</p>
      </header>
      {forkedPlaylists.map((playlist) => (
        <PlaylistBox
          key={playlist.playlistId}
          userId={playlist.userId}
          playlistId={playlist.playlistId}
          userName={playlist.userName}
          imageUrl={playlist.thumbnailUrl}
          playlistTitle={playlist.title}
          category={playlist.category}
          videoCount={playlist.videoCount}
          forkCount={playlist.forkCount}
          likeCount={playlist.likeCount}
          commentCount={playlist.commentCount}
        />
      ))}
      <Toast />
    </div>
  );
};

const containerStyle = css`
  padding-bottom: 80px;
`;

const header = css`
  display: flex;
  align-items: center;
  width: 100%;
  height: 50px;
  padding-left: 20px;

  p {
    display: flex;
    align-items: center;
    height: 19px;
    font-size: ${theme.fontSizes.large};
    font-weight: 700;
  }
`;

export default Subscriptions;
