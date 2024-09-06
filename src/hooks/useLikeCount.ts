import { useState } from 'react';

export const useLikeCount = (initialLikeCount: number) => {
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [isLiked, setIsLiked] = useState(false);

  const handleLikeClick = () => {
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
    setIsLiked((prev) => !prev);
  };

  return {
    likeCount,
    handleLikeClick,
    isLiked,
  };
};
