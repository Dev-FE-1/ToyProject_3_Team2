import {
  useDeleteVideo,
  useDeletePlaylist,
  useUpdatePlaylist,
  useAddVideoToPlaylist,
  useUpdatePlaylistVideoOrder,
} from '@/hooks/mutations/usePlaylistMutations';
import { usePlaylistQuery } from '@/hooks/queries/usePlaylistQueries';
import { PlaylistFormDataModel, Video } from '@/types/playlist';

const usePlaylistData = (playlistId: string | undefined) => {
  const playlistQuery = usePlaylistQuery(playlistId);
  const deleteVideoMutation = useDeleteVideo(playlistId);
  const deletePlaylistMutation = useDeletePlaylist();
  const updatePlaylistMutation = useUpdatePlaylist(playlistId);
  const addVideoMutation = useAddVideoToPlaylist(playlistId);
  const updateVideoOrderMutation = useUpdatePlaylistVideoOrder(playlistId);

  const handleDeleteVideo = async (playlistId: string, videoId: string) => {
    await deleteVideoMutation.mutateAsync({ playlistId, videoId });
  };

  const handleDeletePlaylist = async (playlistId: string) => {
    await deletePlaylistMutation.mutateAsync(playlistId);
  };

  const handleUpdatePlaylist = async (playlistId: string, formData: PlaylistFormDataModel) => {
    await updatePlaylistMutation.mutateAsync({ playlistId, formData });
  };

  const handleAddVideoToPlaylist = async (newVideo: Video) => {
    await addVideoMutation.mutateAsync(newVideo);
  };

  const handleUpdatePlaylistVideoOrder = async (newVideoOrder: Video[]) => {
    await updateVideoOrderMutation.mutateAsync(newVideoOrder);
  };

  return {
    playlist: playlistQuery.data?.playlist,
    user: playlistQuery.data?.user,
    isLoading: playlistQuery.isLoading,
    error: playlistQuery.error,
    handleDeleteVideo,
    handleDeletePlaylist,
    handleUpdatePlaylist,
    handleAddVideoToPlaylist,
    handleUpdatePlaylistVideoOrder,
  };
};

export default usePlaylistData;
