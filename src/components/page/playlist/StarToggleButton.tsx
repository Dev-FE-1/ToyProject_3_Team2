import { GoStar, GoStarFill } from 'react-icons/go';

import IconButton from '@/components/common/buttons/IconButton';
import { useToggleStore } from '@/store/useToggleStore';

const StarToggleButton = () => {
  const isToggled = useToggleStore((state) => state.isToggled);
  const toggle = useToggleStore((state) => state.toggle);

  const handleToggle = () => {
    toggle();
  };

  return <IconButton Icon={isToggled ? GoStarFill : GoStar} onClick={handleToggle} />;
};

export default StarToggleButton;
