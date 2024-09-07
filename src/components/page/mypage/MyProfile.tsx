import { css } from '@emotion/react';
import { GoChevronLeft } from 'react-icons/go';
import { RiSettings5Line } from 'react-icons/ri'; // setting 아이콘
import { useNavigate } from 'react-router-dom';

import Badge from '@/components/common/Badge';
import { PATH } from '@/constants/path';
import theme from '@/styles/theme';
import { PlaylistModel } from '@/types/playlist';
import { UserModel } from '@/types/user';
import { getUserIdBySession } from '@/utils/user';

interface MyProfileProps {
  userData: UserModel | null;
  playlists: PlaylistModel[] | undefined;
}

const MyProfile: React.FC<MyProfileProps> = ({ userData, playlists }) => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`${PATH.SETTINGS}/`); // 설정 페이지로 이동
  };
  const handleNavigateBack = () => {
    navigate(-1);
  };

  const sessionUid = getUserIdBySession();

  const myPlaylistsCount = playlists?.length;
  const totalLikesCount = playlists?.reduce((acc, playlist) => acc + playlist.likeCount, 0);
  const totalForkedCount = playlists?.reduce((acc, playlist) => acc + playlist.forkCount, 0);

  // userData가 없으면 아무것도 렌더링하지 않음
  if (!userData) {
    return null;
  }
  const hasBadge = userData.totalLikes >= 1000; // 좋아요 1000개 이상이면 뱃지 표시

  return (
    <div css={containerStyle}>
      {userData.userId === sessionUid ? (
        <RiSettings5Line css={topIconStyle} onClick={handleNavigate} />
      ) : (
        <GoChevronLeft css={topleftIconStyle} onClick={handleNavigateBack} />
      )}
      <h1 css={a11yStyle}>MyPage</h1>

      <section css={sectionStyle}>
        <div css={bgStyle(hasBadge)}>
          <div css={contentStyle}>
            <img src={userData.profileImg} alt='profile image' css={photoStyle} />
            {/* profile image */}
            <div css={profileStyle}>
              <h2>{userData.userName}</h2>
              <p>{userData.userBio}</p> {/* bio */}
            </div>
            {hasBadge && (
              <Badge
                text='좋아요'
                suffix='개'
                extra='달성🔥'
                position='center'
                customStyle={badgeStyle}
              >
                1000
              </Badge>
            )}

            <ul css={ulStyle}>
              <li>
                <strong>{myPlaylistsCount}</strong> {/* my playlist */}
                <span>내 플리</span>
              </li>
              <li>
                <strong>{totalLikesCount}</strong> {/* likes */}
                <span>좋아요</span>
              </li>
              <li>
                <strong>{totalForkedCount}</strong> {/* forked */}
                <span>포크</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

const containerStyle = css`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  background-color: ${theme.colors.black};
`;
const topIconStyle = css`
  position: absolute;
  top: 18px;
  right: 22px;
  font-size: 24px;
  color: ${theme.colors.white};
  cursor: pointer;
  width: 24px;
  height: 24px;
  z-index: 5;
`;
const topleftIconStyle = css`
  position: absolute;
  top: 13px;
  right: 92%;
  font-size: 24px;
  color: ${theme.colors.white};
  cursor: pointer;
  width: 24px;
  height: 24px;
  z-index: 5;
`;
const a11yStyle = css`
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
`;
const bgStyle = (hasBadge: boolean) => css`
  position: relative;
  top: 112px;
  left: 50%;
  transform: translateX(-50%);
  max-width: 498px;
  width: 100vw;
  height: ${hasBadge ? '223px' : '198px'};
  margin: 0 auto;
  text-align: center;
  background-color: ${theme.colors.bgMypage};
`;
const sectionStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;
  height: 334px;
`;
const contentStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  transform: translateY(-50px);
`;
const profileStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 14px;
  z-index: 1;
  > h2 {
    margin-bottom: 14px;
  }
`;
const photoStyle = css`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 16px;
  background-color: ${theme.colors.blue};
  object-fit: cover;
  z-index: 1;
`;

const ulStyle = css`
  display: flex;
  align-items: center;
  list-style: none;
  margin-top: 16px;
  font-size: ${theme.fontSizes.large};
  gap: 40px;
  li {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    &::before {
      content: '';
      position: absolute;
      right: -20px;
      top: 50%;
      transform: translateY(-50%);
      width: 1px;
      height: 16px;
      background-color: ${theme.colors.bgBadge};
    }
    &:last-child::before {
      display: none;
    }
    strong {
      line-height: 18px;
    }
    span {
      font-size: ${theme.fontSizes.small};
      color: ${theme.colors.white};
      line-height: 15px;
    }
  }
`;
const badgeStyle = css`
  height: 25px;
  letter-spacing: -0.21px;
`;
export default MyProfile;
