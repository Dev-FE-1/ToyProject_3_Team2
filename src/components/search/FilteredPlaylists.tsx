import ThumBox from '@/components/common/ThumBox';
import { PlaylistModel } from '@/types/playlist';
import { formatTimeWithUpdated } from '@/utils/formatDate';

interface FilteredPlaylistsProps {
  displayedPlaylists: PlaylistModel[] | null;
}
const FilteredPlaylists: React.FC<FilteredPlaylistsProps> = ({ displayedPlaylists }) => {
  const playlists = displayedPlaylists;

  return (
    <div>
      {playlists &&
        playlists.map((pl) => (
          <ThumBox
            key={pl.playlistId}
            type='details'
            thumURL={pl.thumbnailUrl}
            title={pl.title}
            subtitle={pl.description}
            likes={pl.likeCount}
            comments={pl.commentCount}
            uploader={pl.userName}
            update={formatTimeWithUpdated(pl.updatedAt)}
            listnum={pl.videos.length}
          />
        ))}
    </div>
  );
};

export default FilteredPlaylists;
