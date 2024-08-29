import React, { useEffect, useState } from 'react';

import { css, keyframes } from '@emotion/react';

interface StarAnimationProps {
  isActive: boolean;
}

const svgPath =
  'M26.5 25.5C19.0043 33.3697 0 34 0 34C0 34 19.1013 35.3684 26.5 43.5C33.234 50.901 34 68 34 68C34 68 36.9884 50.7065 44.5 43.5C51.6431 36.647 68 34 68 34C68 34 51.6947 32.0939 44.5 25.5C36.5605 18.2235 34 0 34 0C34 0 33.6591 17.9837 26.5 25.5Z';

const comeInOut = keyframes`
  0% { transform: scale(0); opacity: 0; }
  50% { transform: scale(1); opacity: 1; }
  100% { transform: scale(0); opacity: 0; }
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(180deg); }
`;

const containerStyle = css`
  position: absolute;
  width: 120px;
  height: 40px;
  left: 0%;
  top: 0%;
  transform: translate(-14px, -4px);
  pointer-events: none;
  overflow: hidden;
`;

const starStyle = css`
  position: absolute;
  display: block;
  animation: ${comeInOut} 500ms forwards;

  svg {
    display: block;
    animation: ${spin} 300ms linear;
  }
`;

const StarAnimation: React.FC<StarAnimationProps> = ({ isActive }) => {
  const [stars, setStars] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    if (!isActive) {
      setStars([]);
      return;
    }

    const addStar = () => {
      const size = Math.floor(Math.random() * 7) + 2; /* 별 크기 : 2 ~ 9px */
      const top = Math.floor(Math.random() * 40); /* 별이 나타나는 범위 , 작을수록 좁음 */
      const left = Math.floor(Math.random() * 120); /* 별이 나타나는 범위 , 작을수록 좁음 */

      const star = (
        <span
          key={Date.now()}
          css={[
            starStyle,
            css`
              top: ${top}px;
              left: ${left}px;
            `,
          ]}
        >
          <svg width={size} height={size} viewBox='0 0 68 68' fill='none'>
            <path d={svgPath} fill='#FFC700' />
          </svg>
        </span>
      );

      setStars((prevStars) => [...prevStars.slice(-19), star]); // Increased to 20 stars
    };

    const interval = setInterval(
      () => {
        addStar();
      },
      Math.random() * 30 + 20 // Increased frequency
    );

    return () => clearInterval(interval);
  }, [isActive]);

  return <div css={containerStyle}>{stars}</div>;
};

export default StarAnimation;
