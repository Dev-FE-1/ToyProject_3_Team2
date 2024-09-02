import React from 'react';

import { css } from '@emotion/react';
import { useLocation, useNavigate } from 'react-router-dom';

import { titleStyle } from './PlaylistSextion';
import ThumBox from '../common/ThumBox';
import Header from '@/layouts/layout/Header';
import { PlaylistModel } from '@/types/playlist';

interface LocationState {
  title: string;
  playlists: PlaylistModel[];
}

const SectionListPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { title, playlists } = location.state as LocationState;

  return (
    <div>
      <Header onBack={() => navigate(-1)} />
      <div css={listStyle}>
        <h2 css={titleStyle2}>{title}</h2>
        {playlists.map((playlist) => (
          <ThumBox
            key={playlist.playlistId}
            type='details'
            thumURL={playlist.thumbnailUrl}
            title={playlist.title}
            subtitle={playlist.description}
            likes={playlist.likeCount}
            comments={playlist.commentCount}
            uploader={playlist.userId}
            update={playlist.updatedAt}
            listnum={playlist.videoCount}
          />
        ))}
      </div>
    </div>
  );
};

const listStyle = css`
  height: calc(100vh - 130px);
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const titleStyle2 = css`
  ${titleStyle}
  margin: 1rem 0 0 1rem;
`;

export default SectionListPage;
