import { useState, useEffect } from 'react';

import { PLAYLIST } from '@/constants/playlist';
import { useAllPlaylist } from '@/hooks/queries/usePlaylistQueries';
import { PlaylistModel } from '@/types/playlist';

const ALL_PLAYLISTS = PLAYLIST.categories[0]; // '전체'

// 검색어, 카테고리로 플레이리스트 필터링
export const useFilteredPlaylists = () => {
  const [displayedPlaylists, setDisplayedPlaylists] = useState<PlaylistModel[]>();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const { data: playlists, isLoading, error } = useAllPlaylist();

  useEffect(() => {
    setDisplayedPlaylists(playlists);
    setSelectedCategory(ALL_PLAYLISTS);
  }, [playlists]);
  // 카테고리 필터링
  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const category = e.currentTarget.textContent;

    category === ALL_PLAYLISTS
      ? setDisplayedPlaylists(playlists)
      : setDisplayedPlaylists(playlists?.filter((playlist) => playlist.category === category));

    if (category) {
      setSelectedCategory(category);
    }
  };

  // 검색어 필터링
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
