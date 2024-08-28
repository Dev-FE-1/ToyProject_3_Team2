import React, { useState } from 'react';

import { css } from '@emotion/react';
import { RiBookmarkLine, RiBookmarkFill } from 'react-icons/ri';

import Button from '@/components/common/buttons/Button';
import theme from '@/styles/theme';

interface BottomSheetProps {
  contentType: 'saveToPlaylist' | 'deleteFromPlaylist';
  isOpen: boolean;
  onClose: () => void;
}

const BottomSheet: React.FC<BottomSheetProps> = ({ isOpen, onClose, contentType }) => {
  const [step, setStep] = useState<'initial' | 'choosePlaylist'>('initial');

  const renderContent = () => {
    if (contentType === 'saveToPlaylist' && step === 'choosePlaylist') {
      return (
        <div css={listStyle}>
          <p css={titleStyle}>플레이리스트에 저장</p>
          <ul>
            <li>Music</li>
            <li>Jazz 힙합</li>
            <li>뉴질랜드 가족여행</li>
          </ul>
          <Button
            styleType='secondary'
            onClick={() => {
              // 새로운 재생목록 생성 로직 연결위치
              onClose();
            }}
          >
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
              onClose();
              // 토스트를 띄우는 로직을 추가
              alert('삭제되었습니다.'); // 여기에 토스트 로직을 연결
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
    <div css={overlayStyle} onClick={onClose}>
      <div css={sheetContainerStyle}>
        <div css={sheetStyle} onClick={(e) => e.stopPropagation()}>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

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

const sheetStyle = css`
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

export default BottomSheet;
