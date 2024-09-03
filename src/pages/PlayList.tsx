import { useEffect, useState } from 'react';

import { css } from '@emotion/react';
import { GoKebabHorizontal, GoStar, GoStarFill } from 'react-icons/go';
import { RiPlayLargeFill, RiPencilFill, RiPencilLine } from 'react-icons/ri';
import { useParams } from 'react-router-dom';

import { getPlaylistWithUser } from '@/api/endpoints/playlist';
import defaultProfileImage from '@/assets/images/default-avatar-man.svg';
import Button from '@/components/common/buttons/Button';
import IconButton from '@/components/common/buttons/IconButton';
import Spinner from '@/components/common/Spinner';
import Toast from '@/components/common/Toast';
import ThumBoxDetail from '@/components/playlistdetail/thumBoxDetail';
import VideoBoxDetail from '@/components/playlistdetail/vedieoBoxDetail';
import Header from '@/layouts/layout/Header';
import { useToastStore } from '@/store/useToastStore';
import { useToggleStore } from '@/store/useToggleStore';
import theme from '@/styles/theme';
import { PlaylistModel } from '@/types/playlist';
import { UserModel } from '@/types/user';

const PlaylistPage: React.FC = () => {
  const { playlistId } = useParams<{ playlistId: string }>(); // URL 파라미터에서 playlistId 추출
  const [playlist, setPlaylist] = useState<PlaylistModel | null>(null);
  const [user, setUser] = useState<UserModel | null>(null);
  const isToggled = useToggleStore((state) => state.isToggled);
  const toggle = useToggleStore((state) => state.toggle);
  const showToast = useToastStore((state) => state.showToast);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPlaylistWithUser() {
      if (!playlistId) {
        setError('Playlist ID is missing');
        setIsLoading(false);
        return;
      }

      try {
        const result = await getPlaylistWithUser(playlistId);

        if (result) {
          setPlaylist(result.playlist);
          setUser(result.user);
        } else {
          setError('Playlist not found');
        }
      } catch (err) {
        console.error('Error fetching playlist:', err); // 로그 추가
        setError('Failed to fetch playlist');
      } finally {
        setIsLoading(false);
      }
    }

    fetchPlaylistWithUser();
  }, [playlistId]);

  const handleIconButtonClick = () => {
    showToast('내 재생목록에 저장되었습니다.');
    toggle();
  };

  if (isLoading) {
    return (
      <div css={spinnerContainerStyle}>
        <Spinner />
      </div>
    );
  }
  if (!playlist || !user) {
    return (
      <div>
        <Header customStyle={kebabStyle} />
        <div css={nullContentStyle}>
          <div>앗! 아직 영상이 없어요</div>
          <div>영상을 추가하여</div>
          <div>나만의 플리를 만들어보세요</div>
        </div>
      </div>
    );
  }
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div css={containerStyle}>
      <Header Icon={GoKebabHorizontal} customStyle={kebabStyle} />
      {playlist && (
        <ThumBoxDetail
          playlist={playlist}
          user={user}
          profileURL={user.profileImg || defaultProfileImage}
          onClickProfile={() => console.log('프로필 클릭')}
        />
      )}
      <div css={buttonBoxStyle}>
        <Button
          styleType='secondary'
          customStyle={buttonStyle}
          onClick={() => console.log('전체재생')}
        >
          <RiPlayLargeFill css={iconStyle} />
          Play all
        </Button>
        {playlist.userId === user.userId ? (
          <IconButton
            Icon={isToggled ? RiPencilFill : RiPencilLine}
            onClick={handleIconButtonClick}
          />
        ) : (
          <IconButton Icon={isToggled ? GoStarFill : GoStar} onClick={handleIconButtonClick} />
        )}
      </div>
      {playlist.videos.map((video) => (
        <VideoBoxDetail
          key={video.videoId}
          video={video}
          type={playlist.userId === user.userId ? 'host' : 'visitor'} // 아이디 비교해서 값이 참이면 host 다르면 visitor
          channelName={playlist.userName}
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
  padding-bottom: 90px;
`;
const kebabStyle = css`
  transform: rotate(90deg);
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

const spinnerContainerStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
const nullContentStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-top: 50%;
  height: 100vh;
  div {
    text-align: center;
    margin: 1rem;
  }
`;

export default PlaylistPage;
