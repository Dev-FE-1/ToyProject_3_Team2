import { useCallback, useEffect, useRef, useState } from 'react';

import { css } from '@emotion/react';
import { DragDropContext, Draggable, DragUpdate, Droppable, DropResult } from 'react-beautiful-dnd';
import { GoX, GoChevronDown } from 'react-icons/go';
import { MdDragHandle } from 'react-icons/md';
import { RiPauseLine, RiPlayFill } from 'react-icons/ri';

import { updatePlaylistVideoOrder } from '@/api/endpoints/playlist';
import VideoBoxDetail from '@/components/page/playlistdetail/VideoBoxDetail';
import Header from '@/layouts/layout/Header';
import { useToastStore } from '@/store/useToastStore';
import theme from '@/styles/theme';
import { PlaylistModel } from '@/types/playlist';
import { formatTimeWithUpdated } from '@/utils/formatDate';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoId: string;
  playlist: PlaylistModel;
  userId: string;
}
const VideoModal = ({ isOpen, onClose, videoId, playlist, userId }: VideoModalProps) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isMaximizing, setIsMaximizing] = useState(false); // 모달이 최대화 중 인지 추적
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentVideoId, setCurrentVideoId] = useState(videoId);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [currentPlaylist, setCurrentPlaylist] = useState(playlist);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const showToast = useToastStore((state) => state.showToast);

  // 드래그 앤 드롭 이벤트 핸들러
  const handleDragEnd = async (result: DropResult) => {
    if (!result.destination) {
      return;
    }
    const newVideos = Array.from(currentPlaylist.videos);
    const [reorderedItem] = newVideos.splice(result.source.index, 1);
    newVideos.splice(result.destination.index, 0, reorderedItem);

    setCurrentPlaylist({
      ...currentPlaylist,
      videos: newVideos,
    });

    try {
      await updatePlaylistVideoOrder(currentPlaylist.playlistId, newVideos);
      showToast('동영상 순서가 변경되었습니다.');
    } catch (error) {
      console.error('비디오 순서 업데이트 실패', error);
    }
  };

  const playNextVideo = useCallback(() => {
    const currentIndex = currentPlaylist.videos.findIndex(
      (video) => video.videoId === currentVideoId
    );
    // 다음 비디오가 있으면 다음 비디오로 전환
    if (currentIndex < currentPlaylist.videos.length - 1) {
      const nextVideo = currentPlaylist.videos[currentIndex + 1];
      setCurrentVideoId(nextVideo.videoId || '');
      setIsPlaying(true);
    } else {
      // 다음 비디오가 없으면 첫 번째 비디오로 전환
      // setCurrentVideoId(currentPlaylist.videos[0].videoId || '');
      // setIsPlaying(true);

      // 또는, 마지막 비디오라면 재생을 멈춤
      setIsPlaying(false); // 재생을 멈춤
      // onClose(); // 모달을 닫음
    }
  }, [currentPlaylist.videos, currentVideoId, onClose]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.event === 'onStateChange' && event.data.info === 0) {
        playNextVideo();
      }
    };
    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [playNextVideo]);

  useEffect(() => {
    setCurrentVideoId(videoId); // 비디오 ID가 변경되면 현재 비디오 ID를 업데이트
    setCurrentPlaylist(playlist); // 플레이리스트가 변경되면 현재 플레이리스트를 업데이트
    setIsPlaying(true); // 비디오 ID가 변경되면 비디오를 재생
    const index = playlist.videos.findIndex((video) => video.videoId === videoId); // 비디오 ID가 변경되면 해당 비디오의 인덱스를 찾아서 업데이트
    setCurrentVideoIndex(index !== -1 ? index : 0); // 비디오 ID가 변경되면 해당 비디오의 인덱스를 찾아서 업데이트
  }, [videoId, playlist]); // 비디오 ID와 플레이리스트가 변경되면 실행

  useEffect(() => {
    if (isOpen && !iframeLoaded) {
      setIframeLoaded(false);
    }
  }, [isOpen, currentVideoId, iframeLoaded]);

  useEffect(() => {
    const index = playlist.videos.findIndex((video) => video.videoId === currentVideoId);
    setCurrentVideoIndex(index !== -1 ? index : 0);
  }, [currentVideoId, playlist.videos]);

  const handleIframeLoad = () => {
    setIframeLoaded(true);
  };

  const togglePlayPause = useCallback(() => {
    setIsPlaying((prevIsPlaying) => {
      // true라면, 재생중이라면
      const newIsPlaying = !prevIsPlaying;
      if (iframeRef.current) {
        const message = newIsPlaying
          ? '{"event":"command","func":"playVideo","args":""}'
          : '{"event":"command","func":"pauseVideo","args":""}';
        iframeRef.current.contentWindow?.postMessage(message, '*');
      }
      return newIsPlaying;
    });
  }, []);

  const handleMinimize = () => {
    setIsMinimized(true);
  };

  const handleMaximize = () => {
    setIsMaximizing(true);
    setIsMinimized(false);
    setTimeout(() => {
      setIsMaximizing(false);
    }, 300);
  };

  const handleCloseModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 300); // 애니메이션 시간과 일치시킵니다
  };
  // 비디오를 클릭하면 해당 비디오로 전환
  const handleVideoClick = (newVideoId: string) => () => {
    setCurrentVideoId(newVideoId);
    setIsPlaying(true);
    setIsMinimized(false); // 비디오를 클릭하면 최소화된 상태에서도 큰 모달로 전환
  };

  const currentVideo = playlist.videos.find((video) => video.videoId === currentVideoId);

  // 오버레이 클릭하면 큰 모달로 전환
  const handleOverlayClick = () => {
    if (isMinimized) {
      handleMaximize();
    }
  };

  // 드래그 중 로깅
  const onDragUpdate = (update: DragUpdate) => {
    console.log('Drag update:', update);
    // 여기서 스타일이나 위치 변화를 확인할 수 있습니다.
  };

  return (
    <div css={modalOverlayStyle(isMinimized, isClosing)}>
      <div css={modalContentStyle(isMinimized, isClosing, isMaximizing, isOpen)}>
        <div css={headerStyle(isMinimized)}>
          <Header LeftIcon={GoChevronDown} onBack={handleMinimize} />
        </div>
        <div css={playerContainerStyle}>
          <div css={videoContainerStyle(isMinimized)}>
            {isOpen && (
              <iframe
                ref={iframeRef}
                src={`https://www.youtube.com/embed/${currentVideoId}?autoplay=1&enablejsapi=1&modestbranding=1&rel=0&playsinline=1`}
                title='YouTube video player'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                allowFullScreen
                onLoad={handleIframeLoad}
                css={iframeStyle(iframeLoaded)}
              />
            )}
          </div>
          {!isMinimized && (
            <div>
              <div css={playlistInfoStyle}>
                <h1>{playlist.title}</h1>
                <span css={videoCountStyle}>
                  {currentVideoIndex + 1} / {playlist.videos.length}
                </span>
              </div>
              <div css={userNameStyle}>{playlist.userName}</div>
            </div>
          )}

          {isMinimized && <div css={overlayStyle} onClick={handleOverlayClick} />}
        </div>
        <div css={controlsContainerStyle(isMinimized)}>
          {isMinimized ? (
            <div css={minimizedControlsStyle} onClick={handleMinimize}>
              <div css={videoInfoStyle}>
                <h3 css={videoTitleStyle}>{currentVideo?.title}</h3>
                <span css={uploaderNameStyle}>{playlist.userName}</span>
              </div>
              <div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    togglePlayPause();
                  }}
                  css={iconButtonStyle}
                >
                  <div css={iconContainerStyle}>
                    {isPlaying ? (
                      <RiPauseLine css={iconStyle(true)} />
                    ) : (
                      <RiPlayFill css={iconStyle(true)} />
                    )}
                  </div>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCloseModal();
                  }}
                  css={iconButtonStyle}
                >
                  <GoX />
                </button>
              </div>
            </div>
          ) : (
            <DragDropContext onDragEnd={handleDragEnd} onDragUpdate={onDragUpdate}>
              <Droppable droppableId='videoList' direction='vertical'>
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    css={playlistContainerStyle}
                  >
                    {currentPlaylist.videos.map((video, index) => (
                      <Draggable
                        key={video.videoId}
                        draggableId={video.videoId || ''}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                            css={videoBoxWrapperStyle(snapshot.isDragging)}
                          >
                            <div css={videoBoxInnerStyle}>
                              <div {...provided.dragHandleProps} css={dragHandleStyle}>
                                <MdDragHandle />
                              </div>
                              <VideoBoxDetail
                                video={video}
                                type={currentPlaylist.userId === userId ? 'host' : 'visitor'}
                                channelName={currentPlaylist.userName}
                                uploadDate={formatTimeWithUpdated(currentPlaylist.createdAt)}
                                onClickVideo={handleVideoClick(video.videoId || '')}
                                onClickKebob={(e) =>
                                  console.log('kebab 아이콘 클릭', video.videoId)
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
          )}
        </div>
      </div>
    </div>
  );
};
const playerContainerStyle = css`
  background-color: ${theme.colors.black};
  display: flex;
  flex-direction: column;
`;

const modalOverlayStyle = (isMinimized: boolean, isClosing: boolean) => css`
  position: ${isMinimized ? 'fixed' : 'sticky'};
  top: ${isMinimized ? 'auto' : '0'};
  left: 0;
  right: 0;
  bottom: ${isMinimized ? '80px' : '0'};

  width: 498px;
  height: ${isMinimized ? '60px' : '100vh'};
  background-color: ${isMinimized ? 'transparent' : theme.colors.black};
  display: flex;
  justify-content: center;
  align-items: ${isMinimized ? 'flex-end' : 'flex-start'};
  z-index: 100;
  transition: all 300ms ease-in-out;
  margin: 0 auto;
`;

const modalContentStyle = (
  isMinimized: boolean,
  isClosing: boolean,
  isMaximizing: boolean,
  isOpen: boolean
) => css`
  background-color: ${theme.colors.black};
  width: 498px;
  height: ${isMinimized ? '60px' : '100vh'};
  margin: 0 auto;
  transform: translateY(${getTransformY(isMinimized, isClosing, isMaximizing)});
  transition: all 300ms ease-out;
  display: flex;
  flex-direction: ${isMinimized ? 'row' : 'column'};
  position: ${isMinimized ? 'fixed' : 'fixed'};
  bottom: 0;
  animation: slideUp 300ms ease-out;
  overflow: hidden;

  @keyframes slideUp {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0);
    }
  }

  @keyframes slideDown {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(calc(100% - 140px));
    }
  }

  @keyframes maximizeUp {
    from {
      transform: translateY(calc(100% - 140px));
    }
    to {
      transform: translateY(0);
    }
  }
`;

const getTransformY = (isMinimized: boolean, isClosing: boolean, isMaximizing: boolean) => {
  if (isClosing) return '100%';
  if (isMinimized) return 'calc(100% - 140px)';
  return '0';
};

const getAnimation = (isClosing: boolean, isMaximizing: boolean, isOpen: boolean) => {
  if (isClosing) return 'none';
  if (isOpen) return 'slideUp';
  return 'none';
};

const headerStyle = (isMinimized: boolean) => css`
  transition: opacity 300ms ease-in-out;
  opacity: ${isMinimized ? 0 : 1};
  height: ${isMinimized ? '0' : 'auto'};
  overflow: hidden;
  display: ${isMinimized ? 'none' : 'block'};
`;
const videoContainerStyle = (isMinimized: boolean) => css`
  width: 100%;
  width: 498px;
  aspect-ratio: 16 / 9;
  //   overflow: hidden;
  position: relative;

  ${isMinimized &&
  `
    width: 106px;
    height: 60px;
    max-height: 60px;
    `}
`;

const playlistInfoStyle = css`
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  padding: 24px 1rem 8px;

  h1 {
    margin-right: 0.5rem;
    font-size: ${theme.fontSizes.xlarge};
    font-weight: 700;
    line-height: normal;
    letter-spacing: -0.18px;
  }
`;
const videoCountStyle = css`
  font-size: ${theme.fontSizes.normal};
  color: ${theme.colors.darkGray};
  font-weight: 300;
  line-height: normal;
  letter-spacing: -0.14px;
`;

const userNameStyle = css`
  padding: 0 1rem;
  font-size: ${theme.fontSizes.normal};
  color: ${theme.colors.disabled};
  font-weight: 300;
  line-height: normal;
  letter-spacing: -0.14px;
  margin-bottom: 55px;
`;
const overlayStyle = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: transparent;
  cursor: pointer;
`;
const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  // 기본 스타일
  userSelect: 'none',
  padding: 0,

  // 드래그 중일 때 변경하고 싶은 스타일
  ...draggableStyle,
  ...(isDragging && {
    top: 'auto',
    left: 'auto',
  }),
});

const videoBoxWrapperStyle = (isDragging: boolean) => css`
  position: relative;
  cursor: pointer;
  background-color: ${isDragging ? theme.colors.tertiary : 'transparent'};
  display: flex;
  align-items: center;
  height: 100px;
  left: ${isDragging ? '0px' : '0'};
`;
// 겹치지 않도록
// draggableListStyle을 videoBoxInnerStyle로 변경
const videoBoxInnerStyle = css`
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
  overflow-y: auto;
`;

const minimizedControlsStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  height: 60px;
`;

const videoInfoStyle = css`
  flex: 1;
  margin-right: 1rem;
`;

const videoTitleStyle = css`
  font-size: ${theme.fontSizes.small};
  color: ${theme.colors.white};
  width: 280px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 8px;
`;

const uploaderNameStyle = css`
  font-size: ${theme.fontSizes.xsmall};
  color: ${theme.colors.disabled};
`;

const iconButtonStyle = css`
  background: none;
  border: none;
  color: ${theme.colors.white};
  font-size: 24px;
  cursor: pointer;
  margin-left: 0.5rem;
  position: relative;
  width: 24px;
  height: 24px;
`;

const iconContainerStyle = css`
  position: relative;
  width: 100%;
  height: 100%;
`;

const iconStyle = (isVisible: boolean) => css`
  position: absolute;
  top: 0;
  left: 0;
  opacity: ${isVisible ? 1 : 0};
  transition: opacity 0.3s ease;
`;
const controlsContainerStyle = (isMinimized: boolean) => css`
  flex: 1;
  transition: all 300ms ease-in-out;
  height: ${isMinimized ? '0' : 'auto'};
`;
const iframeStyle = (loaded: boolean) => css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: ${loaded ? 1 : 0};
  transition: opacity 300ms ease-in-out;
`;
export default VideoModal;