import { css } from '@emotion/react';
import { GoStar, GoStarFill } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';

import IconTextButton from '@/components/common/buttons/IconTextButton';
import Profile from '@/components/profile/Profile';
import theme from '@/styles/theme';

interface PlaylistBoxProps {
  isSubscribed: boolean;
  onClick: () => void;
  nickname: string;
  imageUrl: string;
  playlistTitle: string;
}

const PlaylistBox: React.FC<PlaylistBoxProps> = ({
  isSubscribed,
  onClick,
  nickname,
  imageUrl,
  playlistTitle,
}: PlaylistBoxProps) => {
  const navigate = useNavigate();

  return (
    <div css={wrapper}>
      <div css={top}>
        <Profile marginSide='0' nickname={nickname} onClick={() => navigate('/')} />
        <IconTextButton Icon={isSubscribed ? GoStarFill : GoStar} variant='dark' onClick={onClick}>
          {isSubscribed ? '플리 구독 중' : '플리 구독'}
        </IconTextButton>
      </div>
      <div css={clickEventStyle} onClick={() => navigate('/')}>
        <div css={middle}>
          <img src={imageUrl} alt='썸네일' />
        </div>
        <div css={bottom}>
          <h1>{playlistTitle}</h1>
          <h2>동영상 5개</h2>
          <h2>포크 200회</h2>
          <div>
            <h3>#스포츠</h3>
            <div css={sumInfo}>
              <h3>좋아요 100</h3>
              <h3>댓글 2</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const wrapper = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 16px 32px;
`;

const top = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const clickEventStyle = css`
  cursor: pointer;
`;

const middle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  aspect-ratio: 1/1;
  font-size: ${theme.fontSizes.xlarge};
  font-weight: 700;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    background-color: #000;
  }
`;

const bottom = css`
  h1 {
    width: 100%;
    display: flex;
    align-items: center;
    height: 21px;
    color: ${theme.colors.white};
    font-size: ${theme.fontSizes.xlarge};
    margin-top: 15px;
  }

  h2 {
    color: ${theme.colors.disabled};
    font-size: ${theme.fontSizes.normal};
    display: inline-block;
    padding: 7px 0;

    :first-of-type::after {
      content: '•';
      padding: 0 4px;
    }
  }

  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  h3 {
    height: 14px;
    color: ${theme.colors.blue};
    font-size: ${theme.fontSizes.small};
    margin-top: 18px;
  }
`;

const sumInfo = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100px;
  height: 14px;

  h3 {
    color: ${theme.colors.disabled};
    :first-of-type::after {
      content: '•';
      padding: 0 4px;
    }
  }
`;

export default PlaylistBox;
