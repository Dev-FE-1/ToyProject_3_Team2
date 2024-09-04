import { useEffect, useState } from 'react';

import { css } from '@emotion/react';
import { GoKebabHorizontal, GoStar, GoStarFill } from 'react-icons/go';
import { RiPlayLargeFill, RiAddLargeLine, RiPencilLine } from 'react-icons/ri';
import { useParams, useNavigate } from 'react-router-dom';

import { getPlaylistWithUser, deletePlaylist } from '@/api/endpoints/playlist';
import defaultProfileImage from '@/assets/images/default-avatar-man.svg';
import Button from '@/components/common/buttons/Button';
import IconButton from '@/components/common/buttons/IconButton';
import BottomSheet from '@/components/common/modals/BottomSheet';
import Spinner from '@/components/common/Spinner';
import Toast from '@/components/common/Toast';
import NullBox from '@/components/playlistdetail/nullBox';
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
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const navigate = useNavigate();
  // 세션 스토리지에서 userSession 문자열을 가져와서 파싱
  const userSessionStr = sessionStorage.getItem('userSession');
  if (!userSessionStr) {
    throw new Error('세션에 유저 ID를 찾을 수 없습니다.');
  }
  const userSession = JSON.parse(userSessionStr);
  const userId = userSession.uid;

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

  const handlePlaylistEdit = () => {
    console.log('플레이리스트 수정페이지로 이동');
  };
  const handleAddPlaylist = () => {
    console.log('플레이리스트 링크 추가하는 모달 팝업');
  };
  const onClickKebob = () => {
    setIsBottomSheetOpen(true);
  };

  const handleBottomSheetClose = () => {
    setIsBottomSheetOpen(false);
  };

  const handlePlaylistDelete = async (playlistId: string) => {
    try {
      setIsLoading(true);
      await deletePlaylist(playlistId);
      showToast('플레이리스트가 성공적으로 삭제되었습니다.');
      navigate(-1); // 이전 페이지로 이동
    } catch (error) {
      console.error('Error deleting playlist:', error);
      showToast('플레이리스트 삭제 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
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
        <NullBox />
      </div>
    );
  }
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div css={containerStyle}>
      {playlist.userId === userId ? ( // 여기서 user는 로그인한 사용자
        <Header Icon={GoKebabHorizontal} customStyle={kebabStyle} onIcon={onClickKebob} />
      ) : (
        <Header />
      )}
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
        {playlist.userId === userId ? ( // 여기서 user는 로그인한 사용자
          <IconButton Icon={RiPencilLine} onClick={handlePlaylistEdit} />
        ) : (
          <IconButton Icon={isToggled ? GoStarFill : GoStar} onClick={handleIconButtonClick} />
        )}
      </div>
      {playlist.videos.length > 0 ? (
        playlist.videos.map((video) => (
          <VideoBoxDetail
            key={video.videoId}
            video={video}
            type={playlist.userId === userId ? 'host' : 'visitor'} // 로그인한 사용자 아이디 비교해서 값이 참이면 host 다르면 visitor
            channelName={playlist.userName}
            uploadDate={new Date(playlist.createdAt).toLocaleDateString()}
            onClick={() => console.log(`비디오 클릭됨: ${video.videoId}`)}
            onClickKebob={(e) => console.log('kebab 아이콘 클릭', video.videoId)}
          />
        ))
      ) : (
        <NullBox />
      )}
      {playlist.userId === userId ? (
        <div css={addButtonContainerStyle}>
          <IconButton
            Icon={RiAddLargeLine}
            customStyle={floatAddButtonStyle}
            onClick={handleAddPlaylist}
          />
        </div>
      ) : null}
      <Toast />
      <BottomSheet
        contentType='deleteFromPlaylist'
        isOpen={isBottomSheetOpen}
        onClose={handleBottomSheetClose}
        playlists={[
          {
            id: playlist.playlistId,
            title: playlist.title,
            isPublic: playlist.isPublic,
            isBookmarked: false,
            thumURL: playlist.thumbnailUrl,
          },
        ]}
        onPlaylistClick={handlePlaylistDelete}
      />
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

const addButtonContainerStyle = css`
  position: fixed;
  left: 50%;
  bottom: 96px;
  width: 100vw;
  max-width: 500px;
  height: 1px;
  transform: translateX(-50%);
`;
const floatAddButtonStyle = css`
  position: absolute;
  right: 1.5rem;
  bottom: 0;
  z-index: 100;
  transition: all 0.3s ease;
  &:hover {
    transform: translateY(-2px);
  }
`;
export default PlaylistPage;
