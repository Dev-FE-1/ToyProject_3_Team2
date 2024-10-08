import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';

import ThumbNailBox from '@/components/common/ThumbNailBox';
import { PLAYLIST } from '@/constants/playlist';
import theme from '@/styles/theme';
import { PlaylistModel } from '@/types/playlist';
import { formatTimeWithUpdated } from '@/utils/formatDate';
import { formatNumberToK } from '@/utils/formatNumber';

interface FilteredPlaylistsProps {
  displayedPlaylists: PlaylistModel[] | null | undefined;
}
const FilteredPlaylists: React.FC<FilteredPlaylistsProps> = ({ displayedPlaylists }) => {
  const navigate = useNavigate();

  const playlists = displayedPlaylists?.filter((playlist) => playlist.isPublic === true);
  return (
    <div>
      {playlists?.length ? (
        playlists.map((playlist) => (
          <div
            key={playlist.playlistId}
            onClick={() =>
              navigate(`/playlist/${playlist.playlistId}`, {
                state: { previousPath: location.pathname },
              })
            }
          >
            <ThumbNailBox
              type='details'
              thumURL={playlist.thumbnailUrl}
              title={playlist.title}
              subtitle={playlist.description}
              likes={formatNumberToK(playlist.likeCount)}
              comments={playlist.commentCount}
              uploader={playlist.userName}
              update={formatTimeWithUpdated(playlist.updatedAt)}
              listnum={playlist.videos.length}
            />
          </div>
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
