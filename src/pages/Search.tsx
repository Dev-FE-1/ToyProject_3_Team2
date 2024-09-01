import { useEffect, useState } from 'react';

import { css } from '@emotion/react';
import axios from 'axios';

// import { getAllPlaylists } from '@/api/playlist';
import { getPlaylistsByCategory } from '@/api/playlist';
import CategoryButtons from '@/components/search/CategoryButtons';
import FilteredPlaylists from '@/components/search/FilteredPlaylists';
import { Playlist } from '@/types/playlist';

const Search = () => {
  const [allPlaylists, setAllPlaylists] = useState<Playlist[] | null>([]);
  const [filteredPlaylists, setFilteredPlaylists] = useState<Playlist[] | null>(null);
  const [displayedPlaylists, setDisplayedPlaylists] = useState<Playlist[] | null>(null);
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
    const fetchPlaylistsByCategory = async (selectedCategory: string) => {
      const fetchedPlaylistsByCategory = await getPlaylistsByCategory(selectedCategory);
      setFilteredPlaylists(fetchedPlaylistsByCategory);
      setDisplayedPlaylists(fetchedPlaylistsByCategory);
    };

    if (!selectedCategory) return;

    if (selectedCategory === '전체') setDisplayedPlaylists(allPlaylists);
    else fetchPlaylistsByCategory(selectedCategory);
  }, [selectedCategory, allPlaylists]);

  return (
    <div>
      <div css={containerStyle}>
        <input type='text' css={inputStyle} placeholder='검색어를 입력해주세요' />
      </div>
      <CategoryButtons setSelectedCategory={setSelectedCategory} />
      <FilteredPlaylists displayedPlaylists={displayedPlaylists} />
    </div>
  );
};

const containerStyle = css``;

const inputStyle = css`
  width: 343px;
  height: 50px;
  padding: 4px 8px;
  align-items: center;
`;

export default Search;
