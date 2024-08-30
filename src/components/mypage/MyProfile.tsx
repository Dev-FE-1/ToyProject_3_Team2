import { useEffect, useState } from 'react';

import { css } from '@emotion/react';
import { RiSettings5Line } from 'react-icons/ri'; // setting 아이콘
import { useNavigate } from 'react-router-dom';

import defaultAvatar from '@/assets/images/default-avatar-woman.svg';
import Badge from '@/components/common/Badge';
import { PATH } from '@/constants/path';
import theme from '@/styles/theme';
import { User } from '@/types/user';

const fetchUser = async (): Promise<User[]> => {
  const response = await fetch('/src/mock/users.json');
  const data = await response.json();
  return data;
};

const MyProfile = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`${PATH.SETTINGS}/`); // 설정 페이지로 이동
  };
  return (
    <div css={containerStyle}>
      <RiSettings5Line css={topIconStyle} onClick={handleNavigate} />
      <h1 css={a11yStyle}>MyPage</h1>

      <section css={sectionStyle}>
        <div css={bgStyle}></div>

        <img src={defaultAvatar} alt='profile image' css={photoStyle} />
        {/* profile image */}
        <div css={profileStyle}>
          <h2>_my_app_nickname</h2>
          <p>1일1운동 챌린지 중 입니다 🏃🏻‍♀️</p> {/* bio */}
        </div>
        <Badge
          text='좋아요'
          suffix='개'
          extra='달성🔥'
          position='center'
          customStyle={css({ width: '155px' })}
        >
          1000
        </Badge>
        <ul css={ulStyle}>
          <li>
            <strong>124</strong> {/* my playlist */}
            <span>내 플리</span>
          </li>
          <li>
            <strong>1161</strong> {/* likes */}
            <span>좋아요</span>
          </li>
          <li>
            <strong>118</strong> {/* forked */}
            <span>포크</span>
          </li>
        </ul>
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
const bgStyle = css`
  position: absolute;
  top: 112px;
  left: 50%;
  transform: translateX(-50%);
  max-width: 498px;
  width: 100%;
  height: 229px;
  margin: 0 auto;

  background-color: ${theme.colors.bgMypage};
`;
const sectionStyle = css`
  padding-top: 62px;
  padding-bottom: 31px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  z-index: 1;
`;
const profileStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  z-index: 1;
`;
const photoStyle = css`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 2px;
  background-color: ${theme.colors.blue};
  object-fit: cover;
  z-index: 1;
`;

const ulStyle = css`
  display: flex;
  align-items: center;
  list-style: none;
  margin-top: 2px;
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
    span {
      font-size: ${theme.fontSizes.small};
      color: ${theme.colors.white};
    }
  }
`;

export default MyProfile;
