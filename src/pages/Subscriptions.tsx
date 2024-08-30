import { useState } from 'react';

import { css } from '@emotion/react';

import Toast from '@/components/common/Toast';
import PlaylistBox from '@/components/playlist/playlistBox';
import useToastStore from '@/store/useToastStore';
import theme from '@/styles/theme';

const Subscriptions = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const showToast = useToastStore((state) => state.showToast);

  const handleSubBtnClick = () => {
    setIsSubscribed(!isSubscribed);
    isSubscribed
      ? showToast('구독 목록에서 해제되었습니다.')
      : showToast('구독 목록에 추가되었습니다.');
  };

  // 구독목록 페이지 자체헤더
  const PlaylistHeader = () => (
    <header css={header}>
      <p>내가 구독중인 플레이리스트</p>
    </header>
  );

  return (
    <div>
      <PlaylistHeader />
      <PlaylistBox
        isSubscribed={isSubscribed}
        onClick={handleSubBtnClick}
        nickname='고먐미'
        imageUrl='https://goodsisgood.com/wp-content/uploads/2024/02/mindaday1.jpg'
        playlistTitle='개쩌는 플레이리스트 볼사람 여기여기 모여라'
      />
      <PlaylistBox
        isSubscribed={isSubscribed}
        onClick={handleSubBtnClick}
        nickname='고먐미'
        imageUrl='https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDA0MTBfMzMg%2FMDAxNzEyNzA2NTYzMzQ2.LJjblzvIEqxPO_5qBiB4Sk4RtCMhhySYiPgsrtUrp24g.5LiOVYy3D4ZuKA9NEWFPHBvpDv-i-gai52dRszy9DhMg.JPEG%2F1.jpg&type=sc960_832'
        playlistTitle='국뽕 치사량 최대치로 올라오는 플리 모음 1탄'
      />
      <PlaylistBox
        isSubscribed={isSubscribed}
        onClick={handleSubBtnClick}
        nickname='고먐미'
        imageUrl='https://static.displate.com/857x1200/displate/2023-07-04/8bdb31c1949b22406cb2a9c257dae6f4_45fcb4a5a3d57eab739d4a610fb77ab2.jpg'
        playlistTitle='들으면 세상 개힙해지는 플레이리스트'
      />
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
    font-size: ${theme.fontSizes.large};
    font-weight: 700;
  }
`;

export default Subscriptions;
