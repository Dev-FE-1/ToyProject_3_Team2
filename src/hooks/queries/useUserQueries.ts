import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { getUserData } from '@/api/endpoints/user';
import { QUERY_KEYS } from '@/constants/queryKey';
import { UserModel } from '@/types/user';

// 기본 옵션
const defaultOptions = {
  staleTime: 5 * 60 * 1000, // 기본 5분
};

// userId를 파라미터로 받도록 변경
export const useUserData = (uid: string): UseQueryResult<UserModel, Error> =>
  useQuery({
    queryKey: [QUERY_KEYS.USER_USERID_KEY, uid],
    queryFn: () => getUserData(uid),
    ...defaultOptions,
    enabled: !!uid, // userId가 존재할 때만 쿼리 실행
  });
