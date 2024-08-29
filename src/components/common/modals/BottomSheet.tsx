import React, { useEffect, useState } from 'react';

import { css, keyframes } from '@emotion/react';
import { RiBookmarkLine, RiBookmarkFill } from 'react-icons/ri';

import PlaylistItem from '../PlaylistItem';
import Button from '@/components/common/buttons/Button';
import theme from '@/styles/theme';

interface BottomSheetProps {
  contentType: 'saveToPlaylist' | 'deleteFromPlaylist';
  isOpen: boolean;
  onClose: () => void;
  playlists: {
    id: string;
    title: string;
    isPublic: boolean;
    isBookmarked: boolean;
    thumURL: string;
  }[];
  // eslint-disable-next-line no-unused-vars
  onPlaylistClick: (playlistId: string) => void;
}

const BottomSheet: React.FC<BottomSheetProps> = ({
  isOpen,
  onClose,
  contentType,
  playlists,
  onPlaylistClick,
}) => {
  const [step, setStep] = useState<'initial' | 'choosePlaylist'>('initial');
  const [localPlaylists, setLocalPlaylists] = useState(playlists);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setStep('initial');
    } else {
      setLocalPlaylists(playlists);
    }
  }, [isOpen, playlists]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 300);
  };

  const handlePlaylistClick = (playlistId: string) => {
    setLocalPlaylists((prevPlaylists) =>
      prevPlaylists.map((playlist) =>
        playlist.id === playlistId
          ? { ...playlist, isBookmarked: !playlist.isBookmarked }
          : playlist
      )
    );
    onPlaylistClick(playlistId);
    setTimeout(() => {
      handleClose();
    }, 500);
  };

  const renderContent = () => {
    if (contentType === 'saveToPlaylist' && step === 'choosePlaylist') {
      return (
        <div css={listStyle}>
          <p css={titleStyle}>플레이리스트에 저장</p>
          <ul css={listitemStyle}>
            {localPlaylists.map((playlist) => (
              <li key={playlist.id}>
                <PlaylistItem
                  title={playlist.title}
                  isPublic={playlist.isPublic}
                  isBookmarked={playlist.isBookmarked}
                  thumURL={playlist.thumURL}
                  onClick={() => handlePlaylistClick(playlist.id)}
                />
              </li>
            ))}
          </ul>
          <Button styleType='secondary' onClick={handleClose}>
            새 재생목록 만들기
          </Button>
        </div>
      );
    }

    switch (contentType) {
      case 'saveToPlaylist':
        return (
          <button css={actionButtonStyle} onClick={() => setStep('choosePlaylist')}>
            <RiBookmarkLine css={iconStyle} /> <span css={titleStyle}>내 플레이리스트에 저장</span>
          </button>
        );

      case 'deleteFromPlaylist':
        return (
          <button
            css={actionButtonStyle}
            onClick={() => {
              onPlaylistClick(localPlaylists[0].id);
              handleClose();
            }}
          >
            <RiBookmarkFill css={iconStyle} />
            <span css={titleStyle}>재생목록에서 삭제</span>
          </button>
        );

      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <div css={overlayStyle} onClick={handleClose}>
      <div css={sheetContainerStyle}>
        <div css={sheetStyle(isClosing)} onClick={(e) => e.stopPropagation()}>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

const slideUp = keyframes`
  from {
    bottom: -100%;
    opacity: 0;
  }
  to {
    bottom: 0;
    opacity: 1;
  }
`;

const slideDown = keyframes`
  from {
    bottom: 0;
    opacity: 1;
  }
  to {
    bottom: -100%;
    opacity: 0;
  }
`;

const overlayStyle = css`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  inset: 0;
  z-index: 5;
`;

const sheetContainerStyle = css`
  padding: 0 8px;
  margin: 0 auto;
  width: 100%;
  max-width: 500px;
  height: 100%;
  box-sizing: border-box;
`;

const sheetStyle = (isClosing: boolean) => css`
  width: calc(100% - 1rem);
  max-width: 486px;
  min-height: 130px;
  background-color: #333;
  margin: 0 auto;
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 10px 10px 0 0;
  padding: 16px;
  z-index: 1000;
  box-sizing: border-box;
  animation: ${isClosing ? slideDown : slideUp} 0.3s ease-out;
`;

const titleStyle = css`
  color: white;
  font-size: ${theme.fontSizes.large};
`;

const actionButtonStyle = css`
  color: ${theme.colors.white};
  padding: 2.5rem 1rem;
  background-color: transparent;
  width: 100%;
  text-align: left;
  margin-bottom: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 30px;
`;

const iconStyle = css`
  font-size: 24px;
  height: 24px;
`;

const listStyle = css`
  padding: 1.5rem 0.6rem;
  list-style: none;
`;

const listitemStyle = css`
  margin-top: 1rem;
  margin-bottom: 2rem;
`;

export default BottomSheet;
