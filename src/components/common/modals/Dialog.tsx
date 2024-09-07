import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';

import { css } from '@emotion/react';
import * as Dialog from '@radix-ui/react-dialog';

import { useVideoData } from '@/hooks/queries/useYoutubeQueries';
import theme from '@/styles/theme';
import { Video } from '@/types/playlist';
import { formatDurationISOToTime } from '@/utils/formatTime';
import { getVideoId } from '@/utils/getVideoId';

interface contentType {
  title?: string;
  confirmText?: string;
  cancelText?: string;
}
interface DialogProps {
  type: 'alertConfirm' | 'videoLink';
  customContent?: contentType;
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  onCancel?: () => void;
  setVideoData?: Dispatch<SetStateAction<Partial<Video> | undefined>>;
}

const CustomDialog: React.FC<DialogProps> = ({
  type,
  customContent,
  isOpen,
  onClose,
  onConfirm,
  onCancel,
  setVideoData,
}) => {
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [isConfirmDisabled, setIsConfirmDisabled] = useState(true);

  // videoData를 상위 컴포넌트(Playlist)로 넘기기 위한 커스텀훅 사용
  const { data: videoData } = useVideoData(youtubeUrl as string);

  useEffect(() => {
    setIsConfirmDisabled(type !== 'alertConfirm' && !videoData);

    if (setVideoData && videoData)
      setVideoData({
        ...videoData,
        videoId: getVideoId(youtubeUrl),
        videoUrl: youtubeUrl,
        duration: formatDurationISOToTime(videoData.duration),
      });
  }, [videoData]);

  const getModalContent = (type: DialogProps['type']) => {
    switch (type) {
      case 'alertConfirm':
        return {
          title: customContent?.title || '로그아웃 하시겠습니까?',
          content: null,
          titleStyle: css`
            text-align: center;
            width: 100%;
          `,
          confirmText: customContent?.confirmText || '확인',
          cancelText: customContent?.cancelText || '취소',
        };
      case 'videoLink':
        return {
          title: null,
          content: (
            <>
              {videoData && (
                <img src={videoData.thumbnailUrl} alt='YouTube Thumbnail' css={thumbnailStyle} />
              )}
              {!videoData ? (
                <Dialog.Title
                  css={css`
                    text-align: left;
                    width: 100%;
                  `}
                >
                  영상링크
                  <div css={descriptionStyle}>
                    잘못된 URL 및 공개가 허용되지 않는 영상일 경우 동록할수 없습니다. 등록가능
                    영상은 썸네일이 표시됩니다.
                  </div>
                </Dialog.Title>
              ) : (
                <Dialog.Title
                  css={css`
                    text-align: left;
                    width: 100%;
                  `}
                >
                  {videoData.title}
                  <div css={descriptionStyle}>등록 가능한 영상입니다.</div>
                </Dialog.Title>
              )}

              <input
                type='text'
                css={inputStyle}
                placeholder='영상 링크를 입력하세요'
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
              />
            </>
          ),
          titleStyle: css`
            text-align: left;
            width: 100%;
          `,
          confirmText: '등록',
          cancelText: '취소',
        };
      default:
        return null;
    }
  };

  const handleConfirm = () => (onConfirm ? onConfirm() : onClose());

  const modalContent = getModalContent(type);

  if (!modalContent) {
    return null;
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay css={overlayStyle} />
        <Dialog.Content css={contentStyle} aria-describedby={undefined}>
          {modalContent.title && (
            <Dialog.Title css={modalContent.titleStyle}>{modalContent.title}</Dialog.Title>
          )}
          {modalContent.content}
          <div css={buttonContainerStyle}>
            <Dialog.Close asChild>
              <button css={closeButtonStyle} onClick={onCancel}>
                {modalContent.cancelText}
              </button>
            </Dialog.Close>
            <Dialog.Close asChild disabled={isConfirmDisabled}>
              <button
                css={[buttonStyle, isConfirmDisabled && disabledButtonStyle]}
                onClick={handleConfirm}
                disabled={isConfirmDisabled}
              >
                {modalContent.confirmText}
              </button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

const overlayStyle = css`
  background-color: ${theme.colors.black + '7a'};
  position: absolute;
  width: 498px;
  height: 100%;
  margin: 0 auto;
  inset: 0;
  z-index: 5;
`;

const contentStyle = css`
  background-color: ${theme.colors.tertiary};
  border-radius: 4px;
  padding: 2rem 1rem;
  width: 100%;
  max-width: 279px;
  min-height: 145px;
  margin: 0 auto;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  display: flex;
  flex-direction: column;
`;

const buttonContainerStyle = css`
  display: flex;
  justify-content: flex-end;
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  width: calc(100% - 40px);
`;

const buttonStyle = css`
  background-color: transparent;
  color: ${theme.colors.blue};
  cursor: pointer;
  padding: 1rem;
  font-size: ${theme.fontSizes.large};
  transition: color 300ms ease-in;

  &:hover {
    color: ${theme.colors.blueHover};
  }
`;

const disabledButtonStyle = css`
  opacity: 0.5;
  cursor: not-allowed;
`;

const closeButtonStyle = css`
  ${buttonStyle}
  color: ${theme.colors.white};

  &:hover {
    color: ${theme.colors.disabled};
  }
`;

const inputStyle = css`
  width: 100%;
  height: 40px;
  border-radius: 4px;
  border: 1px solid ${theme.colors.bgSwitchOff};
  background-color: transparent;
  color: ${theme.colors.white};
  margin-top: 20px;
  margin-bottom: 40px;
  padding: 0.75rem;

  &:focus {
    border-color: ${theme.colors.disabled};
    outline: none;
  }
`;

const thumbnailStyle = css`
  width: 100%;
  height: auto;
  border-radius: 4px;
  margin-bottom: 10px;
  object-fit: cover;
`;

const descriptionStyle = css`
  font-size: ${theme.fontSizes.small};
  color: ${theme.colors.disabledText};
  margin-top: 8px;
  letter-spacing: -0.4px;
  line-height: 16px;
`;

export default CustomDialog;
