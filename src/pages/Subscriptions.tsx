import { useState, useEffect } from 'react';

import { css } from '@emotion/react';
import { collection, getDocs } from 'firebase/firestore';

import { db } from '@/api/index';
import Toast from '@/components/common/Toast';
import PlaylistBox from '@/components/playlist/PlaylistBox';
import { Playlist } from '@/mock/data';
import useToastStore from '@/store/useToastStore';
import useToggleStore from '@/store/useToggleStore';
import theme from '@/styles/theme';

const Subscriptions: React.FC = () => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const { isToggled, toggle } = useToggleStore();
  const { showToast } = useToastStore();

  const fetchPlaylists = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'playlists'));
      const playlistsData = querySnapshot.docs.map((doc) => doc.data() as Playlist);
      setPlaylists(playlistsData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPlaylists();
  }, []);

  const handleSubBtnClick = (playlistId: Playlist) => {
    toggle();
    isToggled
      ? showToast(`"${playlistId.title}" 이(가) 구독 목록에서 해제되었습니다.`)
      : showToast(`"${playlistId.title}" 이(가) 구독 목록에 추가되었습니다.`);
  };

  return (
    <div>
      <header css={header}>
        <p>내가 구독중인 플레이리스트</p>
      </header>
      {playlists.map((playlist) => (
        <PlaylistBox
          key={playlist.playlistId}
          isSubscribed={isToggled}
          onClick={() => handleSubBtnClick(playlist)}
          nickname={playlist.userId}
          imageUrl={playlist.thumbnailUrl}
          playlistTitle={playlist.title}
          category={playlist.category}
          videoCount={playlist.videoCount}
          forkCount={playlist.forkCount}
          likeCount={playlist.likeCount}
          commentCount={playlist.commentCount}
        />
      ))}
      <Toast />
    </div>
  );
};

const header = css`
  display: flex;
  align-items: center;
  width: 100%;
  height: 50px;
  padding-left: 20px;

  p {
    display: flex;
    align-items: center;
    height: 19px;
    font-size: ${theme.fontSizes.large};
    font-weight: 700;
  }
`;

export default Subscriptions;
