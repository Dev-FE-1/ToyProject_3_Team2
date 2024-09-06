import { css } from '@emotion/react';

import theme from '@/styles/theme';

const NullBox = () => (
  <div css={nullContentStyle}>
    <img src='/videonull.svg' alt='videonull' css={videoNullStyle} />
    <div css={nullTextStyle}>
      <div>앗! 아직 영상이 없어요</div>
      <div>영상을 추가하여</div>
      <div>나만의 플리를 만들어보세요</div>
    </div>
  </div>
);

const nullContentStyle = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 50px;
`;
const videoNullStyle = css`
  width: 79px;
  height: 51px;
`;
const nullTextStyle = css`
  width: 200px;
  height: 57px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 20px;

  div {
    text-align: left;
    font-size: ${theme.fontSizes.large};
    color: ${theme.colors.disabledText};
    line-height: 1.2;
  }
`;

export default NullBox;
