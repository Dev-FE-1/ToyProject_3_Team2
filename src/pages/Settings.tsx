import { css } from '@emotion/react';
import { GoPerson, GoSignOut, GoChevronRight } from 'react-icons/go';

import Header from '@/layouts/layout/Header';
import theme from '@/styles/theme';
const Settings = () => (
  <div>
    <Header>설정</Header>
    <ul css={ulStyle}>
      <li>
        <button css={buttonStyle}>
          <GoPerson />
          <span>프로필 수정</span>
          <GoChevronRight css={iconStyle} />
        </button>
      </li>
      <li>
        <button css={buttonStyle}>
          <GoSignOut />
          <span>로그아웃</span>
          <GoChevronRight css={iconStyle} />
        </button>
      </li>
    </ul>
  </div>
);

const ulStyle = css`
  display: flex;
  flex-direction: column;

  padding: 1rem;
  li {
    svg {
      font-size: 1.5rem;
    }
    cursor: pointer;
  }
`;
const buttonStyle = css`
  position: relative;
  display: flex;
  align-items: center;
  text-indent: 1rem;
  height: ${theme.heights.xtall};
  color: ${theme.colors.white};
  font-size: ${theme.fontSizes.large};
  background-color: ${theme.colors.black};
  width: 100%;
  padding: 0 1rem;
  transition: background-color 0.3s;
`;
const iconStyle = css`
  position: absolute;
  right: 8px;
`;
export default Settings;
