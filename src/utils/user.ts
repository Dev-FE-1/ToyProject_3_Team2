// 사용자 세션 가져오기
export const getUserIdBySession = () => {
  const value = sessionStorage.getItem('userSession');
  const userSession = value ? JSON.parse(value) : null;
  return userSession?.uid;
};
