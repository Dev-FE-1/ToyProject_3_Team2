import React from 'react';

import { css } from '@emotion/react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';

import { auth } from '@/api/index';
import Button from '@/components/common/buttons/Button';
import { PATH } from '@/constants/path';

const GoogleLoginButton: React.FC = () => {
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();

  const handleGoogleLogin = async () => {
    try {
      const { user } = await signInWithPopup(auth, provider);

      sessionStorage.setItem(
        'userSession',
        JSON.stringify({
          email: user.email,
          uid: user.uid,
        })
      );

      navigate(PATH.HOME);
    } catch (error) {
      console.error('Google 로그인 실패:', error);
    }
  };

  return (
    <Button styleType='secondary' customStyle={buttonStyle} onClick={handleGoogleLogin}>
      <FcGoogle css={iconStyle} />
      Google 계정으로 로그인
    </Button>
  );
};

const buttonStyle = css`
  width: 91.5%;
  position: relative;
`;

const iconStyle = css`
  height: 24px;
  width: 24px;
  position: absolute;
  left: 1rem;
`;

export default GoogleLoginButton;
