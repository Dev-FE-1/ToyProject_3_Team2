import React from 'react';

import { css } from '@emotion/react';
import { useLocation, useNavigate } from 'react-router-dom';

import ThumBox from '../../common/ThumBox';
import Header from '@/layouts/layout/Header';
import theme from '@/styles/theme';
import { PlaylistModel } from '@/types/playlist';

interface LocationState {
  title: string;
  playlists: PlaylistModel[];
}

const DetailList: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { title, playlists } = location.state as LocationState;

  const handleThumBoxClick = (playlist: PlaylistModel) => {
    navigate(`/playlist/${playlist.playlistId}`, {
      state: { playlist },
    });
    console.log('zxcv');
  };

  return (
    <div>
      <Header onBack={() => navigate(-1)} />
      <div css={listStyle}>
        <h2 css={titleStyle}>{title}</h2>
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
            onClick={() => handleThumBoxClick(playlist)}
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

const titleStyle = css`
  display: flex;
  align-items: center;
  font-size: ${theme.fontSizes.normal};
  font-weight: 700;
  margin: 1rem 0 0 1rem;
`;

export default DetailList;
