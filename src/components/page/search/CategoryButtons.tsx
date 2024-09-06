import { useRef, useState } from 'react';

import { css } from '@emotion/react';

import { PLAYLIST } from '@/constants/playlist';
import theme from '@/styles/theme';

interface CategoryButtonsProps {
  selectedCategory: string;
  handleButtonClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const CategoryButtons: React.FC<CategoryButtonsProps> = ({
  selectedCategory,
  handleButtonClick,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [dragDistance, setDragDistance] = useState(0);

  const handleMouse = {
    up: () => {
      setIsDragging(false);
      document.body.style.userSelect = '';
    },

    down: (e: React.MouseEvent) => {
      setIsDragging(true);
      setDragDistance(0);
      setStartX(e.pageX - (scrollRef.current?.offsetLeft || 0));
      setScrollLeft(scrollRef.current?.scrollLeft || 0);
      document.body.style.userSelect = 'none'; // 텍스트 선택 비활성화
    },

    move: (e: React.MouseEvent) => {
      if (!isDragging) return;
      const x = e.pageX - (scrollRef.current?.offsetLeft || 0);
      const walk = (x - startX) * 1; // 스크롤 속도 조절
      setDragDistance(Math.abs(walk)); // 드래그 거리 업데이트

      if (scrollRef.current) {
        scrollRef.current.scrollLeft = scrollLeft - walk; // 스크롤 처리
      }
    },

    leave: () => {
      setIsDragging(false);
      document.body.style.userSelect = '';
    },
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // 드래그가 아니었을 때만 클릭 이벤트 발생
    if (dragDistance < 5) {
      handleButtonClick(e);
    }
  };

  return (
    <div css={buttonsWrapperStyle}>
      <div
        css={scrollAreaStyle}
        ref={scrollRef}
        onMouseDown={handleMouse.down}
        onMouseMove={handleMouse.move}
        onMouseUp={handleMouse.up}
        onMouseLeave={handleMouse.leave}
      >
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
