// usePlaylistsWithCategory.ts
import { useState, useEffect } from 'react';

import axios from 'axios';

import { getPlaylistsByCategory } from '@/api/playlist';
import { playlistCategories } from '@/constants/playlist';
import { Playlist } from '@/types/playlist';

export const usePlaylistsWithCategory = () => {
  const [allPlaylists, setAllPlaylists] = useState<Playlist[]>([]);
  const [displayedPlaylists, setDisplayedPlaylists] = useState<Playlist[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  useEffect(() => {
    // 파이어스토어 데이터 요청 (연습 시, 주석처리)
    // const fetchPlaylists = async () => {
    //   const fetchedPlaylists = await getAllPlaylists();
    //   setPlaylists(fetchedPlaylists);
    // };

    // 목데이터 활용
    const fetchPlaylists = async () => {
      const response = await axios.get('/src/mock/playlists.json');
      setAllPlaylists(response.data);
      setDisplayedPlaylists(response.data);
    };

    fetchPlaylists();
  }, []);

  useEffect(() => {
    const fetchPlaylistsByCategory = async () => {
      if (selectedCategory === playlistCategories[0]) {
        setDisplayedPlaylists(allPlaylists);
      } else {
        const fetchedPlaylists = await getPlaylistsByCategory(selectedCategory);
        setDisplayedPlaylists(fetchedPlaylists);
      }
    };

    if (selectedCategory) {
      fetchPlaylistsByCategory();
    }
  }, [selectedCategory, allPlaylists]);

  return { displayedPlaylists, setSelectedCategory };
};
