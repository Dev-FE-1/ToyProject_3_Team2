import React from 'react';

import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';

import { titleStyle } from './PlaylistSection';
import ThumBox from '../common/ThumBox';
import { PlaylistModel } from '@/types/playlist';

interface RecentUpdateSectionProps {
  title: string;
  playlists: PlaylistModel[];
}

const RecentUpdateSection: React.FC<RecentUpdateSectionProps> = ({ title, playlists }) => {
  const navigate = useNavigate();

  const handleThumBoxClick = (playlist: PlaylistModel) => {
    navigate(`Playlist/${playlist.playlistId}`, { state: { playlist } });
  };

  return (
    <div>
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
          onClick={() => handleThumBoxClick(playlist)}
        />
      ))}
    </div>
  );
};

const titleStyle2 = css`
  ${titleStyle}
  margin-left: 1rem;
`;

export default RecentUpdateSection;
