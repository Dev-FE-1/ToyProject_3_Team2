import { css } from '@emotion/react';

import { PLAYLIST } from '@/constants/playlist';
import { useDragToScroll } from '@/hooks/useDragToScroll';
import theme from '@/styles/theme';

interface CategoryButtonsProps {
  selectedCategory: string;
  handleButtonClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const CategoryButtons: React.FC<CategoryButtonsProps> = ({
  selectedCategory,
  handleButtonClick,
}) => {
  const { dragDistance, handlers } = useDragToScroll();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // 드래그가 아니었을 때만 클릭 이벤트 발생
    if (dragDistance < 5) {
      handleButtonClick(e);
    }
  };

  return (
    <div css={buttonsWrapperStyle}>
      <div css={scrollAreaStyle} {...handlers}>
        {PLAYLIST.categories &&
          PLAYLIST.categories.map((category) => (
            <button
              key={category}
              css={[buttonStyle, category === selectedCategory && activeButtonStyle]}
              onClick={handleClick}
            >
              {category}
            </button>
          ))}
      </div>
    </div>
  );
};

const buttonsWrapperStyle = css`
  margin: 1rem;
  display: flex;
  overflow-x: auto;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;

  // Webkit browsers (Chrome, Safari)
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none; // Firefox
  -ms-overflow-style: none; // IE and Edge
`;

const scrollAreaStyle = css`
  display: flex;
  gap: 8px;
  cursor: grab;
  width: 100%;
  overflow-x: auto;
  white-space: nowrap;
  user-select: none; /* 텍스트 드래그 방지 */
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
  transition:
    background-color 0.3s,
    color 0.3s; // 부드러운 전환 효과 추가

  &:active {
    background-color: ${theme.colors.secondary};
    color: ${theme.colors.black};
  }
`;

const activeButtonStyle = css`
  background-color: ${theme.colors.secondary};
  color: ${theme.colors.black};
`;

export default CategoryButtons;
