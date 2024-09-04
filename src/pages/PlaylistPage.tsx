import React from 'react';

import { css } from '@emotion/react';
import { GoKebabHorizontal, GoStar, GoStarFill } from 'react-icons/go';
import { RiPlayLargeFill, RiAddLargeLine, RiPencilLine } from 'react-icons/ri';
import { useParams } from 'react-router-dom';

import defaultProfileImage from '@/assets/images/default-avatar-man.svg';
import Button from '@/components/common/buttons/Button';
import IconButton from '@/components/common/buttons/IconButton';
import BottomSheet from '@/components/common/modals/BottomSheet';
import Spinner from '@/components/common/Spinner';
import Toast from '@/components/common/Toast';
import NullBox from '@/components/playlistdetail/nullBox';
import ThumBoxDetail from '@/components/playlistdetail/thumBoxDetail';
import VideoBoxDetail from '@/components/playlistdetail/vedieoBoxDetail';
import useBottomSheet from '@/hooks/useBottomSheet';
import usePlaylistActions from '@/hooks/usePlaylistAction';
import usePlaylistData from '@/hooks/usePlaylistData';
import useUserSession from '@/hooks/useUserSession';
import useVideoActions from '@/hooks/useVideoAction';
import Header from '@/layouts/layout/Header';
import theme from '@/styles/theme';

const PlaylistPage: React.FC = () => {
  const { playlistId } = useParams<{ playlistId: string }>();
  const { playlist, user, isLoading, error } = usePlaylistData(playlistId);
  const { handleIconButtonClick, handlePlaylistEdit, handleAddPlaylist, handlePlaylistDelete } =
    usePlaylistActions();
  const { selectedVideo, handleVideoDelete, onClickVideoKebob } = useVideoActions(
    playlist,
    () => {}
  );
  const {
    isBottomSheetOpen,
    bottomSheetContentType,
    onClickKebob,
    handleBottomSheetClose,
    setBottomSheetContentType,
    setIsBottomSheetOpen,
  } = useBottomSheet();
  const { userId, error: userError } = useUserSession();

  const isToggled = false;

  if (isLoading) {
    return (
      <div css={spinnerContainerStyle}>
        <Spinner />
      </div>
    );
  }

  if (error || userError || !playlist || !user || !userId) {
    return (
      <div>
        <Header customStyle={kebabStyle} />
        <NullBox />
        {error || userError}
      </div>
    );
  }

  return (
    <div css={containerStyle}>
      {playlist.userId === userId ? (
        <Header Icon={GoKebabHorizontal} customStyle={kebabStyle} onIcon={onClickKebob} />
      ) : (
        <Header />
      )}
      <ThumBoxDetail
        playlist={playlist}
        user={user}
        profileURL={user.profileImg || defaultProfileImage}
        onClickProfile={() => console.log('프로필 클릭')}
      />
      <div css={buttonBoxStyle}>
        <Button
          styleType='secondary'
          customStyle={buttonStyle}
          onClick={() => console.log('전체재생')}
        >
          <RiPlayLargeFill css={iconStyle} />
          Play all
        </Button>
        {playlist.userId === userId ? (
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
            type={playlist.userId === userId ? 'host' : 'visitor'}
            channelName={playlist.userName}
            uploadDate={new Date(playlist.createdAt).toLocaleDateString()}
            onClick={() => console.log(`비디오 클릭됨: ${video.videoId}`)}
            onClickKebob={() => {
              onClickVideoKebob({ videoId: video.videoId, title: video.title });
              setBottomSheetContentType('deleteVideo');
              setIsBottomSheetOpen(true);
            }}
          />
        ))
      ) : (
        <NullBox />
      )}
      {playlist.userId === userId && (
        <div css={addButtonContainerStyle}>
          <IconButton
            Icon={RiAddLargeLine}
            customStyle={floatAddButtonStyle}
            onClick={handleAddPlaylist}
          />
        </div>
      )}
      <BottomSheet
        contentType={bottomSheetContentType}
        isOpen={isBottomSheetOpen}
        onClose={handleBottomSheetClose}
        playlists={
          bottomSheetContentType === 'deleteFromPlaylist'
            ? [
                {
                  id: playlist.playlistId,
                  title: playlist.title,
                  isPublic: playlist.isPublic,
                  isBookmarked: false,
                  thumURL: playlist.thumbnailUrl,
                },
              ]
            : undefined
        }
        video={selectedVideo || undefined}
        onPlaylistClick={handlePlaylistDelete}
        onVideoDelete={handleVideoDelete}
      />
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
