import React, { useRef } from 'react';

import { css } from '@emotion/react';
import { RiAddLargeLine, RiArrowRightSLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

import IconButton from '@/components/common/buttons/IconButton';
import IconTextButton from '@/components/common/buttons/IconTextButton';
import ThumbNailBox from '@/components/common/ThumbNailBox';
import { useDragToScroll } from '@/hooks/useDragToScroll';
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

const CrossScrollingList: React.FC<CrossScrollingListProps> = ({ title, playlists }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { handlers } = useDragToScroll();
  const navigate = useNavigate();

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
          {SEE.ALL}
        </IconTextButton>
      </div>
      <div css={scrollContainerStyle} ref={scrollRef} {...handlers}>
        {playlists.map((playlist) => (
          <div
            key={playlist.playlistId}
            css={playlistItemStyle}
            onClick={() => navigate(`playlist/${playlist.playlistId}`)}
          >
            <ThumbNailBox
              type='main1'
              thumURL={playlist.thumbnailUrl}
              title={playlist.title}
              likes={+formatNumberToK(playlist.likeCount)}
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

export default CrossScrollingList;
