import { useState, useEffect } from 'react';

import { css } from '@emotion/react';
import { FaPlay } from 'react-icons/fa';
import { GoStar, GoStarFill } from 'react-icons/go';
import { RiPencilLine } from 'react-icons/ri';
import { VscKebabVertical } from 'react-icons/vsc';

import Button from '@/components/common/buttons/Button';
import IconButton from '@/components/common/buttons/IconButton';
import Toast from '@/components/common/Toast';
import ThumBoxDetail from '@/components/playlistdetail/thumBoxDetail';
import VideoBoxDetail from '@/components/playlistdetail/vedieoBoxDetail';
import Header from '@/layouts/layout/Header';
import useToastStore from '@/store/useToastStore';
import theme from '@/styles/theme';
import { PlaylistModel } from '@/types/playlist';

const fetchMyPlaylists = async (): Promise<PlaylistModel[]> => {
  const response = await fetch('/src/mock/playlists.json');
  return await response.json();
};

const PlayListPage = () => {
  const [isStarFilled, setIsStarFilled] = useState(false);
  const [playlist, setPlaylist] = useState<Playlist | null>(null);
  const showToast = useToastStore((state) => state.showToast);

  useEffect(() => {
    const loadPlaylist = async () => {
      try {
        const playlists = await fetchMyPlaylists();
        if (playlists.length > 0) {
          setPlaylist(playlists[2]);
        }
      } catch (error) {
        console.error('Failed to load playlist:', error);
      }
    };

    loadPlaylist();
  }, []);

  const handleIconButtonClick = () => {
    setIsStarFilled(!isStarFilled);
    if (!isStarFilled) {
      showToast('내 재생목록에 저장되었습니다.');
    }
  };

  if (!playlist) {
    return <div>Loading...</div>;
  }

  return (
    <div css={containerStyle}>
      <Header
        Icon={VscKebabVertical}
        onBack={() => {
          console.log('사용자정의 뒤로가기 동작 추가');
        }}
      />
      <ThumBoxDetail
        playlist={playlist}
        profileURL='https://img.freepik.com/free-vector/young-man-with-blue-hair_24877-82124.jpg?t=st=1724720053~exp=1724723653~hmac=2deb5619e93e7a773e2d7f182144cc8c65fa620d252c35388c2f3ec5adac104e&w=1480'
        onClickProfile={() => console.log('프로필 클릭')}
      />
      <div css={buttonBoxStyle}>
        <Button
          styleType='secondary'
          customStyle={buttonStyle}
          onClick={() => console.log('전체재생')}
        >
          <FaPlay css={iconStyle} />
          Play all
        </Button>
        <IconButton Icon={isStarFilled ? GoStarFill : GoStar} onClick={handleIconButtonClick} />
        {/* <IconButton Icon={RiPencilLine} onClick={() => console.log('편집모달')} /> */}
      </div>
      {playlist.videos.map((video) => (
        <VideoBoxDetail
          key={video.videoId}
          video={video}
          type='host' // 아이디 비교해서 값이 참이면 host 다르면 visitor
          channelName={playlist.userId}
          uploadDate={new Date(playlist.createdAt).toLocaleDateString()}
          onClick={() => console.log(`비디오 클릭됨: ${video.videoId}`)}
          onClickKebob={(e) => console.log('kebab 아이콘 클릭', video.videoId)}
        />
      ))}
      <Toast />
    </div>
  );
};

const containerStyle = css`
  padding-bottom: 80px;
`;

const buttonBoxStyle = css`
  margin: 1rem;
  display: flex;
  align-items: center;
  margin-bottom: 44px;
`;

const buttonStyle = css`
  font-size: ${theme.fontSizes.large};
  color: ${theme.colors.black};
  width: 84%;
  margin-right: 1rem;
`;

const iconStyle = css`
  margin-right: 6px;
`;

export default PlayListPage;
