import { css } from '@emotion/react';

import Spinner from '@/components/common/Spinner';
import CategoryButtons from '@/components/page/search/CategoryButtons';
import FilteredPlaylists from '@/components/page/search/FilteredPlaylists';
import Input from '@/components/page/search/Input';
import { useFilteredPlaylists } from '@/hooks/useFilteredPlaylists';
import theme from '@/styles/theme';

const Search = () => {
  const {
    searchTerm,
    setSearchTerm,
    filterBySearchTerm,
    selectedCategory,
    handleButtonClick,
    displayedPlaylists,
    isLoading,
  } = useFilteredPlaylists();

  return (
    <div css={containerStyle}>
      <header css={headerStyle}>
        <Input
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterBySearchTerm={filterBySearchTerm}
        />
        <CategoryButtons
          selectedCategory={selectedCategory}
          handleButtonClick={handleButtonClick}
        />
      </header>
      <main css={mainStyle}>
        {isLoading ? <Spinner /> : <FilteredPlaylists displayedPlaylists={displayedPlaylists} />}
      </main>
    </div>
  );
};

const containerStyle = css`
  padding-bottom: 80px;
`;

const headerStyle = css`
  position: fixed;
  max-width: 498px;
  width: 100%;
  z-index: 100;
  top: 0;
  background-color: ${theme.colors.black};
`;

const mainStyle = css`
  padding-top: 128px;
`;

export default Search;
