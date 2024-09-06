import React from 'react';

import { css } from '@emotion/react';

import theme from '@/styles/theme';
interface ProfileProps {
  onClick?: () => void;
  userName: string;
  profileImageSrc?: string;
  marginSide?: string; // props로 관리
}
//기본 프로필 이미지 주소값
const DEFAULT_IMAGE =
  'https://img.freepik.com/premium-vector/bald-empty-face-icon-avatar-vector-illustration_601298-13391.jpg?w=1480';

const Profile: React.FC<ProfileProps> = ({ onClick, userName, profileImageSrc, marginSide }) => {
  const imageSrc = profileImageSrc || DEFAULT_IMAGE;

  return (
    <div css={containerStyle(marginSide)} onClick={onClick}>
      <div css={imageContainerStyle}>
        <img src={imageSrc} alt={`${userName}의 프로필`} css={imageStyle} />
      </div>
      <span css={nameStyle}>{userName}</span>
    </div>
  );
};

export default Profile;

const containerStyle = (marginSide?: string) => css`
  margin: 1rem ${marginSide || '1rem'};
  display: flex;
  align-items: center;
  min-width: 91px;
  height: 35px;
  cursor: pointer;
  justify-content: 'flex-start';
`;

const imageContainerStyle = css`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background-color: ${theme.colors.blue};
  margin-right: 8px;
`;

const imageStyle = css`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
`;

const nameStyle = css`
  width: 70px;
  height: 17px;
  font-size: ${theme.fontSizes.normal};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;