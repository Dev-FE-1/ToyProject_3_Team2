import { useState } from 'react';

import { css } from '@emotion/react';
import { GoStar, GoStarFill } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';

import IconTextButton from '@/components/common/buttons/IconTextButton';
import Toast from '@/components/common/Toast';
import Profile from '@/components/profile/Profile';
import useToastStore from '@/store/useToastStore';
import theme from '@/styles/theme';

const Subscriptions = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const showToast = useToastStore((state) => state.showToast);
  const navigate = useNavigate();

  const handleSubBtnClick = () => {
    setIsSubscribed(!isSubscribed);

    isSubscribed
      ? showToast('구독 목록에서 해제되었습니다.')
      : showToast('구독 목록에 추가되었습니다.');
  };

  return (
    <div>
      {/* <Header>내가 구독중인 플레이리스트</Header> */}
      <header css={header}>
        <p>내가 구독중인 플레이리스트</p>
      </header>
      <div css={wrapper}>
        <div css={top}>
          <Profile marginSide='0' nickname='고먐미' onClick={() => navigate('/')} />
          <IconTextButton
            Icon={isSubscribed ? GoStarFill : GoStar}
            variant='dark'
            onClick={handleSubBtnClick}
          >
            플리 구독 중
          </IconTextButton>
        </div>
        <div css={clickEventStyle} onClick={() => navigate('/')}>
          <div css={middle}>
            <img
              src='https://goodsisgood.com/wp-content/uploads/2024/02/mindaday1.jpg'
              alt='썸네일'
            />
          </div>
          <div css={bottom}>
            <h1>개쩌는 플레이리스트 볼사람 여기여기 모여라</h1>
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
      <div css={wrapper}>
        <div css={top}>
          <Profile marginSide='0' nickname='고먐미' onClick={() => navigate('/')} />
          <IconTextButton
            Icon={isSubscribed ? GoStarFill : GoStar}
            variant='dark'
            onClick={handleSubBtnClick}
          >
            플리 구독 중
          </IconTextButton>
        </div>
        <div css={clickEventStyle} onClick={() => navigate('/')}>
          <div css={middle}>
            <img
              src='https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDA0MTBfMzMg%2FMDAxNzEyNzA2NTYzMzQ2.LJjblzvIEqxPO_5qBiB4Sk4RtCMhhySYiPgsrtUrp24g.5LiOVYy3D4ZuKA9NEWFPHBvpDv-i-gai52dRszy9DhMg.JPEG%2F1.jpg&type=sc960_832'
              alt='썸네일'
            />
          </div>
          <div css={bottom}>
            <h1>국뽕 치사량 최대치로 올라오는 플리 모음 1탄</h1>
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
      <div css={wrapper}>
        <div css={top}>
          <Profile marginSide='0' nickname='고먐미' onClick={() => navigate('/')} />
          <IconTextButton
            Icon={isSubscribed ? GoStarFill : GoStar}
            variant='dark'
            onClick={handleSubBtnClick}
          >
            플리 구독 중
          </IconTextButton>
        </div>
        <div css={clickEventStyle} onClick={() => navigate('/')}>
          <div css={middle}>
            <img
              src='https://static.displate.com/857x1200/displate/2023-07-04/8bdb31c1949b22406cb2a9c257dae6f4_45fcb4a5a3d57eab739d4a610fb77ab2.jpg'
              alt='썸네일'
            />
          </div>
          <div css={bottom}>
            <h1>들으면 세상 개힙해지는 플레이리스트</h1>
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
      <Toast />
    </div>
  );
};

const header = css`
  display: flex;
  align-items: center;
  width: 100%;
  height: 50px;
  padding-left: 20px;

  p {
    display: flex;
    align-items: center;
    height: 19px;
    font-size: ${theme.fontSizes.large};'
    font-weight: 700;
  }
`;

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
  // align-items: center;
  aspect-ratio: 1/1;
  font-size: ${theme.fontSizes.xlarge};
  font-weight: 700;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    background-color: #000; // 직사각형 이미지 첨부 시, 상하 여백을 채우기 위함
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
export default Subscriptions;
