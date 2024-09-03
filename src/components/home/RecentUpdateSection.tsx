import React, { useState, useEffect, useRef } from 'react';

import { css } from '@emotion/react';

import { titleStyle } from './PlaylistSection';
import ThumBox from '../common/ThumBox';
import { getAllPlaylists } from '@/api/endpoints/playlist';
import { PlaylistModel } from '@/types/playlist';
import { formatTimeWithUpdated } from '@/utils/formatDate';

interface RecentUpdateSectionProps {
  title: string;
  playlists: PlaylistModel[];
}

const RecentUpdateSection: React.FC<RecentUpdateSectionProps> = ({ title, playlists }) => {
  const [recentPlaylists, setRecentPlaylists] = useState<PlaylistModel[]>([]);

  useEffect(() => {
    const fetchPlaylists = async () => {
      const allPlaylists = await getAllPlaylists();
      const recentPlaylists = getRecentPlaylists(allPlaylists);
      setRecentPlaylists(recentPlaylists);
    };

    fetchPlaylists();
  }, []);

  const getRecentPlaylists = (playlists: PlaylistModel[], dayAgo: number = 7) => {
    const currentDate = new Date();
    const cutoffDate = new Date(currentDate.getTime() - dayAgo * 24 * 60 * 60 * 1000);

    return playlists.filter((playlist) => {
      const playlistCreatedDate = new Date(playlist.createdAt);
      return playlistCreatedDate >= cutoffDate;
    });
  };

  return (
    <div css={listStyle}>
      <h2 css={titleStyle2}>{title}</h2>
      {recentPlaylists.map((playlist) => (
        <ThumBox
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
        />
      ))}
    </div>
  );
};

const listStyle = css``;

const titleStyle2 = css`
  ${titleStyle}
  margin-left: 1rem;
`;

export default RecentUpdateSection;
