import ThumBox from '@/components/common/ThumBox';
import { Playlist } from '@/types/playlist';

interface FilteredPlaylistsProps {
  displayedPlaylists: Playlist[] | null;
}
const FilteredPlaylists: React.FC<FilteredPlaylistsProps> = ({ displayedPlaylists }) => {
  const pl = displayedPlaylists;
  console.log(pl);
  return (
    <div>
      {pl &&
        pl.map((pl) => (
          <ThumBox
            key={pl.playlistId}
            type='details'
            thumURL={pl.thumbnailUrl}
            title={pl.title}
            subtitle={pl.description}
            likes={pl.likeCount}
            comments={pl.commentCount}
            uploader={pl.userName}
            update='2일 전에 업데이드 됨'
            listnum={pl.videos.length}
          />
        ))}
    </div>
  );
};

export default FilteredPlaylists;
