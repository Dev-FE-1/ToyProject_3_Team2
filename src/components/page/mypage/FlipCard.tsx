import { useEffect, useRef, useState } from 'react';

import { css } from '@emotion/react';
import { RiArrowRightSLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

import defaultImage from '@/assets/images/default-thumb.svg';
import IconTextButton from '@/components/common/buttons/IconTextButton';
import theme from '@/styles/theme';
import { shortenString } from '@/utils/string';

interface FlipCardProps {
  id: string;
  title: string;
  isFlipped: boolean;
  onFlip: () => void;
  front?: React.ReactNode;
  back?: React.ReactNode;
  image?: string;
  category: string;
}

const FlipCard: React.FC<FlipCardProps> = ({
  id,
  title,
  isFlipped,
  onFlip,
  front,
  back,
  image,
  category,
}) => {
  const [size, setSize] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const parentWidth = containerRef.current.parentElement?.clientWidth || 0;
        const newSize = Math.floor(parentWidth / 3);
        setSize(newSize);
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const handleClick = () => {
    navigate('/playlist/' + id, {
      state: { previousPath: location.pathname },
    });
  };

  const imageUrl = image && image.trim() !== '' ? image : defaultImage;

  return (
    <div ref={containerRef} css={containerStyle(size)} onClick={onFlip}>
      <div css={[innerStyle, isFlipped && flippedStyle]}>
        <div css={frontStyle}>
          {front || <img src={imageUrl} alt='Playlist cover' />}
          <div css={overlayStyle} />
        </div>
        <div css={backStyle}>
          {back || (
            <>
              <h1 css={titleStyle}>{title ? shortenString(title, 18) : 'No Title'}</h1>
              {category && <span css={tagStyle}>{`#${category}`}</span>}
              <IconTextButton Icon={RiArrowRightSLine} variant='transparent' onClick={handleClick}>
                자세히 보기
              </IconTextButton>
            </>
          )}
          <div css={overlayStyle} />
        </div>
      </div>
    </div>
  );
};

const containerStyle = (size: number) => css`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: ${size}px;
  height: ${size}px;
  perspective: 1000px;
  cursor: pointer;
`;

const innerStyle = css`
  width: 100%;
  height: 100%;
  position: relatve;
  transition: transform 0.5s;
  transform-style: preserve-3d;
`;

const flipStyle = css`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
`;
const flippedStyle = css`
  transform: rotateY(180deg);
`;
const frontStyle = css`
  ${flipStyle}
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const backStyle = css`
  ${flipStyle}
  background-color:  ${theme.colors.tertiary + '7a'};
  color: #fff;
  transform: rotateY(180deg);
  padding: 1rem 1rem 0;
`;
const titleStyle = css`
  font-size: ${theme.fontSizes.normal};
  margin-bottom: 1rem;
  line-height: 1.3;
`;
const tagStyle = css`
  font-size: ${theme.fontSizes.normal};
  color: ${theme.colors.blue};
  margin-bottom: 1rem;
`;
const overlayStyle = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: transparent;
`;
export default FlipCard;
