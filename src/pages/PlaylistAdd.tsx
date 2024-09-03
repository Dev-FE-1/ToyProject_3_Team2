import { useNavigate } from 'react-router-dom';

import { addPlaylist } from '@/api/endpoints/playlist';
import { getUserData } from '@/api/endpoints/user';
import Toast from '@/components/common/Toast';
import PlaylistForm from '@/components/playlistForm/PlaylistForm';
import { PATH } from '@/constants/path';
import Header from '@/layouts/layout/Header';
import { useToastStore } from '@/store/useToastStore';
import { PlaylistFormDataModel } from '@/types/playlist';

const PlaylistAdd = () => {
  const navigate = useNavigate();
  const showToast = useToastStore((state) => state.showToast);

  const handleSubmit = async (formData: PlaylistFormDataModel) => {
    console.log(formData);
    try {
      // 세션 스토리지에서 userSession 문자열을 가져와서 파싱
      const userSessionStr = sessionStorage.getItem('userSession');
      if (!userSessionStr) {
        throw new Error('세션에 유저 ID를 찾을 수 없습니다.');
      }
      const userSession = JSON.parse(userSessionStr);
      const userId = userSession.uid;

      if (!userId) {
        throw new Error('유효한 사용자 ID가 없습니다.');
      }

      // 사용자 데이터 가져오기
      const user = await getUserData(userId);
      if (!user) {
        throw new Error('사용자 데이터를 가져오는 데 실패했습니다.');
      }

      // 플레이리스트 추가 API 호출
      const playlistId = addPlaylist(formData, user.userId, user.userName);
      console.log('추가된 플레이리스트 ID:', playlistId);
      // 성공 시 마이페이지로 이동
      showToast('플레이리스트가 추가되었습니다.');
      navigate(`${PATH.MYPAGE}`);
    } catch (error) {
      console.error('플레이리스트 추가 중 오류 발생:', error);
      showToast('플레이리스트 추가에 실패했습니다.');
      return;
    }
  };
  return (
    <div>
      <Header />
      <PlaylistForm onSubmit={handleSubmit} />
      <Toast />
    </div>
  );
};

export default PlaylistAdd;
