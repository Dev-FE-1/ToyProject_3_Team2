import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
  useLocation,
} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PATH } from '@/constants/path';
import RootLayout from '@/layouts/RootLayout';
import Home from '@/pages/Home';
import Search from '@/pages/Search';
import Subscriptions from '@/pages/Subscriptions';

const queryClient = new QueryClient();

const AuthProtectedRoute = () => {
  // 현재 경로와 URL쿼리 문자열 가져옴
  const { pathname, search } = useLocation();

  const authOK = true; // 로그인 여부 확인(임시)

  // 로그인 통과? 그럼 Outlet을 렌더링
  // 로그인 실패? 로그인 페이지로 Redirect
  // <Outlet/>: 자식 라우트를 렌더링
  // replace: 현재 페이지를 브라우저 히스토리에서 교체
  // state={..} :현재 URL 정보를 로그인 페이지로 전달
  return authOK ? <Outlet /> : <Navigate to={`${PATH.SIGNIN}`} replace state={pathname + search} />;
};
const router = createBrowserRouter([
  {
    path: PATH.HOME,
    element: <AuthProtectedRoute />,
    children: [
      { path: PATH.SIGNIN, element: <div>SignIn</div> },
      {
        //  <RootLayout /> : 네비게이션(탭바)+콘텐츠
        element: <RootLayout />,
        children: [
          // 해당라우트가 부모라우트의 자식이야(true)-> Home으로 가
          // 부모라우트와 정확히 일치할 때 사용
          { index: true, element: <Home /> },
          { path: PATH.SEARCH, children: [{ index: true, element: <Search /> }] },
          {
            path: PATH.SUBSCRIPTIONS,
            children: [{ index: true, element: <Subscriptions /> }],
          },
          { path: PATH.MYPAGE, children: [{ index: true, element: <div>MyPage</div> }] },
          { path: PATH.SIGNIN, children: [{ index: true, element: <div>SignIn</div> }] },
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
