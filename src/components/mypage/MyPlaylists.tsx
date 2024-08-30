import React, { useState } from 'react';

import { css } from '@emotion/react';

import FlipCard from '@/components/mypage/FlipCard';

const FlipoverContainer: React.FC = () => {
  const [activeFlipCard, setActiveFlipCard] = useState<string | null>(null);

  const handleFlip = (id: string) => {
    setActiveFlipCard((prevActive) => (prevActive === id ? null : id));
  };

  return (
    <div css={wrapperStyle}>
      <FlipCard
        id='flipover1'
        isFlipped={activeFlipCard === 'flipover1'}
        onFlip={() => handleFlip('flipover1')}
      />
      <FlipCard
        id='flipover2'
        isFlipped={activeFlipCard === 'flipover2'}
        onFlip={() => handleFlip('flipover2')}
      />
      <FlipCard
        id='flipover3'
        isFlipped={activeFlipCard === 'flipover3'}
        onFlip={() => handleFlip('flipover3')}
      />
      <FlipCard
        id='flipover4'
        isFlipped={activeFlipCard === 'flipover4'}
        onFlip={() => handleFlip('flipover4')}
      />
      <FlipCard
        id='flipover5'
        isFlipped={activeFlipCard === 'flipover5'}
        onFlip={() => handleFlip('flipover5')}
      />
      <FlipCard
        id='flipover6'
        isFlipped={activeFlipCard === 'flipover6'}
        onFlip={() => handleFlip('flipover6')}
      />
      <FlipCard
        id='flipover7'
        isFlipped={activeFlipCard === 'flipover7'}
        onFlip={() => handleFlip('flipover7')}
      />
      <FlipCard
        id='flipover8'
        isFlipped={activeFlipCard === 'flipover8'}
        onFlip={() => handleFlip('flipover8')}
      />
      <FlipCard
        id='flipover9'
        isFlipped={activeFlipCard === 'flipover9'}
        onFlip={() => handleFlip('flipover9')}
      />
    </div>
  );
};

const wrapperStyle = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
`;
export default FlipoverContainer;
