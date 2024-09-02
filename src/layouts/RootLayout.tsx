import { css } from '@emotion/react';
import { Outlet, useLocation } from 'react-router-dom';

import { PATH } from '@/constants/path';
import Navbar from '@/layouts/layout/Navbar';
import theme from '@/styles/theme';

const RootLayout = () => {
  const location = useLocation();

  const shouldShowNavbar = () => {
    const noNavbarPaths = [PATH.SIGNIN, PATH.ONBOARDING, `${PATH.MYPAGE}${PATH.SETTINGS}`];

    return !noNavbarPaths.some(
      (path) =>
        location.pathname === path || (path.endsWith('/') && location.pathname.startsWith(path))
    );
  };

  return (
    <div css={wrapperStyle}>
      {shouldShowNavbar() && <Navbar />}
      <main>
        <Outlet />
      </main>
    </div>
  );
};

const wrapperStyle = css`
  max-width: 498px;
  min-height: 100vh;
  margin: 0 auto;
  background-color: ${theme.colors.black};
`;
export default RootLayout;
