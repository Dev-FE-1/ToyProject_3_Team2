import { useEffect, useState, useRef } from 'react';

import { css } from '@emotion/react';
import { GoStar, GoStarFill } from 'react-icons/go';

import IconTextButton from '@/components/common/buttons/IconTextButton';
import StarAnimation from '@/components/page/subscriptions/StarAnimation';

interface SubsToggleButtonProps {
  handleForkToggle: () => void;
  isForked: boolean | null;
}

const SubsToggleButton = ({ handleForkToggle, isForked }: SubsToggleButtonProps) => {
  const [showAnimation, setShowAnimation] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isForked) {
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
  }, [isForked]);

  return (
    <div css={wrapperStyle}>
      <IconTextButton
        Icon={isForked ? GoStarFill : GoStar}
        variant='dark'
        onClick={handleForkToggle}
      >
        {isForked ? '플리 구독중' : '플리 구독하기'}
      </IconTextButton>
      <StarAnimation isActive={showAnimation} />
    </div>
  );
};

const wrapperStyle = css`
  position: relative;
`;

export default SubsToggleButton;
