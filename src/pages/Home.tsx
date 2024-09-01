import { css } from '@emotion/react';
import { RiArrowRightSLine } from 'react-icons/ri';

import SelectBox from '@/components/common/SelectBox';
import theme from '@/styles/theme';

// SelectBox에 들어갈 내용
const items = [
  { value: 'public', label: '공개' },
  { value: 'private', label: '비공개' },
];
const items2 = [
  { value: 'sport', label: '스포츠' },
  { value: 'music', label: '음악' },
  { value: 'dance', label: '춤' },
  { value: 'mukbang', label: '먹방' },
];

const Home = () => (
  <div>
    <img src='/logo.svg' alt='Logo' css={logoStyle} />
    <div css={titleStyle}>
      <p>내 관심사와 비슷한 플레이리스트</p>
      <RiArrowRightSLine />
    </div>

    <p>selectbox 테스트</p>
    <SelectBox items={items} />
    <SelectBox items={items2} />
  </div>
);

const logoStyle = css`
  width: 120px;
  margin: 2rem 0 1rem 1rem;
`;

const titleStyle = css`
  display: flex;
  align-items: center;
  font-size: ${theme.fontSizes.normal};
  font-weight: 700;
  gap: 10px;

  svg {
    width: 20px;
    height: 20px;
    color: ${theme.colors.disabled};
  }
`;

export default Home;
