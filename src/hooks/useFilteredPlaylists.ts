import { useState, useEffect } from 'react';

import { PLAYLIST } from '@/constants/playlist';
import { useAllPlaylist } from '@/hooks/queries/usePlaylistQueries';
import { PlaylistModel } from '@/types/playlist';

const ALL_PLAYLISTS = PLAYLIST.categories[0]; // '전체'

export const useFilteredPlaylists = () => {
  const [displayedPlaylists, setDisplayedPlaylists] = useState<PlaylistModel[]>();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const { data: playlists, isLoading, error } = useAllPlaylist();

  useEffect(() => {
    setDisplayedPlaylists(playlists);
    setSelectedCategory(ALL_PLAYLISTS);
  }, [playlists]);

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const category = e.currentTarget.textContent;

    category === ALL_PLAYLISTS
      ? setDisplayedPlaylists(playlists)
      : setDisplayedPlaylists(playlists?.filter((playlist) => playlist.category === category));

    if (category) {
      setSelectedCategory(category);
    }
  };

  const filterBySearchTerm = () => {
    const filteredPlaylistsBySearchTerm = playlists?.filter((playlist) =>
      playlist.title.includes(searchTerm)
    );

    filteredPlaylistsBySearchTerm
      ? setDisplayedPlaylists(filteredPlaylistsBySearchTerm)
      : setDisplayedPlaylists(playlists);

    setSearchTerm('');

    searchTerm ? setSelectedCategory('') : setSelectedCategory(ALL_PLAYLISTS);
  };

  return {
    searchTerm,
    setSearchTerm,
    filterBySearchTerm,
    selectedCategory,
    handleButtonClick,
    displayedPlaylists,
    isLoading,
    error,
  };
};
