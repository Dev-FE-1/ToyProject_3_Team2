import { useState, useEffect } from 'react';

import { getPlaylistWithUser } from '@/api/endpoints/playlist';
import { PlaylistModel } from '@/types/playlist';
import { UserModel } from '@/types/user';

const usePlaylistData = (playlistId: string | undefined) => {
  const [playlist, setPlaylist] = useState<PlaylistModel | null>(null);
  const [user, setUser] = useState<UserModel | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPlaylistWithUser() {
      if (!playlistId) {
        setError('Playlist ID is missing');
        setIsLoading(false);
        return;
      }

      try {
        const result = await getPlaylistWithUser(playlistId);

        if (result) {
          setPlaylist(result.playlist);
          setUser(result.user);
        } else {
          setError('Playlist not found');
        }
      } catch (err) {
        console.error('Error fetching playlist:', err);
        setError('Failed to fetch playlist');
      } finally {
        setIsLoading(false);
      }
    }

    fetchPlaylistWithUser();
  }, [playlistId]);

  return { playlist, user, isLoading, error };
};

export default usePlaylistData;
