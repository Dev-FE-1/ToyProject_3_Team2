import React from 'react';

import { GoStar, GoStarFill } from 'react-icons/go';

import IconButton from '@/components/common/buttons/IconButton';
import { useStarStore } from '@/store/starStore';

const StarToggleButton: React.FC = () => {
  const { isToggled, toggleStar } = useStarStore();

  return <IconButton Icon={isToggled ? GoStarFill : GoStar} onClick={toggleStar} />;
};

export default StarToggleButton;
