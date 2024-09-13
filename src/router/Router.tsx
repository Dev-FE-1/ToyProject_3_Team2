import { useState, useEffect, useCallback } from 'react';

import { onAuthStateChanged, signOut } from 'firebase/auth';
import { createBrowserRouter, Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';

import { auth } from '@/api/index';
import Spinner from '@/components/common/Spinner';
import DetailList from '@/components/page/home/DetailList';
import { PATH } from '@/constants/path';
import RootLayout from '@/layouts/RootLayout';
import CommentAdd from '@/pages/CommentAdd';
import CommentList from '@/pages/CommentList';
import HomePage from '@/pages/Home';
import MyPage from '@/pages/Mypage';
import NotFoundPage from '@/pages/NotFound';
import Onboarding from '@/pages/Onboarding';
import PlaylistAdd from '@/pages/PlaylistAdd';
import PlaylistEdit from '@/pages/PlaylistEdit';
import PlaylistPage from '@/pages/PlaylistPage';
import Search from '@/pages/Search';
import Settings from '@/pages/Settings';
import SignIn from '@/pages/Signin';
import Subscriptions from '@/pages/Subscriptions';

const AuthProtectedRoute = () => {
  // 현재 경로와 URL쿼리 문자열 가져옴
  const location = useLocation();
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleAuthLogout = useCallback(async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      sessionStorage.removeItem('userSession');
      setIsLoggedIn(false);
      navigate(PATH.SIGNIN);
    }
  }, [navigate]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      const userSession = sessionStorage.getItem('userSession');
      if (user && !userSession) {
        handleAuthLogout();
      } else {
        setIsLoggedIn(!!user);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [handleAuthLogout, location]);

  if (isLoading) {
    return <Spinner />;
  }

  if (!isLoggedIn) {
    // 로그인하지 않았다면 로그인 페이지로 이동
    return <Navigate to={PATH.SIGNIN} replace state={location.pathname + location.search} />;
  }

  return <Outlet />;
};

const OnboardingRoute = () => {
  const [isOnboarding, setIsOnboarding] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onboardingStatus = sessionStorage.getItem('onboarding') === 'true';
    setIsOnboarding(onboardingStatus);

    // 온보딩이 완료되지 않았고, 현재 페이지가 온보딩 페이지가 아니라면 온보딩 페이지로 이동
    if (!onboardingStatus && location.pathname !== PATH.ONBOARDING) {
      navigate(PATH.ONBOARDING, { replace: true });
    }
  }, [location, navigate]);

  // 온보딩이 완료되었거나 현재 온보딩 페이지라면 계속 진행
  if (isOnboarding || location.pathname === PATH.ONBOARDING) {
    return <Outlet />;
  }
};

export const router = createBrowserRouter([
  {
    path: PATH.HOME,
    element: <RootLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        element: <OnboardingRoute />,
        children: [
          // 공개 페이지
          { path: PATH.ONBOARDING, element: <Onboarding /> },
          { path: PATH.SIGNIN, element: <SignIn /> },
          {
            //  <AuthProtectedRoute /> : 보호된 페이지
            element: <AuthProtectedRoute />,
            children: [
              // 해당라우트가 부모라우트의 자식이야(true)-> Home으로 가
              // 부모라우트와 정확히 일치할 때 사용
              { index: true, element: <HomePage /> },
              { path: PATH.SEARCH, children: [{ index: true, element: <Search /> }] },
              {
                path: PATH.SUBSCRIPTIONS,
                children: [{ index: true, element: <Subscriptions /> }],
              },
              {
                path: PATH.MYPAGE,
                children: [
                  { index: true, element: <MyPage /> },
                  { path: PATH.SETTINGS, element: <Settings /> },
                  { path: PATH.MYPAGE_ADD_PLAYLIST, element: <PlaylistAdd /> },
                ],
              },
              {
                path: PATH.PLAYLIST,
                children: [
                  { index: true, element: <PlaylistPage /> },
                  { path: PATH.PLAYLIST_EDIT, element: <PlaylistEdit /> },
                ],
              },
              { path: PATH.DETAIL_LIST, element: <DetailList /> },
              {
                path: PATH.COMMENT,
                children: [
                  { index: true, element: <CommentList /> },
                  { path: PATH.COMMENT_ADD, element: <CommentAdd /> },
                ],
              },
              { path: '*', element: <NotFoundPage /> },
            ],
          },
          { path: '*', element: <Navigate to={PATH.SIGNIN} replace /> },
        ],
      },
    ],
  },
]);
