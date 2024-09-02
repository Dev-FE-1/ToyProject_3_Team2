import React, { useRef, useState } from 'react';

import { css } from '@emotion/react';
import { RiAddLargeLine, RiArrowRightSLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

import IconButton from '@/components/common/buttons/IconButton';
import IconTextButton from '@/components/common/buttons/IconTextButton';
import ThumBox from '@/components/common/ThumBox';
import theme from '@/styles/theme';
import { PlaylistModel } from '@/types/playlist';

interface PlaylistSectionProps {
  title: string;
  playlists: PlaylistModel[];
}

const PlaylistSection: React.FC<PlaylistSectionProps> = ({ title, playlists }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const navigate = useNavigate();

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (scrollRef.current?.offsetLeft || 0));
    setScrollLeft(scrollRef.current?.scrollLeft || 0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (scrollRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 1; // 스크롤 속도 조절
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMoreClick = () => {
    navigate('/section-list', { state: { title, playlists } });
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
          전체보기
        </IconTextButton>
      </div>
      <div
        css={scrollContainerStyle}
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {playlists.map((playlist) => (
          <div key={playlist.playlistId} css={playlistItemStyle}>
            <ThumBox
              type='main1'
              thumURL={playlist.thumbnailUrl}
              title={playlist.title}
              likes={playlist.likeCount}
              uploader={playlist.userId}
              listnum={playlist.videoCount}
            />
          </div>
        ))}
        <div css={moreButtonStyle} onClick={handleMoreClick}>
          <IconButton Icon={RiAddLargeLine} />
          <p>더보기</p>
        </div>
      </div>
    </div>
  );
};

const sectionStyle = css`
  margin-bottom: 1rem;
`;

const headerStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: -0.5rem 1rem;
`;

export const titleStyle = css`
  display: flex;
  align-items: center;
  font-size: ${theme.fontSizes.normal};
  font-weight: 700;
`;

const customButtonStyle = css`
  position: static;
  cursor: pointer;
  transition: color 0.2s ease;

  &:active {
    color: ${theme.colors.primary};
  }
`;

const scrollContainerStyle = css`
  display: flex;
  overflow-x: auto;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  touch-action: pan-x;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
  user-select: none; /* 텍스트 드래그 방지 */
`;

const playlistItemStyle = css`
  margin-right: 0;
  user-select: none; /* 텍스트 드래그 방지 */
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

export default PlaylistSection;
