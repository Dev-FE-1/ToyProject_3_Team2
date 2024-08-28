import React, { useState, useEffect } from 'react';

import { css } from '@emotion/react';

import theme from '@/styles/theme';
import { validateEmail } from '@/utils/ValidateEmail';

interface InputFormProps {
  onInputChange: (_isValid: boolean, _username: string, _password: string) => void;
  onSubmit: (_e: React.FormEvent) => void;
}

const InputForm: React.FC<InputFormProps> = ({ onInputChange, onSubmit }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUsername = e.target.value;
    setUsername(newUsername);
    if (newUsername && !validateEmail(newUsername)) {
      setUsernameError('이메일 주소가 올바르지 않습니다.');
    } else {
      setUsernameError('');
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    if (newPassword && newPassword.length < 8) {
      setPasswordError('비밀번호는 최소 8자 이상이어야 합니다.');
    } else {
      setPasswordError('');
    }
  };

  useEffect(() => {
    const isValid = username.length > 0 && password.length >= 8 && validateEmail(username);
    onInputChange(isValid, username, password);
  }, [username, password, onInputChange]);

  return (
    <form css={formStyle} onSubmit={onSubmit}>
      <div>
        <input
          type='text'
          id='username'
          value={username}
          onChange={handleUsernameChange}
          required
          placeholder='아이디를 입력하세요'
          css={inputStyle}
        />
        {usernameError && <p css={errorStyle}>{usernameError}</p>}
      </div>
      <div>
        <input
          type='password'
          id='password'
          value={password}
          onChange={handlePasswordChange}
          required
          placeholder='비밀번호를 입력하세요'
          css={inputStyle}
        />
        {passwordError && <p css={errorStyle}>{passwordError}</p>}
      </div>
    </form>
  );
};

const inputStyle = css`
  background: transparent;
  border: none;
  border-bottom: 1px solid ${theme.colors.darkGray};
  padding: 16px 15px 18px 18px;
  margin-bottom: 10px;
  width: 100%;
  height: 50px;
  outline: none;
  font-size: ${theme.fontSizes.large};
  color: ${theme.colors.secondaryHover};
  &::placeholder {
    color: ${theme.colors.darkGray};
  }
`;

const formStyle = css`
  padding: 1rem;
  width: 100%;
`;

const errorStyle = css`
  color: red;
  font-size: ${theme.fontSizes.small};
  margin-top: 5px;
`;

export default InputForm;
