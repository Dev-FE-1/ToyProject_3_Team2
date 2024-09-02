import React, { useState, useEffect } from 'react';

import { css } from '@emotion/react';
import * as Dialog from '@radix-ui/react-dialog';

import { useVideoData } from '@/hooks/useVideoData';
import theme from '@/styles/theme';

interface contentType {
  title?: string;
  confirmText?: string;
  cancelText?: string;
}

interface DialogProps {
  type: 'alertconfirm' | 'videoLink' | 'videoimageLink';
  customContent?: contentType;
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  onCancel?: () => void;
}

const CustomDialog: React.FC<DialogProps> = ({
  type,
  customContent,
  isOpen,
  onClose,
  onConfirm,
  onCancel,
}) => {
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [isConfirmDisabled, setIsConfirmDisabled] = useState(true);

  const { data: videoData, isLoading, error } = useVideoData(youtubeUrl as string);

  const getModalContent = (type: DialogProps['type']) => {
    switch (type) {
      case 'alertconfirm':
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
          title: '영상링크',
          content: (
            <input
              type='text'
              placeholder='영상 링크를 입력하세요'
              css={inputStyle}
              defaultValue=''
            />
          ),
          titleStyle: css`
            text-align: left;
            width: 100%;
          `,
          confirmText: '등록',
          cancelText: '취소',
        };
      case 'videoimageLink':
        return {
          title: null,
          content: (
            <>
              {/* {thumbnailUrl && (
                <img src={thumbnailUrl} alt='YouTube Thumbnail' css={thumbnailStyle} />
              )} */}
              {videoData && (
                <img src={videoData.thumbnailUrl} alt='YouTube Thumbnail' css={thumbnailStyle} />
              )}
              <Dialog.Title
                css={css`
                  text-align: left;
                  width: 100%;
                `}
              >
                영상링크
              </Dialog.Title>
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

  // useEffect(() => {
  //   const extractVideoId = (url: string) => {
  //     const regex =
  //       /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/;
  //     const match = url.match(regex);
  //     return match ? match[1] : null;
  //   };

  //   const videoId = extractVideoId(youtubeUrl);
  //   if (videoId) {
  //     setThumbnailUrl(`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`);
  //   } else {
  //     setThumbnailUrl('');
  //   }
  //   setIsConfirmDisabled(!youtubeUrl.trim());
  // }, [youtubeUrl]);

  useEffect(() => {
    setIsConfirmDisabled(!videoData?.thumbnailUrl.trim());
  }, [videoData]);

  const modalContent = getModalContent(type);

  if (!modalContent) {
    return null;
  }

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    onClose();
  };

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

// CSS Styles
const overlayStyle = css`
  background-color: ${theme.colors.black + '7a'};
  position: absolute;
  width: 498px;
  height: 100vh;
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

export default CustomDialog;
