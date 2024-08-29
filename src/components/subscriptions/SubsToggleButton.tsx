// import 로 가져와야 하는 거
import { useEffect, useRef, useState } from 'react';

import { css } from '@emotion/react';
import { GoStar, GoStarFill } from 'react-icons/go'; // 별(empty), 별(filled)

import IconTextButton from '@/components/common/buttons/IconTextButton';
import StarAnimation from '@/components/subscriptions/StarAnimation';
import useToggleStore from '@/store/useToggleStore';

const SubsToggleButton = () => {
  const isToggled = useToggleStore((state) => state.isToggled);
  const toggle = useToggleStore((state) => state.toggle);
  const [showBubbles, setShowBubbles] = useState(false);
  const prevIsToggledRef = useRef(isToggled);

  const handleToggle = () => {
    toggle();
  };
  useEffect(() => {
    if (isToggled && !prevIsToggledRef.current) {
      setShowBubbles(true);
      const timer = setTimeout(() => setShowBubbles(false), 3000);
      return () => clearTimeout(timer);
    }
    prevIsToggledRef.current = isToggled;
  }, [isToggled]);
  return (
    <div css={wrapperStyle}>
      <IconTextButton Icon={isToggled ? GoStarFill : GoStar} variant='dark' onClick={handleToggle}>
        {isToggled ? '플리 구독중' : '플리 구독하기'}
      </IconTextButton>
      <StarAnimation isActive={showBubbles} />
    </div>
  );
};
const wrapperStyle = css`
  position: relative;
`;
export default SubsToggleButton;
