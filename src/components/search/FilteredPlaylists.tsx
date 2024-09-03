import { css } from '@emotion/react';

import ThumBox from '@/components/common/ThumBox';
import { PLAYLIST } from '@/constants/playlist';
import theme from '@/styles/theme';
import { PlaylistModel } from '@/types/playlist';
import { formatTimeWithUpdated } from '@/utils/formatDate';

interface FilteredPlaylistsProps {
  displayedPlaylists: PlaylistModel[] | null | undefined;
}
const FilteredPlaylists: React.FC<FilteredPlaylistsProps> = ({ displayedPlaylists }) => {
  const playlists = displayedPlaylists;
  return (
    <div>
      {playlists && playlists.length > 0 ? (
        playlists.map((playlist) => (
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
            listnum={playlist.videos.length}
          />
        ))
      ) : (
        <div css={noResultStyle}>{PLAYLIST.search.no_result}</div>
      )}
    </div>
  );
};

const noResultStyle = css`
  font-size: ${theme.fontSizes.normal};
  padding-top: 3rem;
  text-align: center;
`;

export default FilteredPlaylists;
