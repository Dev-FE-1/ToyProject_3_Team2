import { useState, useEffect, RefObject, useCallback } from 'react';

export const useScrollWithArrows = (scrollRef: RefObject<HTMLDivElement>) => {
  // 드래그 스크롤 상태 및 핸들러
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [dragDistance, setDragDistance] = useState(0);

  const dragHandlers = {
    onMouseDown: (e: React.MouseEvent<HTMLDivElement>) => {
      setIsDragging(true);
      setDragDistance(0);
      setStartX(e.pageX - e.currentTarget.offsetLeft);
      setScrollLeft(e.currentTarget.scrollLeft);
      document.body.style.userSelect = 'none';
    },
    onMouseMove: (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isDragging) return;
      const x = e.pageX - e.currentTarget.offsetLeft;
      const walk = (x - startX) * 1;
      setDragDistance(Math.abs(walk));
      e.currentTarget.scrollLeft = scrollLeft - walk;
    },
    // 각각 분리
    onMouseUp: () => {
      setIsDragging(false);
      document.body.style.userSelect = '';
    },
    onMouseLeave: () => {
      setIsDragging(false);
      document.body.style.userSelect = '';
    },
  };

  // 화살표 가시성 상태 및 핸들러
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const updateArrowVisibility = useCallback(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainer;
    setShowLeftArrow(scrollLeft > 0);
    setShowRightArrow(scrollLeft + clientWidth < scrollWidth);
  }, [scrollRef]);

  // 스크롤 함수
  const scrollFunctions = {
    scrollLeft: () => {
      scrollRef.current?.scrollBy({ left: -498, behavior: 'smooth' });
    },
    scrollRight: () => {
      scrollRef.current?.scrollBy({ left: 498, behavior: 'smooth' });
    },
  };

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', updateArrowVisibility);
      setTimeout(updateArrowVisibility, 200); // 200ms 후에 가시성 업데이트
    }
    return () => {
      scrollContainer?.removeEventListener('scroll', updateArrowVisibility);
    };
  }, [scrollRef, updateArrowVisibility]);

  return {
    isDragging,
    dragDistance,
    showLeftArrow,
    showRightArrow,
    handlers: {
      ...dragHandlers,
      onMouseUp: dragHandlers.onMouseUp,
      onMouseLeave: dragHandlers.onMouseLeave,
    },
    scrollLeftFunc: scrollFunctions.scrollLeft,
    scrollRightFunc: scrollFunctions.scrollRight,
  };
};
