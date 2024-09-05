import { css } from '@emotion/react';
import { Outlet, useLocation } from 'react-router-dom';

import VideoModal from '@/components/videoModal/VideoModal';
import { PATH } from '@/constants/path';
import Navbar from '@/layouts/layout/Navbar';
import { useMiniPlayerStore } from '@/store/useMiniPlayerStore';
import theme from '@/styles/theme';

const RootLayout = () => {
  const location = useLocation();
  const isOpen = useMiniPlayerStore((state) => state.isOpen);
  const videoId = useMiniPlayerStore((state) => state.videoId);
  const playlist = useMiniPlayerStore((state) => state.playlist);
  const userId = useMiniPlayerStore((state) => state.userId);
  const { closeMiniPlayer } = useMiniPlayerStore();

  const noShowNavbar = () => {
    const noNavbarPaths = [PATH.SIGNIN, PATH.ONBOARDING, PATH.SETTINGS, PATH.PLAYLIST];

    return !noNavbarPaths.some((path) => location.pathname.startsWith(path));
  };

  return (
    <div css={wrapperStyle}>
      {noShowNavbar() && <Navbar />}
      <main>
        <Outlet />
        {isOpen && videoId && playlist && (
          <VideoModal
            isOpen={isOpen}
            videoId={videoId}
            playlist={playlist}
            userId={userId || ''}
            onClose={closeMiniPlayer}
          />
        )}
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
