import React, { Dispatch, SetStateAction } from 'react';

import { css } from '@emotion/react';
import { IoIosSearch } from 'react-icons/io';

import { PLAYLIST } from '@/constants/playlist';
import theme from '@/styles/theme';

interface InputProps {
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  filterBySearchTerm: () => void;
}

const Input: React.FC<InputProps> = ({ searchTerm, setSearchTerm, filterBySearchTerm }) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      filterBySearchTerm();
    }
  };
  return (
    <div css={containerStyle}>
      <input
        type='text'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={PLAYLIST.search.placeholder}
        css={inputStyle}
      />
      <IoIosSearch css={iconStyle} onClick={filterBySearchTerm} />
    </div>
  );
};

const containerStyle = css`
  display: flex;
  justify-content: center;
  position: relative;
`;

const inputStyle = css`
  font-size: ${theme.fontSizes.normal};
  font-weight: 700;
  color: ${theme.colors.whiteText};
  background: ${theme.colors.tertiary};
  margin: 30px 16px 0 16px;
  padding: 4px 12px;
  padding-right: 36px;
  width: 100%;
  height: ${theme.heights.tall};
  border: 0;
  outline: 0;
  border-radius: 4px;
`;

const iconStyle = css`
  position: absolute;
  width: 24px;
  height: 24px;
  top: 50%;
  right: 24px;
  cursor: pointer;
`;

export default Input;
