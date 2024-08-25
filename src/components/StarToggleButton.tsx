import React from 'react';

import { GoStar, GoStarFill } from 'react-icons/go';

import IconButton from '@/components/common/buttons/IconButton';
import { useStarStore } from '@/store/starStore';

const StarToggleButton: React.FC = () => {
  const { isStarred, toggleStar } = useStarStore();

  return <IconButton Icon={isStarred ? GoStarFill : GoStar} onClick={toggleStar} />;
};

export default StarToggleButton;
