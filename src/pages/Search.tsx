import { useEffect, useState } from 'react';

import { css } from '@emotion/react';
import axios from 'axios';

// import { getAllPlaylists } from '@/api/playlist';
import CategoryButtons from '@/components/search/CategoryButtons';
import FilteredPlaylists from '@/components/search/FilteredPlaylists';
import { Playlist } from '@/types/playlist';

const Search = () => {
  const [playlists, setPlaylists] = useState<Playlist[] | null>([]);

  useEffect(() => {
    // const fetchPlaylists = async () => {
    //   const fetchedPlaylists = await getAllPlaylists();
    //   setPlaylists(fetchedPlaylists);
    // };

    // fetchPlaylists();

    const fetchPlaylists = async () => {
      const response = await axios.get('/src/mock/playlists.json');
      setPlaylists(response.data);
    };

    fetchPlaylists();
  }, []);

  return (
    <div>
      <div css={containerStyle}>
        <input type='text' css={inputStyle} placeholder='검색어를 입력해주세요' />
      </div>
      <CategoryButtons />
      <FilteredPlaylists playlists={playlists} />
    </div>
  );
};

const containerStyle = css`
  /* margin: 30px; */
`;
const inputStyle = css`
  /* margin: 30px; */
  width: 343px;
  height: 50px;
  padding: 4px 8px;
  align-items: center;
`;

export default Search;
