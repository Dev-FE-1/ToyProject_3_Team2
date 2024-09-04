import { useState, useEffect } from 'react';

const useUserSession = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const userSessionStr = sessionStorage.getItem('userSession');
    if (!userSessionStr) {
      setError('세션에 유저 ID를 찾을 수 없습니다.');
      return;
    }

    try {
      const userSession = JSON.parse(userSessionStr);
      setUserId(userSession.uid);
    } catch (err) {
      setError('유저 세션 파싱 중 오류가 발생했습니다.');
    }
  }, []);

  return { userId, error };
};

export default useUserSession;
