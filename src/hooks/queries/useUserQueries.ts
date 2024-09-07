import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { getUserData } from '@/api/endpoints/user';
import { QUERY_KEYS } from '@/constants/queryKey';
import { UserModel } from '@/types/user';
import { getUserIdBySession } from '@/utils/user';
// 기본 옵션
const defaultOptions = {
  staleTime: 5 * 60 * 1000, // 기본 5분
};

// 세션의 userId를 통해 해당 사용자 정보 가져오기
export const useUserData = (): UseQueryResult<UserModel, Error> => {
  // 세션에서 userId 가져오기
  const uid = getUserIdBySession();
  return useQuery({
    queryKey: [QUERY_KEYS.USER_USERID_KEY, uid],
    queryFn: () => getUserData(uid),
    ...defaultOptions,
    enabled: !!uid, // userId가 존재할 때만 쿼리 실행
  });
};
