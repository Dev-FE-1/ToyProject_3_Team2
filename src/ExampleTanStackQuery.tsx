// TanStack-Query 이해를 위한 Test 파일입니다.

import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

const ExampleTanStackQuery = () => (
  // 사용할 queryClient 인스턴스를 연결
  <QueryClientProvider client={queryClient}>
    <ReactQueryDevtools />
    <Example />
  </QueryClientProvider>
);

export default ExampleTanStackQuery;

// 아래는 기본적인 TanStack-Query 사용 형식입니다.
const Example = () => {
  const { isPending, error, data, isFetching } = useQuery({
    // 데이터 요청에 필요한 Key
    queryKey: ['repoData'],
    // 데이터 요청 함수
    queryFn: async () => {
      const response = await fetch('https://api.github.com/repos/TanStack/query');
      return await response.json();
    },
  });

  // 데이터에 대한 응답을 받기 전
  if (isPending) return 'Loading...';

  // 데이터에 대한 응답이 오류일 경우
  if (error) return 'An error has occurred: ' + error.message;

  return (
    <div>
      <h1>{data.full_name}</h1>
      <p>{data.description}</p>
      <strong>👀 {data.subscribers_count}</strong> <strong>✨ {data.stargazers_count}</strong>{' '}
      <strong>🍴 {data.forks_count}</strong>
      <div>{isFetching ? 'Updating...' : ''}</div>
    </div>
  );
};
