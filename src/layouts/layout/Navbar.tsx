import { css } from '@emotion/react';
import {
  RiHome5Line,
  RiHome5Fill,
  RiSearchLine,
  RiSearch2Fill,
  RiStackLine,
  RiStackFill,
  RiUserLine,
  RiUserFill,
} from 'react-icons/ri';
import { NavLink } from 'react-router-dom';

import { PATH, PATH_TITLE } from '@/constants/path';
import theme from '@/styles/theme';

const Navbar = () => {
  const menus = [
    { path: PATH.HOME, title: PATH_TITLE.HOME, Icon: RiHome5Line, ActiveIcon: RiHome5Fill },
    { path: PATH.SEARCH, title: PATH_TITLE.SEARCH, Icon: RiSearchLine, ActiveIcon: RiSearch2Fill },
    {
      path: PATH.SUBSCRIPTIONS,
      title: PATH_TITLE.SUBSCRIPTIONS,
      Icon: RiStackLine,
      ActiveIcon: RiStackFill,
    },
    { path: PATH.MYPAGE, title: PATH_TITLE.MYPAGE, Icon: RiUserLine, ActiveIcon: RiUserFill },
  ];
  return (
    <nav css={navStyle}>
      <ul css={ulStyle}>
        {menus.map(({ path, title, Icon, ActiveIcon }) => (
          <li key={path} css={liStyle}>
            <NavLink to={path} css={linkStyle}>
              {({ isActive }) => (
                <>
                  {isActive ? <ActiveIcon css={iconStyle} /> : <Icon css={iconStyle} />}
                  <span>{title}</span>
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
const navStyle = css`
  z-index: 100;
  position: fixed;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  max-width: 500px;
  width: 100vw;
  height: 80px;
  border-top: 1px solid ${theme.colors.tertiary};
  background-color: ${theme.colors.black};
`;
const ulStyle = css`
  display: flex;
`;
const liStyle = css`
  flex-grow: 1;
  flex-basis: 0;
`;
const linkStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 80px;
  gap: 4px;
  padding-top: 10px;
  &.active {
    /*color: ${theme.colors.primary};*/
  }
  span {
    width: 100%;
    text-align: center;
    font-size: ${theme.fontSizes.xsmall};
  }
`;
const iconStyle = css`
  font-size: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export default Navbar;
