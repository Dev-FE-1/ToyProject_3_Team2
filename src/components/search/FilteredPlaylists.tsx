import ThumBox from '@/components/common/ThumBox';
import { Playlist } from '@/types/playlist';

interface FilteredPlaylistsProps {
  playlists: Playlist[] | null;
}
const FilteredPlaylists: React.FC<FilteredPlaylistsProps> = ({ playlists }) => (
  <div>
    {playlists &&
      playlists.map((playlist) => (
        <ThumBox
          key={playlist.playlistId}
          type='details'
          thumURL={playlist.thumbnailUrl}
          title={playlist.title}
          subtitle={playlist.description}
          likes={playlist.likeCount}
          comments={playlist.commentCount}
          uploader={playlist.username}
          update='2일 전에 업데이드 됨'
          listnum='3'
        />
      ))}
  </div>
);

export default FilteredPlaylists;
