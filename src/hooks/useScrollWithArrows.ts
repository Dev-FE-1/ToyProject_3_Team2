import { useState, useEffect, RefObject } from 'react';

export const useScrollWithArrows = (scrollRef: RefObject<HTMLDivElement>) => {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [dragDistance, setDragDistance] = useState(0);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setDragDistance(0);
    setStartX(e.pageX - e.currentTarget.offsetLeft);
    setScrollLeft(e.currentTarget.scrollLeft);
    document.body.style.userSelect = 'none';
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const x = e.pageX - e.currentTarget.offsetLeft;
    const walk = (x - startX) * 1;
    setDragDistance(Math.abs(walk));
    e.currentTarget.scrollLeft = scrollLeft - walk;
  };

  const onMouseUpOrLeave = () => {
    setIsDragging(false);
    document.body.style.userSelect = '';
  };

  const scrollLeftFunc = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -498, behavior: 'smooth' });
    }
  };

  const scrollRightFunc = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 498, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const scrollContainer = scrollRef.current; // scrollRef.current 값을 로컬 변수에 저장

    const handleScroll = () => {
      if (!scrollContainer) return;
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainer;

      // 왼쪽 끝에 도달했을 때 왼쪽 화살표 숨기기
      setShowLeftArrow(scrollLeft > 0);

      // 오른쪽 끝에 도달했을 때 오른쪽 화살표 숨기기
      setShowRightArrow(scrollLeft + clientWidth < scrollWidth);
    };

    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
    }

    // cleanup 함수에서 로컬 변수를 사용
    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, [scrollRef]); // scrollRef는 여전히 의존성 배열에 추가

  return {
    isDragging,
    dragDistance,
    showLeftArrow,
    showRightArrow,
    handlers: {
      onMouseDown,
      onMouseMove,
      onMouseUp: onMouseUpOrLeave,
      onMouseLeave: onMouseUpOrLeave,
    },
    scrollLeftFunc,
    scrollRightFunc,
  };
};
