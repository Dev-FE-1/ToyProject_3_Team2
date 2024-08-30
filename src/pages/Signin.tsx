import React, { useState } from 'react';

import { css } from '@emotion/react';
import { FirebaseError } from 'firebase/app';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

import { auth } from '@/api/index';
import Button from '@/components/common/buttons/Button';
import InputForm from '@/components/common/Input';
import { PATH } from '@/constants/path';
import { useAuthStore } from '@/store/authStore';
import theme from '@/styles/theme';

const SignIn = () => {
  const [isFormValid, setIsFormValid] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const handleInputChange = (isValid: boolean, newUsername: string, newPassword: string) => {
    setIsFormValid(isValid);
    setUsername(newUsername);
    setPassword(newPassword);
  };

  const handleSignIn = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (isFormValid) {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, username, password);
        console.log('로그인 성공:', userCredential.user.email);
        setErrorMessage('');
        login(userCredential.user.email!);
        navigate(PATH.HOME);
      } catch (error) {
        console.error('로그인 실패: ', error);
        if (error instanceof FirebaseError) {
          if (error.code === 'auth/invalid-credential') {
            setErrorMessage('이메일 주소 또는 비밀번호가 올바르지 않습니다.');
          } else {
            setErrorMessage('로그인에 실패했습니다. 다시 시도해주세요.');
          }
        } else {
          setErrorMessage('오류가 발생했습니다.');
        }
      }
    }
  };

  return (
    <div css={container}>
      <img src='/logo.svg' alt='Logo' css={logoStyle} />
      <InputForm onInputChange={handleInputChange} />
      {isFormValid ? (
        <Button customStyle={buttonStyle} onClick={handleSignIn}>
          로그인
        </Button>
      ) : (
        <Button styleType='disabled' customStyle={buttonStyle}>
          로그인
        </Button>
      )}
      {errorMessage && <p css={errorMessageStyle}>{errorMessage}</p>}
    </div>
  );
};

const container = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const logoStyle = css`
  margin-top: 90px;
  margin-bottom: 38px;
`;

const buttonStyle = css`
  margin-top: 24px;
  width: 91.5%;
`;

const errorMessageStyle = css`
  color: red;
  font-size: ${theme.fontSizes.normal};
  margin-top: 10px;
`;

export default SignIn;
