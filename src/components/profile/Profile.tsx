import React from 'react';

import { css } from '@emotion/react';

import theme from '@/styles/theme';
interface ProfileProps {
  onClick?: () => void;
  nickname: string;
  profileImageSrc?: string;
}
//기본 프로필 이미지 주소값
const DEFAULT_IMAGE =
  'https://img.freepik.com/premium-vector/bald-empty-face-icon-avatar-vector-illustration_601298-13391.jpg?w=1480';

const Profile: React.FC<ProfileProps> = ({ onClick, nickname, profileImageSrc }) => {
  const imageSrc = profileImageSrc || DEFAULT_IMAGE;

  return (
    <div css={containerStyle} onClick={onClick}>
      <div css={imageContainerStyle}>
        <img src={imageSrc} alt={`${nickname}의 프로필`} css={imageStyle} />
      </div>
      <span css={nameStyle}>{nickname}</span>
    </div>
  );
};

export default Profile;

const containerStyle = css`
  margin: 1rem;
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
  margin-right: 8px;
`;

const imageStyle = css`
  width: 100%;
  height: 100%;
  border-radius: 50%;
`;

const nameStyle = css`
  width: 48px;
  height: 17px;
  font-size: ${theme.fontSizes.normal};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
