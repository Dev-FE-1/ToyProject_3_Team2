import { useQuery } from '@tanstack/react-query';

import { getVideoData } from '@/server/youtubeApi';

export const useVideoData = (videoId: string) =>
  useQuery({
    // 쿼리를 식별하는 고유한 키
    // 배열 형태로, 'video'라는 문자열과 videoId 값으로 구성
    // React Query는 이 키를 사용하여 쿼리 결과를 캐시하고 관리
    queryKey: ['video', videoId],
    // 실제로 데이터를 가져오는 함수
    // getVideoData 함수를 호출하여 특정 videoId에 대한 데이터를 가져옴
    queryFn: () => getVideoData(videoId),
    // 쿼리의 실행 여부를 결정
    // videoId가 존재하고 유효한 값일 때만 쿼리가 실행
    // 불필요한 API 호출을 방지하는 데 도움
    enabled: !!videoId,
  });
