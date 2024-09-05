import { useCallback, useEffect, useRef, useState } from 'react';

import { css } from '@emotion/react';
import { GoX, GoChevronDown } from 'react-icons/go';
import { RiPauseLine, RiPlayFill } from 'react-icons/ri';

import VideoBoxDetail from '@/components/playlistdetail/vedieoBoxDetail';
import Header from '@/layouts/layout/Header';
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

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

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
  return (
    <div css={modalOverlayStyle(isMinimized, isClosing)}>
      <div css={modalContentStyle(isMinimized, isClosing, isMaximizing, isOpen)}>
        <div css={headerStyle(isMinimized)}>
          <Header LeftIcon={GoChevronDown} onBack={handleMinimize} />
        </div>
        <div>
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
            <>
              <div css={playlistInfoStyle}>
                <h1>{playlist.title}</h1>
                <span css={videoCountStyle}>
                  {currentVideoIndex + 1} / {playlist.videos.length}
                </span>
              </div>
              <div css={userNameStyle}>{playlist.userName}</div>
            </>
          )}
          {isMinimized && <div css={overlayStyle} onClick={handleOverlayClick} />}
        </div>
        <div css={controlsContainerStyle(isMinimized)}>
          {isMinimized ? (
            <div css={minimizedControlsStyle} onClick={handleMinimize}>
              <div css={videoInfoStyle}>
                <h3 css={videoTitleStyle}>{currentVideo?.title}</h3>
                <p css={uploaderNameStyle}>{playlist.userName}</p>
              </div>
              <div css={controlButtonsStyle}>
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
            <div css={playlistContainerStyle}>
              {currentPlaylist.videos.map((video) => (
                <div key={video.videoId} css={videoBoxWrapperStyle}>
                  <VideoBoxDetail
                    key={video.videoId}
                    video={video}
                    type={currentPlaylist.userId === userId ? 'host' : 'visitor'}
                    channelName={currentPlaylist.userName}
                    uploadDate={formatTimeWithUpdated(currentPlaylist.createdAt)}
                    onClickVideo={handleVideoClick(video.videoId)}
                    onClickKebob={(e) => console.log('kebab 아이콘 클릭', video.videoId)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
const modalOverlayStyle = (isMinimized: boolean, isClosing: boolean) => css`
  position: ${isMinimized ? 'absolute' : 'sticky'};
  top: ${isMinimized ? 'auto' : '0'};
  left: 0;
  right: 0;
  bottom: ${isMinimized ? '80px' : '0'};
  width: 100%;
  height: ${isMinimized ? '60px' : '100vh'};
  background-color: ${isMinimized ? 'transparent' : theme.colors.black};
  display: flex;
  justify-content: center;
  align-items: ${isMinimized ? 'flex-end' : 'flex-start'};
  z-index: 100;
  transition: all 300ms ease-in-out;
`;

const modalContentStyle = (
  isMinimized: boolean,
  isClosing: boolean,
  isMaximizing: boolean,
  isOpen: boolean
) => css`
  background-color: ${theme.colors.black};
  max-width: 498px;
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
  max-width: 498px;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  position: relative;
  margin: 0 auto;

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

const videoBoxWrapperStyle = css`
  position: relative;
  cursor: pointer;
`;

const playlistContainerStyle = css`
  flex: 1;
  overflow-y: auto;
  padding: 0 1rem;
`;

const minimizedControlsStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  height: 60px;
  width: calc(100% - 106px);
`;

const videoInfoStyle = css`
  flex: 1;
  margin-right: 1rem;
`;

const videoTitleStyle = css`
  font-size: ${theme.fontSizes.small};
  color: ${theme.colors.white};
  width: 38vw;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 8px;
`;

const uploaderNameStyle = css`
  font-size: ${theme.fontSizes.xsmall};
  color: ${theme.colors.disabled};
`;

const controlButtonsStyle = css`
  display: flex;
  align-items: center;
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
