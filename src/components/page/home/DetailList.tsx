import React from 'react';

import { css } from '@emotion/react';
import { useLocation, useNavigate } from 'react-router-dom';

import ThumbNailBox from '@/components/common/ThumbNailBox';
import Header from '@/layouts/layout/Header';
import theme from '@/styles/theme';
import { PlaylistModel } from '@/types/playlist';
import { formatTimeWithUpdated } from '@/utils/formatDate';

interface LocationState {
  title: string;
  detailPagePlaylists: PlaylistModel[];
}

const DetailList: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { title, detailPagePlaylists } = location.state as LocationState;

  const handleThumbNailBoxClick = (playlist: PlaylistModel) => {
    navigate(`/playlist/${playlist.playlistId}`, {
      state: { detailPagePlaylists, previousPath: location.pathname },
    });
  };
  return (
    <div>
      <Header onBack={() => navigate('/')} />
      <div css={listStyle}>
        <h2 css={titleStyle}>{title}</h2>
        {detailPagePlaylists.map((playlist) => (
          <ThumbNailBox
            key={playlist.playlistId}
            type='details'
            thumURL={playlist.thumbnailUrl}
            title={playlist.title}
            subtitle={playlist.description}
            likes={playlist.likeCount}
            comments={playlist.commentCount}
            uploader={playlist.userName}
            update={formatTimeWithUpdated(playlist.updatedAt)}
            listnum={playlist.videoCount}
            onClick={() => handleThumbNailBoxClick(playlist)}
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
