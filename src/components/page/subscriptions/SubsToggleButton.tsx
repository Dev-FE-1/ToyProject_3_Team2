import React, { useEffect, useState, useRef } from 'react';

import { css } from '@emotion/react';
import { GoStar, GoStarFill } from 'react-icons/go';

import IconTextButton from '@/components/common/buttons/IconTextButton';
import StarAnimation from '@/components/page/subscriptions/StarAnimation';
import { useToggleStore } from '@/store/useToggleStore';

const SubsToggleButton = () => {
  const isToggled = useToggleStore((state) => state.isToggled);
  const toggle = useToggleStore((state) => state.toggle);
  const [showAnimation, setShowAnimation] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleToggle = () => {
    toggle();
  };

  useEffect(() => {
    if (isToggled) {
      setShowAnimation(true);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      timerRef.current = setTimeout(() => {
        setShowAnimation(false);
      }, 1500);
    } else {
      setShowAnimation(false);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isToggled]);

  return (
    <div css={wrapperStyle}>
      <IconTextButton Icon={isToggled ? GoStarFill : GoStar} variant='dark' onClick={handleToggle}>
        {isToggled ? '플리 구독중' : '플리 구독하기'}
      </IconTextButton>
      <StarAnimation isActive={showAnimation} />
    </div>
  );
};

const wrapperStyle = css`
  position: relative;
`;

export default SubsToggleButton;
