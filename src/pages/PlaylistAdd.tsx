import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';

import Spinner from '@/components/common/Spinner';
import Toast from '@/components/common/Toast';
import PlaylistForm from '@/components/page/playlistAdd/PlaylistForm';
import { PATH } from '@/constants/path';
import { useAddPlaylist } from '@/hooks/mutations/usePlaylistMutations';
import { useUserData } from '@/hooks/queries/useUserQueries';
import Header from '@/layouts/layout/Header';
import { useToastStore } from '@/store/useToastStore';
import { PlaylistFormDataModel } from '@/types/playlist';
import { getUserIdBySession } from '@/utils/user';

const PlaylistAdd = () => {
  const navigate = useNavigate();
  const showToast = useToastStore((state) => state.showToast);
  const addPlaylistMutation = useAddPlaylist();

  const userId = getUserIdBySession();

  const { data: userData, isLoading, error } = useUserData(userId);

  if (isLoading) {
    return (
      <div css={spinnerStyle}>
        <Spinner />
      </div>
    );
  }
  if (error) {
    showToast('사용자 데이터를 불러오는 데 실패했습니다.');
    navigate(PATH.HOME);
    return null;
  }

  const handleSubmit = async (formData: PlaylistFormDataModel) => {
    if (!userData) {
      showToast('사용자 데이터를 찾을 수 없습니다.');
      return;
    }

    try {
      await addPlaylistMutation.mutateAsync({
        formData,
        userId: userData.userId,
        userName: userData.userName,
      });
      showToast('플레이리스트가 추가되었습니다.');
      navigate(`/mypage/${userData.userId}`);
    } catch (error) {
      console.error('플레이리스트 추가 중 오류 발생:', error);
      showToast('플레이리스트 추가에 실패했습니다.');
    }
  };
  return (
    <div>
      <Header />
      <PlaylistForm type='add' onSubmit={handleSubmit} />
      <Toast />
    </div>
  );
};
const spinnerStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
export default PlaylistAdd;
