import React, { useState } from 'react';

import { css } from '@emotion/react';

import theme from '@/styles/theme';
import { validateEmail } from '@/utils/ValidateEmail';

interface InputFormProps {
  username: string;
  password: string;
  onInputChange: (_username: string, _password: string) => void;
  onKeyDown: (_event: React.KeyboardEvent) => void;
}

const InputForm: React.FC<InputFormProps> = ({ username, password, onInputChange, onKeyDown }) => {
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    if (id === 'username') {
      onInputChange(value, password);
      if (value && !validateEmail(value)) {
        setUsernameError('이메일 주소가 올바르지 않습니다.');
      } else {
        setUsernameError('');
      }
    } else if (id === 'password') {
      onInputChange(username, value);
      if (value && value.length < 8) {
        setPasswordError('비밀번호는 최소 8자 이상이어야 합니다.');
      } else {
        setPasswordError('');
      }
    }
  };

  return (
    <div css={formStyle}>
      <div>
        <input
          type='text'
          id='username'
          value={username}
          onChange={handleInputChange}
          onKeyDown={onKeyDown}
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
          onChange={handleInputChange}
          onKeyDown={onKeyDown}
          required
          placeholder='비밀번호를 입력하세요'
          css={inputStyle}
        />
        {passwordError && <p css={errorStyle}>{passwordError}</p>}
      </div>
    </div>
  );
};

const inputStyle = css`
  background: transparent;
  border: none;
  border-bottom: 1px solid ${theme.colors.bgSwitchOff};
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
  width: 90%;
`;

const errorStyle = css`
  color: red;
  font-size: ${theme.fontSizes.small};
  margin-top: 5px;
`;

export default InputForm;
