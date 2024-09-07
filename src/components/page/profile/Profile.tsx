import React from 'react';

import { css } from '@emotion/react';

import defaultAvatar from '@/assets/images/default-avatar-man.svg';
import theme from '@/styles/theme';
interface ProfileProps {
  onClick?: () => void;
  userName: string;
  profileImg: string | undefined;
}

const Profile: React.FC<ProfileProps> = ({ onClick, userName, profileImg }) => {
  const imageSrc = profileImg || defaultAvatar;

  return (
    <div css={containerStyle} onClick={onClick}>
      <div css={imageContainerStyle}>
        <img src={imageSrc} alt={`${userName}의 프로필`} css={imageStyle} />
      </div>
      <span css={nameStyle}>{userName}</span>
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
