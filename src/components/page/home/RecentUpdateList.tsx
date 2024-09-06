import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';

import ThumbNailBox from '@/components/common/ThumbNailBox';
import theme from '@/styles/theme';
import { PlaylistModel } from '@/types/playlist';
import { formatTimeWithUpdated } from '@/utils/formatDate';

interface RecentUpdateListProps {
  title: string;
  playlists: PlaylistModel[];
}

const RecentUpdateList: React.FC<RecentUpdateListProps> = ({ title, playlists }) => {
  const navigate = useNavigate();

  return (
    <div>
      <h2 css={titleStyle}>{title}</h2>
      {playlists.map((playlist) => (
        <div key={playlist.playlistId} onClick={() => navigate(`playlist/${playlist.playlistId}`)}>
          <ThumbNailBox
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
        </div>
      ))}
    </div>
  );
};

const titleStyle = css`
  display: flex;
  align-items: center;
  font-size: ${theme.fontSizes.normal};
  font-weight: 700;
  margin-left: 1rem;
`;

export default RecentUpdateList;
