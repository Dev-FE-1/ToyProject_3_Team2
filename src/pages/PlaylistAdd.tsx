import { useNavigate } from 'react-router-dom';

import { addPlaylist } from '@/api/endpoints/playlist';
import Toast from '@/components/common/Toast';
import PlaylistForm from '@/components/playlistForm/PlaylistForm';
import { PATH } from '@/constants/path';
import Header from '@/layouts/layout/Header';
import { useToastStore } from '@/store/useToastStore';
import { PlaylistFormDataModel } from '@/types/playlist';

const PlaylistAdd = () => {
  const navigate = useNavigate();
  const showToast = useToastStore((state) => state.showToast);

  const handleSubmit = (data: PlaylistFormDataModel) => {
    console.log(data);
    try {
      // 플레이리스트 추가 API 호출
      const playlistId = addPlaylist(data);
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
