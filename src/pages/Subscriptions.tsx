import { useState, useEffect } from 'react';

import { css } from '@emotion/react';
import { GoStarFill } from 'react-icons/go';

import { getForkedPlaylists } from '@/api/endpoints/playlistFetch';
import IconButton from '@/components/common/buttons/IconButton';
import Toast from '@/components/common/Toast';
import PlaylistBox from '@/components/page/playlist/PlaylistBox';
import { PLAYLIST } from '@/constants/playlist';
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

      {forkedPlaylists && forkedPlaylists.length > 0 ? (
        forkedPlaylists.map((playlist) => (
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
        ))
      ) : (
        <div css={noResultContainerStyle}>
          {/* 아이콘 표시 */}
          <IconButton Icon={GoStarFill} />
          {/* 메시지 표시 */}
          <div css={noResultStyle}>
            {PLAYLIST.fork.no_result}
            <div css={descriptionStyle}>{PLAYLIST.fork.description}</div>
          </div>
        </div>
      )}
      <Toast />
    </div>
  );
};

const containerStyle = css`
  padding-bottom: 160px;
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

const noResultContainerStyle = css`
  padding-top: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const noResultStyle = css`
  font-size: ${theme.fontSizes.xlarge};
  font-weight: 600;
  padding-top: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex-direction: column;
`;

const descriptionStyle = css`
  font-size: ${theme.fontSizes.normal};
  font-weight: 400;
  padding-top: 1.5rem;
`;

export default Subscriptions;
