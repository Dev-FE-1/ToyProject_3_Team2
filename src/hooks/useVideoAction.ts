import { useState } from 'react';

import { deleteVideoFromPlaylist } from '@/api/endpoints/playlist';
import { useToastStore } from '@/store/useToastStore';
import { PlaylistModel } from '@/types/playlist';

const useVideoActions = (
  playlist: PlaylistModel | null,
  setPlaylist: React.Dispatch<React.SetStateAction<PlaylistModel | null>>
) => {
  const [selectedVideo, setSelectedVideo] = useState<{ videoId: string; title: string } | null>(
    null
  );
  const showToast = useToastStore((state) => state.showToast);

  const handleVideoDelete = async () => {
    if (!playlist || !selectedVideo) {
      console.error('Playlist or selected video is null');
      return;
    }

    try {
      await deleteVideoFromPlaylist(playlist.playlistId, selectedVideo.videoId);

      setPlaylist((prevPlaylist) => {
        if (!prevPlaylist) return null;
        const updatedVideos = prevPlaylist.videos.filter(
          (video) => video.videoId !== selectedVideo.videoId
        );
        return {
          ...prevPlaylist,
          videos: updatedVideos,
          videoCount: updatedVideos.length,
        };
      });

      showToast('동영상이 성공적으로 삭제되었습니다.');
    } catch (error) {
      console.error('Error in handleVideoDelete:', error);
      showToast('동영상 삭제 중 오류가 발생했습니다.');
    } finally {
      setSelectedVideo(null);
    }
  };

  const onClickVideoKebob = (video: { videoId: string; title: string }) => {
    setSelectedVideo(video);
  };

  return {
    selectedVideo,
    handleVideoDelete,
    onClickVideoKebob,
  };
};

export default useVideoActions;
