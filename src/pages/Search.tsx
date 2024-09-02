import { css } from '@emotion/react';

import CategoryButtons from '@/components/search/CategoryButtons';
import FilteredPlaylists from '@/components/search/FilteredPlaylists';
import { PLAYLIST } from '@/constants/playlist';
import { usePlaylistsWithCategory } from '@/hooks/usePlaylistByCategory';

const Search = () => {
  const { displayedPlaylists, selectedCategory, setSelectedCategory } = usePlaylistsWithCategory();

  return (
    <div>
      <div css={containerStyle}>
        <input type='text' css={inputStyle} placeholder={PLAYLIST.search.placeholder} />
      </div>
      <CategoryButtons
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
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
