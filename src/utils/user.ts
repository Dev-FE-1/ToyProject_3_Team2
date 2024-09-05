// 사용자 세션 가져오기
export const getUserIdBySession = () => {
  const userSessionObject = sessionStorage.getItem('userSession');

  if (!userSessionObject) {
    throw new Error('세션에 유저 ID를 찾을 수 없습니다.');
  }

  const userSession = userSessionObject ? JSON.parse(userSessionObject) : null;
  return userSession?.uid;
};
