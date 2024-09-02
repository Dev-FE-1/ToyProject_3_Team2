import React, { useEffect, useMemo, useState } from 'react';

import { css } from '@emotion/react';

import ToggleSwitch from '@/components/common/ToggleSwitch';
import FlipCard from '@/components/mypage/FlipCard';
import { useToggleStore } from '@/store/useToggleStore';
import { PlaylistModel } from '@/types/playlist';
interface MyPlaylistsProps {
  playlists: PlaylistModel[];
}

const MyPlaylists: React.FC<MyPlaylistsProps> = ({ playlists }) => {
  const [activeFlipCard, setActiveFlipCard] = useState<string | null>(null);
  const isToggled = useToggleStore((state) => state.isToggled);
  const toggle = useToggleStore((state) => state.toggle);

  const handleFlip = (id: string) => {
    setActiveFlipCard((prevActive) => (prevActive === id ? null : id));
  };
  const filteredPlaylists = useMemo(
    () => (isToggled ? playlists.filter((playlist) => playlist.isPublic) : playlists),
    [playlists, isToggled]
  );
  // 토글 상태가 변경될 때 모든 카드를 초기 상태로 되돌려 줘
  useEffect(() => {
    setActiveFlipCard(null);
  }, [isToggled]);
  return (
    <div css={wrapperStyle}>
      <header css={headerStyle}>
        <div css={titleStyle}>
          <h1>PlayLists</h1>
          <strong>{playlists.length}</strong>
        </div>
        <div css={flexStyle}>
          <ToggleSwitch checked={isToggled} onCheckedChange={toggle} />
        </div>
      </header>
      <div css={flipContainerStyle}>
        {filteredPlaylists.map((playlist, index) => (
          <FlipCard
            key={index}
            id={playlist.playlistId}
            isFlipped={activeFlipCard === playlist.playlistId}
            onFlip={() => handleFlip(playlist.playlistId)}
            title={playlist.title}
            category={playlist.category}
            image={playlist.thumbnailUrl}
          />
        ))}
      </div>
    </div>
  );
};

const wrapperStyle = css`
  padding-bottom: 90px;
`;
const headerStyle = css`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  height: 43px;
  padding: 12px 16px;

  h1 {
    padding-right: 8px;
  }
`;
const titleStyle = css`
  display: flex;
  align-items: center;
`;
const flipContainerStyle = css`
  posiwion: relative;
  max-width: 498px;
  height: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
`;
const flexStyle = css`
  display: flex;
  align-items: center;
  gap: 5px;
`;

export default MyPlaylists;
