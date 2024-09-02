import React from 'react';

import { css } from '@emotion/react';
import { RiArrowRightSLine } from 'react-icons/ri';

import IconTextButton from '@/components/common/buttons/IconTextButton';
import ThumBox from '@/components/common/ThumBox';
import theme from '@/styles/theme';

interface PlaylistSectionProps {
  title: string;
  playlists: PlaylistItem[];
  onSeeAllClick: () => void;
}

const PlaylistSection: React.FC<PlaylistSectionProps> = ({ title, playlists, onSeeAllClick }) => (
  <div css={sectionStyle}>
    <div css={headerStyle}>
      <h2 css={titleStyle}>{title}</h2>
      <IconTextButton
        Icon={RiArrowRightSLine}
        variant='transparent'
        customStyle={customButtonStyle}
      >
        전체보기
      </IconTextButton>
    </div>
    <div css={playlistContainerStyle}>
      {playlists.map((playlist) => (
        <div key={playlist.id} css={playlistItemStyle}>
          <ThumBox
            type='main1'
            thumURL={playlist.thumURL}
            title={playlist.name}
            likes={playlist.likes}
            uploader={playlist.uploader}
            listnum={playlist.listnum}
          />
          <div>{playlist.name}</div>
        </div>
      ))}
    </div>
  </div>
);

const sectionStyle = css`
  margin-bottom: 2rem;
`;

const headerStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 1rem 0.5rem;
`;

const titleStyle = css`
  display: flex;
  align-items: center;
  font-size: ${theme.fontSizes.normal};
  font-weight: 700;
`;

const customButtonStyle = css`
  position: static;
  left: auto;
  bottom: auto;
  cursor: pointer;
  transition: color 0.3s ease;

  &:active {
    color: ${theme.colors.primary}; /* 필요하면 텍스트 색도 변경 */
  }
`;

const playlistContainerStyle = css`
  display: flex;
  overflow-x: scroll;
`;

const playlistItemStyle = css`
  margin-right: 1rem;
  /* 추가적인 스타일링 */
`;

export default PlaylistSection;
