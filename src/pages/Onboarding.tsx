import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';

import Button from '@/components/common/buttons/Button';
import { PATH } from '@/constants/path';
import theme from '@/styles/theme';

const Onboarding = () => {
  const navigate = useNavigate();

  const handleSignIn = () => {
    sessionStorage.setItem('onboarding', 'true');
    navigate(PATH.SIGNIN);
  };

  return (
    <div css={container}>
      <img src='/logo.svg' alt='Logo' css={logoStyle} />
      <p css={textStyle}>봄의 설렘을 담고,</p>
      <p css={textStyle}>비디오 속 감동을 나누다 - 봄비, 당신</p>
      <p css={textStyle}>만의 영상 플레이리스트.</p>
      <Button styleType='ghost' customStyle={buttonStyle} onClick={handleSignIn}>
        시작하기
      </Button>
    </div>
  );
};

const container = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const logoStyle = css`
  margin-top: 160px;
  margin-bottom: 61px;
`;

const textStyle = css`
  margin-top: 15px;
  color: ${theme.colors.secondary};
  font-size: ${theme.fontSizes.large};
`;

const buttonStyle = css`
  margin-top: 100px;
  width: 91.5%;
`;

export default Onboarding;
