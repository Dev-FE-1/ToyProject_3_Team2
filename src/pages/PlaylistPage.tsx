import { useEffect, useState } from 'react';

import { css } from '@emotion/react';
import { DragDropContext, Draggable, DragUpdate, Droppable, DropResult } from 'react-beautiful-dnd';
import { GoKebabHorizontal, GoStar, GoStarFill } from 'react-icons/go';
import { MdDragHandle } from 'react-icons/md';
import { RiPlayLargeFill, RiAddLargeLine, RiPencilLine } from 'react-icons/ri';
import { useParams, useNavigate } from 'react-router-dom';

import {
  getPlaylistWithUser,
  deletePlaylist,
  deleteVideoFromPlaylist,
  addVideoToPlaylist,
  updatePlaylistVideoOrder,
} from '@/api/endpoints/playlist';
// import defaultProfileImage from '@/assets/images/default-avatar-man.svg';
import Button from '@/components/common/buttons/Button';
import IconButton from '@/components/common/buttons/IconButton';
import BottomSheet from '@/components/common/modals/BottomSheet';
import CustomDialog from '@/components/common/modals/Dialog';
import Spinner from '@/components/common/Spinner';
import Toast from '@/components/common/Toast';
import NullBox from '@/components/playlistDetail/nullBox';
import ThumBoxDetail from '@/components/playlistDetail/thumBoxDetail';
import VideoBoxDetail from '@/components/playlistDetail/VideoBoxDetail';
import VideoModal from '@/components/videoModal/VideoModal';
import { PATH } from '@/constants/path';
import Header from '@/layouts/layout/Header';
import { useMiniPlayerStore } from '@/store/useMiniPlayerStore';
import { useModalStore } from '@/store/useModalStore';
import { useToastStore } from '@/store/useToastStore';
import { useToggleStore } from '@/store/useToggleStore';
import theme from '@/styles/theme';
import { PlaylistModel, Video } from '@/types/playlist';
import { UserModel } from '@/types/user';
import { getUserIdBySession } from '@/utils/user';

const PlaylistPage: React.FC = () => {
  const { playlistId } = useParams<{ playlistId: string }>(); // URL 파라미터에서 playlistId 추출
  const [playlist, setPlaylist] = useState<PlaylistModel | null>();
  const [user, setUser] = useState<UserModel | null>(null);
  const isToggled = useToggleStore((state) => state.isToggled);
  const toggle = useToggleStore((state) => state.toggle);
  const showToast = useToastStore((state) => state.showToast);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const isOpen = useMiniPlayerStore((state) => state.isOpen);
  const { openMiniPlayer, updateMiniPlayer } = useMiniPlayerStore();
  const [refreshTrigger, setRefreshTrigger] = useState(Date()); // 요청할 때의 시간

  const [videoData, setVideoData] = useState<Partial<Video>>(); // 추가추가
  const isModalOpen = useModalStore((state) => state.isModalOpen); // 추가추가
  const { openModal, closeModal } = useModalStore(); // 추가추가

  const navigate = useNavigate();

  const userId = getUserIdBySession();

  const [bottomSheetContentType, setBottomSheetContentType] = useState<
    'deleteFromPlaylist' | 'deleteVideo'
  >('deleteFromPlaylist');
  const [selectedVideo, setSelectedVideo] = useState<{ videoId: string; title: string } | null>(
    null
  );

  useEffect(() => {
    const fetchPlaylistWithUser = async () => {
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
    };

    fetchPlaylistWithUser();
  }, [playlistId, refreshTrigger]);

  const handleIconButtonClick = () => {
    showToast('내 재생목록에 저장되었습니다.');
    toggle();
  };

  const handlePlaylistEdit = () => {
    console.log('플레이리스트 수정페이지로 이동', playlist, playlist?.playlistId);
    navigate('/playlist/' + playlist?.playlistId + '/edit');
  };
  const handleAddPlaylist = () => {
    openModal();
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
  const confirmSignOut = () => {
    addVideoToPlaylist(playlistId, videoData as Video);
    setRefreshTrigger(Date());
    closeModal();
  };
  const handleProfileClick = () => {
    if (playlist?.userId) {
      navigate(`/mypage/${playlist.userId}`);
    } else {
      console.error('Unable to navigate: playlist or userId is undefined');
    }
  };
  const onClickKebob = () => {
    setBottomSheetContentType('deleteFromPlaylist');
    setIsBottomSheetOpen(true);
  };

  const handleBottomSheetClose = () => {
    setIsBottomSheetOpen(false);
    setSelectedVideo(null);
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

  const handleVideoDelete = async () => {
    if (!playlist || !selectedVideo) {
      console.error('Playlist or selected video is null');
      return;
    }

    try {
      setIsLoading(true);
      await deleteVideoFromPlaylist(playlist.playlistId, selectedVideo.videoId);

      setPlaylist((prevPlaylist) => {
        if (!prevPlaylist) {
          console.error('Previous playlist is null');
          return null;
        }
        const updatedVideos = prevPlaylist.videos.filter(
          (video) => video.videoId !== selectedVideo.videoId
        );
        return {
          ...prevPlaylist,
          videos: updatedVideos,
          videoCount: updatedVideos.length,
        };
      });

      showToast('동영상이 성공적으로 삭제되었습니다.');
    } catch (error) {
      console.error('Error in handleVideoDelete:', error);
      showToast('동영상 삭제 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
      setSelectedVideo(null);
      handleBottomSheetClose();
    }
  };
  const onClickVideoKebob = (video: { videoId: string; title: string }) => {
    setSelectedVideo(video);
    setBottomSheetContentType('deleteVideo');
    setIsBottomSheetOpen(true);
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

  // 드래그앤드롭 이벤트 핸들러
  const handleDragEnd = async (result: DropResult) => {
    if (!result.destination || !playlist) return;
    const newVideos = Array.from(playlist.videos);
    const [reorderedItem] = newVideos.splice(result.source.index, 1);
    newVideos.splice(result.destination.index, 0, reorderedItem);
    setPlaylist({
      ...playlist,
      videos: newVideos,
    });

    try {
      // 그래그 드롭한 순서로 동영상 순서를 업데이트
      await updatePlaylistVideoOrder(playlist.playlistId, newVideos);
      showToast('동영상 순서가 변경되었습니다.');
    } catch (error) {
      console.error('Error updating playlist video order:', error);
      showToast('동영상 순서 변경 중 오류가 발생했습니다.');
    }
  };
  // 드래그 중 로깅
  const onDragUpdate = (update: DragUpdate) => {
    console.log('Drag update:', update);
    // 여기서 스타일이나 위치 변화를 확인할 수 있습니다.
  };
  // 전체재생하는 미니플레이어(VideoModal) 열기
  const handlePlayAll = () => {
    if (playlist && playlist.videos.length > 0) {
      const firstVideoId = playlist.videos[0].videoId;
      if (firstVideoId) {
        openMiniPlayer(firstVideoId, playlist, userId);
      }
    }
  };

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
          onClickProfile={handleProfileClick}
        />
      )}
      <div css={buttonBoxStyle}>
        <Button styleType='secondary' customStyle={buttonStyle} onClick={handlePlayAll}>
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
        <DragDropContext onDragEnd={handleDragEnd} onDragUpdate={onDragUpdate}>
          <Droppable droppableId='playlistVideos' direction='vertical'>
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                css={playlistContainerStyle}
              >
                {playlist.videos.map((video, index) => (
                  <Draggable key={video.videoId} draggableId={video.videoId || ''} index={index}>
                    {/* provided: Provided.innerRef를 참조, 동작을 실행하는 매개변수 */}
                    {/* snapshot: 동작 시, dom 이벤트에 대하여 적용될 style 참조(옵셔널) */}
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        css={videoBoxWrapperStyle(snapshot.isDragging)}
                      >
                        <div css={draggableListStyle}>
                          <div {...provided.dragHandleProps} css={dragHandleStyle}>
                            <MdDragHandle />
                          </div>
                          <VideoBoxDetail
                            video={video}
                            type={playlist.userId === userId ? 'host' : 'visitor'}
                            channelName={playlist.userName}
                            uploadDate={new Date(playlist.createdAt).toLocaleDateString()}
                            onClickVideo={() => handleVideoClick(video.videoId || '')}
                            onClickKebob={() =>
                              onClickVideoKebob({
                                videoId: video.videoId || '',
                                title: video.title,
                              })
                            }
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
    </div>
  );
};
const containerStyle = css`
  position: relative;
  padding-bottom: 160px;
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
  // cursor: move;
  color: ${theme.colors.darkGray};
  svg {
    width: 20px;
    height: 20px;
  }
`;

const playlistContainerStyle = css`
  flex: 1;
  padding: 0 0.5rem;
  min-height: 100px;
`;
export default PlaylistPage;
