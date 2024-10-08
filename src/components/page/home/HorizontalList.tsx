import React, { useRef } from 'react';

import { css } from '@emotion/react';
import { RiAddLargeLine, RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

import IconButton from '@/components/common/buttons/IconButton';
import IconTextButton from '@/components/common/buttons/IconTextButton';
import ThumbNailBox from '@/components/common/ThumbNailBox';
import { PATH } from '@/constants/path';
import { useScrollWithArrows } from '@/hooks/useScrollWithArrows';
import theme from '@/styles/theme';
import { PlaylistModel } from '@/types/playlist';
import { formatNumberToK } from '@/utils/formatNumber';

interface CrossScrollingListProps {
  title: string;
  playlists: PlaylistModel[];
}

const SEE = {
  MORE: '더보기',
  ALL: '전체보기',
};

const HorizontalList: React.FC<CrossScrollingListProps> = ({ title, playlists }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { handlers, showLeftArrow, showRightArrow, scrollLeftFunc, scrollRightFunc } =
    useScrollWithArrows(scrollRef);
  const navigate = useNavigate();
  const hasRightPadding = playlists.length <= 8;

  const handleMoreClick = () => {
    navigate(PATH.DETAIL_LIST, { state: { title, playlists } });
  };

  return (
    <div css={sectionStyle}>
      <div css={headerStyle}>
        <h2 css={titleStyle}>{title}</h2>
        <IconTextButton
          Icon={RiArrowRightSLine}
          variant='transparent'
          customStyle={customButtonStyle}
          onClick={handleMoreClick}
        >
          {SEE.ALL}
        </IconTextButton>
      </div>
      <div css={scrollWrapperStyle}>
        {showLeftArrow && (
          <div css={arrowButtonStyle('left')} onClick={scrollLeftFunc}>
            <IconButton Icon={RiArrowLeftSLine} customStyle={iconButtonSize} />
          </div>
        )}
        <div css={scrollContainerStyle(hasRightPadding)} ref={scrollRef} {...handlers}>
          {playlists.map((playlist) => (
            <div
              key={playlist.playlistId}
              css={playlistItemStyle}
              onClick={() =>
                navigate(`/playlist/${playlist.playlistId}`, {
                  state: { previousPath: location.pathname },
                })
              }
            >
              <ThumbNailBox
                type='main1'
                thumURL={playlist.thumbnailUrl}
                title={playlist.title}
                likes={formatNumberToK(playlist.likeCount)}
                uploader={playlist.userName}
                listnum={playlist.videoCount}
              />
            </div>
          ))}
          {playlists.length > 8 && (
            <div css={moreButtonStyle} onClick={handleMoreClick}>
              <IconButton Icon={RiAddLargeLine} />
              <p>{SEE.MORE}</p>
            </div>
          )}
        </div>
        {showRightArrow && (
          <div css={arrowButtonStyle('right')} onClick={scrollRightFunc}>
            <IconButton Icon={RiArrowRightSLine} customStyle={iconButtonSize} />
          </div>
        )}
      </div>
    </div>
  );
};

const sectionStyle = css`
  position: relative;
  margin-bottom: 1rem;
`;

const headerStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: -0.5rem 1rem;
  > button {
    position: relative;
    left: 0;
    bottom: 0;
  }
`;

const titleStyle = css`
  display: flex;
  align-items: center;
  font-size: ${theme.fontSizes.normal};
  font-weight: 700;
`;

const customButtonStyle = css`
  cursor: pointer;
  transition: color 0.2s ease;

  &:active {
    color: ${theme.colors.primary};
  }
`;

const scrollWrapperStyle = css`
  position: relative;
  display: flex;
  align-items: center;
`;

const arrowButtonStyle = (position: 'left' | 'right') => css`
  position: absolute;
  ${position}: 0;
  top: 50%;
  transform: translateY(-50%);
  background-color: transparent;
  border: none;
  color: ${theme.colors.white};
  cursor: pointer;
  z-index: 5;
  opacity: 0.8;
  ${position === 'left' ? 'margin-left' : 'margin-right'}: 0.5rem;
  transition: opacity 0.2s ease-in-out;
  &:hover {
    opacity: 1; // 마우스 오버 시 좀 더 선명하게 보이게
  }
`;

const iconButtonSize = css`
  width: ${theme.heights.short};
  height: ${theme.heights.short};
  svg {
    width: 20px;
    height: 20px;
  }
`;

const scrollContainerStyle = (hasRightPadding: boolean) => css`
  display: flex;
  overflow-x: auto;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  touch-action: pan-x;
  scrollbar-width: none;
  padding-right: ${hasRightPadding ? '1rem' : '0'};
  &::-webkit-scrollbar {
    display: none;
  }
  user-select: none;
`;

const playlistItemStyle = css`
  margin-right: 0;
  user-select: none;
`;

const moreButtonStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100px;
  cursor: pointer;
  flex-shrink: 0;
  gap: 0.5rem;
  font-size: ${theme.fontSizes.small};
  font-weight: 500;
`;

export default HorizontalList;
