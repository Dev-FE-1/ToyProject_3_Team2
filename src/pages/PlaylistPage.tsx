import React, { useState, useEffect } from 'react';

import { css } from '@emotion/react';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import { GoKebabHorizontal, GoStar, GoStarFill } from 'react-icons/go';
import { MdDragHandle } from 'react-icons/md';
import { RiPlayLargeFill, RiAddLargeLine, RiPencilLine } from 'react-icons/ri';
import { useParams, useNavigate } from 'react-router-dom';

import { getInitialForkedState, toggleFork } from '@/api/endpoints/fork';
import Button from '@/components/common/buttons/Button';
import IconButton from '@/components/common/buttons/IconButton';
import BottomSheet from '@/components/common/modals/BottomSheet';
import CustomDialog from '@/components/common/modals/Dialog';
import Spinner from '@/components/common/Spinner';
import Toast from '@/components/common/Toast';
import NullBox from '@/components/page/playlistdetail/NullBox';
import ThumbNailBoxDetail from '@/components/page/playlistdetail/thumBoxDetail';
import VideoBoxDetail from '@/components/page/playlistdetail/VideoBoxDetail';
import usePlaylistData from '@/hooks/usePlaylistData';
import Header from '@/layouts/layout/Header';
import { useMiniPlayerStore } from '@/store/useMiniPlayerStore';
import { useModalStore } from '@/store/useModalStore';
import { useToastStore } from '@/store/useToastStore';
import { useToggleStore } from '@/store/useToggleStore';
import theme from '@/styles/theme';
import { Video } from '@/types/playlist';
import { getUserIdBySession } from '@/utils/user';

const PlaylistPage: React.FC = () => {
  const navigate = useNavigate();
  const { playlistId } = useParams<{ playlistId: string }>(); // URL 파라미터에서 playlistId 추출
  const [playlist, setPlaylist] = useState<PlaylistModel | null>();
  const [user, setUser] = useState<UserModel | null>(null);
  const toggle = useToggleStore((state) => state.toggle);
  const showToast = useToastStore((state) => state.showToast);
  const userId = getUserIdBySession();

  const {
    playlist,
    user,
    isLoading,
    error,
    handleDeleteVideo,
    handleDeletePlaylist,
    handleAddVideoToPlaylist,
    handleUpdatePlaylistVideoOrder,
  } = usePlaylistData(playlistId);

  const [videoData, setVideoData] = useState<Partial<Video>>();
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [bottomSheetContentType, setBottomSheetContentType] = useState<
    'deleteFromPlaylist' | 'deleteVideo'
  >('deleteFromPlaylist');
  const [selectedVideo, setSelectedVideo] = useState<{ videoId: string; title: string } | null>(
    null
  );
  const [isForked, setIsForked] = useState<boolean | null>(null);
  const isToggled = useToggleStore((state) => state.isToggled);
  const toggle = useToggleStore((state) => state.toggle);
  const isOpen = useMiniPlayerStore((state) => state.isOpen);
  const { openMiniPlayer, updateMiniPlayer } = useMiniPlayerStore();
  const isModalOpen = useModalStore((state) => state.isModalOpen);
  const { openModal, closeModal } = useModalStore();

  useEffect(() => {
    const fetchInitialForkedState = async () => {
      try {
        const initialForkedState = await getInitialForkedState(userId, playlistId as string);
        setIsForked(initialForkedState);
      } catch (error) {
        console.error('Error fetching initial Forked state:', error);
      } finally {
        // setIsLoading(false);
      }
    };

    fetchInitialForkedState();
  }, [userId, playlistId]);

  const handleForkToggle = async () => {
    if (isForked === null) return;

    // setIsLoading(true);
    try {
      const newForkState = await toggleFork(playlistId as string, userId, isForked);
      setIsForked(newForkState);
      showToast('내 재생목록에 저장되었습니다.');
      toggle();
    } catch (error) {
      console.error('Failed to toggle Fork:', error);
    } finally {
      // setIsLoading(false);
    }
  };

  const handleDragEnd = async (result: DropResult) => {
    if (!result.destination || !playlist) return;

    const newVideos = Array.from(playlist.videos);
    const [reorderedItem] = newVideos.splice(result.source.index, 1);
    newVideos.splice(result.destination.index, 0, reorderedItem);

    try {
      await handleUpdatePlaylistVideoOrder(newVideos);
      showToast('동영상 순서가 변경되었습니다.');
    } catch (error) {
      console.error('Error updating playlist video order:', error);
      showToast('동영상 순서 변경 중 오류가 발생했습니다.');
    }
  };
  const confirmAddVideo = async () => {
    if (!videoData || !playlistId) {
      console.error('Video data or playlist ID is missing');
      return;
    }
    try {
      await handleAddVideoToPlaylist(videoData as Video);
      showToast('동영상이 성공적으로 추가되었습니다.');
    } catch (error) {
      console.error('Error adding video to playlist:', error);
      showToast('동영상 추가 중 오류가 발생했습니다.');
    }
    closeModal();
  };

  const onPlaylistDelete = async () => {
    if (!playlist) return;
    try {
      await handleDeletePlaylist(playlist.playlistId);
      showToast('플레이리스트가 성공적으로 삭제되었습니다.');
      navigate(-1);
    } catch (error) {
      console.error('Error deleting playlist:', error);
      showToast('플레이리스트 삭제 중 오류가 발생했습니다.');
    }
  };

  const onVideoDelete = async () => {
    if (!playlist || !selectedVideo) return;
    try {
      await handleDeleteVideo(playlist.playlistId, selectedVideo.videoId);
      showToast('동영상이 성공적으로 삭제되었습니다.');
    } catch (error) {
      console.error('Error deleting video:', error);
      showToast('동영상 삭제 중 오류가 발생했습니다.');
    }
    setSelectedVideo(null);
    setIsBottomSheetOpen(false);
  };

  const handlePlaylistEdit = () => {
    navigate(`/playlist/${playlistId}/edit`);
  };

  const handlePlayAll = () => {
    if (playlist && playlist.videos.length > 0) {
      const firstVideoId = playlist.videos[0].videoId;
      if (firstVideoId) {
        openMiniPlayer(firstVideoId, playlist, userId);
      }
    }
  };

  const handleVideoClick = (videoId: string) => {
    if (playlist) {
      if (isOpen) {
        updateMiniPlayer(videoId, playlist);
      } else {
        openMiniPlayer(videoId, playlist, userId);
      }
    }
  };

  const handleProfileClick = () => {
    if (user) {
      navigate(`/mypage/${user.userId}`);
    }
  };

  if (isLoading)
    return (
      <div css={spinnerContainerStyle}>
        <Spinner />
      </div>
    );
  if (error) return <div css={errorStyle}>Error: {error.message}</div>;
  if (!playlist || !user) return <NullBox />;

  return (
    <div css={containerStyle}>
      <Header
        Icon={playlist.userId === userId ? GoKebabHorizontal : undefined}
        customStyle={kebabStyle}
        onIcon={() => setIsBottomSheetOpen(true)}
        onBack={() => navigate(-1)}
      />
      <ThumbNailBoxDetail playlist={playlist} user={user} onClickProfile={handleProfileClick} />
      <div css={buttonBoxStyle}>
        <Button styleType='secondary' customStyle={buttonStyle} onClick={handlePlayAll}>
          <RiPlayLargeFill css={iconStyle} />
          Play all
        </Button>
        {playlist.userId === userId ? (
          <IconButton Icon={RiPencilLine} onClick={handlePlaylistEdit} />
        ) : (
          <IconButton Icon={isToggled ? GoStarFill : GoStar} onClick={handleForkToggle} />
        )}
      </div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId='playlistVideos' direction='vertical'>
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              css={[playlistContainerStyle, userId === playlist.userId ? '' : extraStyle]}
            >
              {playlist.videos.map((video: Video, index: number) => (
                <Draggable key={video.videoId} draggableId={video.videoId || ''} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      css={videoBoxWrapperStyle(snapshot.isDragging)}
                    >
                      <div css={draggableListStyle}>
                        {userId === playlist.userId && ( // 여기서 userId는 로그인한 사용자
                          <div {...provided.dragHandleProps} css={dragHandleStyle}>
                            <MdDragHandle />
                          </div>
                        )}
                        <VideoBoxDetail
                          video={video}
                          type={playlist.userId === userId ? 'host' : 'visitor'}
                          channelName={playlist.userName}
                          uploadDate={new Date(playlist.createdAt).toLocaleDateString()}
                          onClickVideo={() => handleVideoClick(video.videoId || '')}
                          onClickKebob={() => {
                            setSelectedVideo({ videoId: video.videoId || '', title: video.title });
                            setBottomSheetContentType('deleteVideo');
                            setIsBottomSheetOpen(true);
                          }}
                        />
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      {playlist.userId === userId && (
        <div css={addButtonContainerStyle}>
          <IconButton Icon={RiAddLargeLine} customStyle={floatAddButtonStyle} onClick={openModal} />
        </div>
      )}
      <CustomDialog
        type='videoLink'
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={confirmAddVideo}
        setVideoData={setVideoData}
      />
      <BottomSheet
        contentType={bottomSheetContentType}
        isOpen={isBottomSheetOpen}
        onClose={() => setIsBottomSheetOpen(false)}
        playlists={bottomSheetContentType === 'deleteFromPlaylist' ? [playlist] : undefined}
        video={selectedVideo}
        onPlaylistClick={onPlaylistDelete}
        onVideoDelete={onVideoDelete}
      />
      <Toast />
    </div>
  );
};

const containerStyle = css`
  position: relative;
  padding-bottom: 160px;
`;

const spinnerContainerStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const errorStyle = css`
  color: red;
  text-align: center;
  padding: 20px;
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

const playlistContainerStyle = css`
  flex: 1;
  padding: 0 0.5rem;
  min-height: 100px;
`;

const videoBoxWrapperStyle = (isDragging: boolean) => css`
  position: relative;
  cursor: pointer;
  background-color: ${isDragging ? theme.colors.darkGray : 'transparent'};
  display: flex;
  align-items: center;
  height: 100px;
`;

const draggableListStyle = css`
  display: flex;
  align-items: center;
  width: 100%;
`;

const dragHandleStyle = css`
  color: ${theme.colors.darkGray};
  svg {
    width: 20px;
    height: 20px;
  }
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
const extraStyle = css`
  padding-left: 1rem;
`;

export default PlaylistPage;
