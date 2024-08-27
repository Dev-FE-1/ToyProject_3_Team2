import { useState } from 'react';

const useLikeCount = (initialLikeCount: number) => {
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [isLiked, setIsLiked] = useState(false);

  const handleLikeClick = () => {
    if (isLiked) setLikeCount((prev: number) => prev - 1);
    else setLikeCount((prev: number) => prev + 1);

    setIsLiked(!isLiked);
  };

  return {
    likeCount,
    handleLikeClick,
    isLiked,
  };
};

export default useLikeCount;
