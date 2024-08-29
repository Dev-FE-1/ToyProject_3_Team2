import { useState } from 'react';

import { css } from '@emotion/react';
import { GoStar, GoStarFill } from 'react-icons/go';

import IconTextButton from '@/components/common/buttons/IconTextButton';
import Profile from '@/components/profile/Profile';
import Header from '@/layouts/layout/Header';
import theme from '@/styles/theme';

const Subscriptions = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleClick = () => {
    setIsSubscribed(!isSubscribed);
  };

  return (
    <div>
      <Header>내가 구독중인 플레이리스트</Header>
      <div css={wrapper}>
        <div css={top}>
          <Profile marginSide='0' nickname='고먐미' />
          <IconTextButton
            Icon={isSubscribed ? GoStarFill : GoStar}
            variant='dark'
            onClick={handleClick}
          >
            플리 구독 중
          </IconTextButton>
        </div>
        <div css={middle}>
          <img src='' alt='썸네일' />
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
      <div css={wrapper}>
        <div css={top}>
          <Profile marginSide='0' nickname='고먐미' />
          <IconTextButton
            Icon={isSubscribed ? GoStarFill : GoStar}
            variant='dark'
            onClick={handleClick}
          >
            플리 구독 중
          </IconTextButton>
        </div>
        <div css={middle}>
          <img src='' alt='썸네일' />
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
      <div css={wrapper}>
        <div css={top}>
          <Profile marginSide='0' nickname='고먐미' />
          <IconTextButton
            Icon={isSubscribed ? GoStarFill : GoStar}
            variant='dark'
            onClick={handleClick}
          >
            플리 구독 중
          </IconTextButton>
        </div>
        <div css={middle}>
          <img src='' alt='썸네일' />
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
      <div css={wrapper}>
        <div css={top}>
          <Profile marginSide='0' nickname='고먐미' />
          <IconTextButton
            Icon={isSubscribed ? GoStarFill : GoStar}
            variant='dark'
            onClick={handleClick}
          >
            플리 구독 중
          </IconTextButton>
        </div>
        <div css={middle}>
          <img src='' alt='썸네일' />
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
      <div css={wrapper}>
        <div css={top}>
          <Profile marginSide='0' nickname='고먐미' />
          <IconTextButton
            Icon={isSubscribed ? GoStarFill : GoStar}
            variant='dark'
            onClick={handleClick}
          >
            플리 구독 중
          </IconTextButton>
        </div>
        <div css={middle}>
          <img src='' alt='썸네일' />
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
      <div css={wrapper}>
        <div css={top}>
          <Profile marginSide='0' nickname='고먐미' />
          <IconTextButton
            Icon={isSubscribed ? GoStarFill : GoStar}
            variant='dark'
            onClick={handleClick}
          >
            플리 구독 중
          </IconTextButton>
        </div>
        <div css={middle}>
          <img src='' alt='썸네일' />
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
      <div css={wrapper}>
        <div css={top}>
          <Profile marginSide='0' nickname='고먐미' />
          <IconTextButton
            Icon={isSubscribed ? GoStarFill : GoStar}
            variant='dark'
            onClick={handleClick}
          >
            플리 구독 중
          </IconTextButton>
        </div>
        <div css={middle}>
          <img src='' alt='썸네일' />
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
      <div css={wrapper}>
        <div css={top}>
          <Profile marginSide='0' nickname='고먐미' />
          <IconTextButton
            Icon={isSubscribed ? GoStarFill : GoStar}
            variant='dark'
            onClick={handleClick}
          >
            플리 구독 중
          </IconTextButton>
        </div>
        <div css={middle}>
          <img src='' alt='썸네일' />
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
      <div css={wrapper}>
        <div css={top}>
          <Profile marginSide='0' nickname='고먐미' />
          <IconTextButton
            Icon={isSubscribed ? GoStarFill : GoStar}
            variant='dark'
            onClick={handleClick}
          >
            플리 구독 중
          </IconTextButton>
        </div>
        <div css={middle}>
          <img src='' alt='썸네일' />
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
      <div css={wrapper}>
        <div css={top}>
          <Profile marginSide='0' nickname='고먐미' />
          <IconTextButton
            Icon={isSubscribed ? GoStarFill : GoStar}
            variant='dark'
            onClick={handleClick}
          >
            플리 구독 중
          </IconTextButton>
        </div>
        <div css={middle}>
          <img src='' alt='썸네일' />
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
  );
};

const wrapper = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 16px 20px;
`;

const top = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const middle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  // align-items: center;
  aspect-ratio: 1/1;
  font-size: ${theme.fontSizes.xlarge};
  font-weight: 700;
  color: #000; //alt 텍스트 보이기 위함 -> 사진들어가면 삭제

  img {
    width: 100%;
    height: 100%;
    background-color: ${theme.colors.white};
    margin-bottom: 15px;
  }
`;

const bottom = css`
  h1 {
    display: flex;
    align-items: center;
    height: 21px;
    color: ${theme.colors.white};
    font-size: ${theme.fontSizes.xlarge};
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
