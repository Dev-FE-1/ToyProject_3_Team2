import React, { useState } from 'react';

import { css } from '@emotion/react';

import Button from '@/components/common/buttons/Button';
import InputForm from '@/components/common/Input';
import theme from '@/styles/theme';

//임시 test용 하드코딩 아이디
const pw = 'a12345678';
const id = 'example@gmail.com';

const SignIn = () => {
  const [isFormValid, setIsFormValid] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (isValid: boolean, newUsername: string, newPassword: string) => {
    setIsFormValid(isValid);
    setUsername(newUsername);
    setPassword(newPassword);
  };

  const handleSignIn = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (isFormValid) {
      if (username !== id) {
        console.log('Fail Sign in with:', username, password);
        setErrorMessage('아이디가 존재하지 않습니다.');
      } else if (username === id && password !== pw) {
        console.log('Fail Sign in with:', username, password);
        setErrorMessage('비닐번호가 일치하지 않습니다.');
      } else {
        console.log('Sign in with:', username, password);
        setErrorMessage('');
      }
    }
  };

  return (
    <div css={container}>
      <img src='/logo.svg' alt='Logo' css={logoStyle} />
      <InputForm onInputChange={handleInputChange} />
      {errorMessage && <p css={errorMessageStyle}>{errorMessage}</p>}
      {isFormValid ? (
        <Button customStyle={buttonStyle} onClick={handleSignIn}>
          로그인
        </Button>
      ) : (
        <Button styleType='disabled' customStyle={buttonStyle}>
          로그인
        </Button>
      )}
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
