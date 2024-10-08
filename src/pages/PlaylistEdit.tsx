import React from 'react';

import { useParams, useNavigate } from 'react-router-dom';

import Toast from '@/components/common/Toast';
import PlaylistForm from '@/components/page/playlistAdd/PlaylistForm';
import { CATEGORY_OPTIONS } from '@/constants/playlist';
import usePlaylistData from '@/hooks/usePlaylistData';
import Header from '@/layouts/layout/Header';
import NotFoundPage from '@/pages/NotFound';
import { useToastStore } from '@/store/useToastStore';
import { PlaylistFormDataModel } from '@/types/playlist';

const PlaylistEdit: React.FC = () => {
  const navigate = useNavigate();
  const showToast = useToastStore((state) => state.showToast);
  const { playlistId } = useParams<{ playlistId: string }>();

  const { playlist, isLoading, error, handleUpdatePlaylist } = usePlaylistData(playlistId);

  const getCategoryValue = (label: string): string => {
    const category = CATEGORY_OPTIONS.find((option) => option.value === label);
    return category ? category.value : '';
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!playlist) {
    return <NotFoundPage />;
  }

  const initialData = {
    title: playlist.title,
    description: playlist.description,
    category: getCategoryValue(playlist.category),
    thumbnailUrl: playlist.thumbnailUrl,
    isPublic: playlist.isPublic,
  };

  const handleSubmit = async (formData: PlaylistFormDataModel) => {
    try {
      if (!playlistId) {
        throw new Error('Playlist ID is missing');
      }

      await handleUpdatePlaylist(playlistId, formData);

      showToast('플레이리스트가 성공적으로 수정되었습니다.');
      navigate(-1); // 이전 페이지로 이동
    } catch (error) {
      console.error('플레이리스트 수정 중 오류 발생:', error);
      showToast('플레이리스트 수정에 실패했습니다.');
    }
  };

  return (
    <div>
      <Header />
      <PlaylistForm initialData={initialData} type='edit' onSubmit={handleSubmit} />
      <Toast />
    </div>
  );
};

export default PlaylistEdit;
