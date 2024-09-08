import { useEffect, useState } from 'react';

import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';

import { getIsForkedState, toggleForkPlaylist } from '@/api/endpoints/fork';
import { getUserData } from '@/api/endpoints/user';
import Profile from '@/components/page/profile/Profile';
import SubsToggleButton from '@/components/page/subscriptions/SubsToggleButton';
import { useToastStore } from '@/store/useToastStore';
import { useToggleStore } from '@/store/useToggleStore';
import theme from '@/styles/theme';
import { getUserIdBySession } from '@/utils/user';

export interface PlaylistBoxProps {
  userName: string;
  userId: string;
  playlistId: string;
  imageUrl: string;
  playlistTitle: string;
  category: string;
  videoCount: number;
  forkCount: number;
  likeCount: number;
  commentCount: number;
}

const PlaylistBox: React.FC<PlaylistBoxProps> = ({
  userId: playlistUserId,
  userName,
  playlistId,
  imageUrl,
  playlistTitle,
  category,
  videoCount,
  forkCount,
  likeCount,
  commentCount,
}: PlaylistBoxProps) => {
  const [profileImg, setProfileImg] = useState<string | undefined>('');
  const [isForked, setIsForked] = useState<boolean | null>(null);

  const { isToggled, toggle } = useToggleStore();
  const { showToast } = useToastStore();

  const navigate = useNavigate();

  const userId = getUserIdBySession();

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await getUserData(playlistUserId);
      setProfileImg(userData?.profileImg);
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchInitialForkedState = async () => {
      try {
        const initialForkedState = await getIsForkedState(userId, playlistId as string);
        setIsForked(initialForkedState);
      } catch (error) {
        console.error('Error fetching initial Forked state:', error);
      }
    };

    fetchInitialForkedState();
  }, [userId, playlistId]);

  const handleForkToggle = async () => {
    if (isForked === null) return;

    try {
      const newForkState = await toggleForkPlaylist(playlistId as string, userId, isForked);
      setIsForked(newForkState);
      toggle();
      isForked
        ? showToast(`구독 목록에서 해제되었습니다.`)
        : showToast(`구독 목록에 추가되었습니다.`);
    } catch (error) {
      console.error('Failed to toggle Fork:', error);
    }
  };

  return (
    <div css={wrapper}>
      <div css={top}>
        <Profile
          userName={userName}
          profileImg={profileImg}
          onClick={() => navigate(`/mypage/${playlistUserId}`)}
        />
        <SubsToggleButton handleForkToggle={handleForkToggle} isForked={isForked} />
      </div>
      <div css={clickEventStyle} onClick={() => navigate(`/playlist/${playlistId}`)}>
        <div css={middle}>
          <img src={imageUrl} alt='썸네일' />
        </div>
        <div css={bottom}>
          <h1>{playlistTitle}</h1>
          <h2>동영상 {videoCount}개</h2>
          <h2>포크 {forkCount}회</h2>
          <div>
            <h3>#{category}</h3>
            <div css={sumInfo}>
              <h3>좋아요 {likeCount}</h3>
              <h3>댓글 {commentCount}</h3>
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
