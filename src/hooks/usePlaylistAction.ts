import { useNavigate } from 'react-router-dom';

import { deletePlaylist } from '@/api/endpoints/playlist';
import { useToastStore } from '@/store/useToastStore';
import { useToggleStore } from '@/store/useToggleStore';

const usePlaylistActions = () => {
  const navigate = useNavigate();
  const showToast = useToastStore((state) => state.showToast);
  const toggle = useToggleStore((state) => state.toggle);

  const handleIconButtonClick = () => {
    showToast('내 재생목록에 저장되었습니다.');
    toggle();
  };

  const handlePlaylistEdit = () => {
    console.log('플레이리스트 수정페이지로 이동');
  };

  const handleAddPlaylist = () => {
    console.log('플레이리스트 링크 추가하는 모달 팝업');
  };

  const handlePlaylistDelete = async (playlistId: string) => {
    try {
      await deletePlaylist(playlistId);
      showToast('플레이리스트가 성공적으로 삭제되었습니다.');
      navigate(-1);
    } catch (error) {
      console.error('Error deleting playlist:', error);
      showToast('플레이리스트 삭제 중 오류가 발생했습니다.');
    }
  };

  return {
    handleIconButtonClick,
    handlePlaylistEdit,
    handleAddPlaylist,
    handlePlaylistDelete,
  };
};

export default usePlaylistActions;
