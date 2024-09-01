import { Dispatch, SetStateAction } from 'react';

import { css } from '@emotion/react';

import { categories } from '@/constants/playlist';
import theme from '@/styles/theme';
interface CategoryButtonsProps {
  setSelectedCategory: Dispatch<SetStateAction<string>>;
}

const CategoryButtons: React.FC<CategoryButtonsProps> = ({ setSelectedCategory }) => {
  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const buttonText = e.currentTarget.textContent;
    if (!buttonText) return;

    setSelectedCategory(e.currentTarget.textContent as string);
  };

  return (
    <div css={buttonsStyle}>
      {categories &&
        categories.map((category) => (
          <button key={category} css={buttonStyle} onClick={handleButtonClick}>
            {category}
          </button>
        ))}
    </div>
  );
};

const buttonsStyle = css`
  margin: 1rem;
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  gap: 8px;

  // Webkit browsers (Chrome, Safari)
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none; // Firefox
  -ms-overflow-style: none; // IE and Edge

  // (추가) 터치 기기에서의 스크롤 동작 개선, 네이티브와 같이 동작
  -webkit-overflow-scrolling: touch;
`;

const buttonStyle = css`
  font-size: ${theme.fontSizes.normal};
  border-radius: 30px;
  padding: 4px 12px;
  background-color: ${theme.colors.tertiary};
  color: ${theme.colors.white};
  min-width: 56px;
  height: ${theme.heights.short};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:active {
    background-color: ${theme.colors.secondary};
    color: ${theme.colors.black};
  }
`;

export default CategoryButtons;
