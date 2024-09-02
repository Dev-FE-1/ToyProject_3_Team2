import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
  useLocation,
} from 'react-router-dom';

import { PATH } from '@/constants/path';
import RootLayout from '@/layouts/RootLayout';
import Home from '@/pages/Home';
import MyPage from '@/pages/Mypage';
import Onboarding from '@/pages/Onboarding';
import PlayListPage from '@/pages/PlayList';
import PlaylistAdd from '@/pages/PlaylistAdd';
import Search from '@/pages/Search';
import Settings from '@/pages/Settings';
import SignIn from '@/pages/Signin';
import Subscriptions from '@/pages/Subscriptions';
import { useAuthStore } from '@/store/authStore';

const queryClient = new QueryClient();

const AuthProtectedRoute = () => {
  // 현재 경로와 URL쿼리 문자열 가져옴
  const { pathname, search } = useLocation();

  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  // // 로그인 통과? 그럼 Outlet을 렌더링
  // // 로그인 실패? 로그인 페이지로 Redirect
  // // <Outlet/>: 자식 라우트를 렌더링
  // // replace: 현재 페이지를 브라우저 히스토리에서 교체
  // // state={..} :현재 URL 정보를 로그인 페이지로 전달
  return isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate to={`${PATH.ONBOARDING}`} replace state={pathname + search} />
  );
};
const router = createBrowserRouter([
  {
    path: '/',
    //  <RootLayout /> : 네비게이션(탭바)+콘텐츠
    element: <RootLayout />,
    children: [
      // 공개 페이지
      { path: PATH.SIGNIN, element: <SignIn /> },
      { path: PATH.ONBOARDING, element: <Onboarding /> },
      {
        //  <AuthProtectedRoute /> : 보호된 페이지
        element: <AuthProtectedRoute />,
        children: [
          // 해당라우트가 부모라우트의 자식이야(true)-> Home으로 가
          // 부모라우트와 정확히 일치할 때 사용
          { index: true, element: <Home /> },
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
        ],
      },
    ],
  },
]);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>
);

export default App;
