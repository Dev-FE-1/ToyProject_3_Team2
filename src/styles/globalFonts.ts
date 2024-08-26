import { css } from '@emotion/react';

import Black from '../assets/fonts/woff/Pretendard-Black.woff';
import Bold from '../assets/fonts/woff/Pretendard-Bold.woff';
import ExtraBold from '../assets/fonts/woff/Pretendard-ExtraBold.woff';
import ExtraLight from '../assets/fonts/woff/Pretendard-ExtraLight.woff';
import Light from '../assets/fonts/woff/Pretendard-Light.woff';
import Medium from '../assets/fonts/woff/Pretendard-Medium.woff';
import Regular from '../assets/fonts/woff/Pretendard-Regular.woff';
import SemiBold from '../assets/fonts/woff/Pretendard-SemiBold.woff';
import Thin from '../assets/fonts/woff/Pretendard-Thin.woff';

const fontStyles = css`
  @font-face {
    font-family: 'Pretendard';
    src: url(${Black}) format('woff');
    font-weight: 900;
    font-style: normal;
  }
  @font-face {
    font-family: 'Pretendard';
    src: url(${ExtraBold}) format('woff');
    font-weight: 800;
    font-style: normal;
  }
  @font-face {
    font-family: 'Pretendard';
    src: url(${Bold}) format('woff');
    font-weight: 700;
    font-style: normal;
  }
  @font-face {
    font-family: 'Pretendard';
    src: url(${SemiBold}) format('woff');
    font-weight: 600;
    font-style: normal;
  }
  @font-face {
    font-family: 'Pretendard';
    src: url(${Medium}) format('woff');
    font-weight: 500;
    font-style: normal;
  }

  @font-face {
    font-family: 'Pretendard';
    src: url(${Regular}) format('woff');
    font-weight: 400;
    font-style: normal;
  }
  @font-face {
    font-family: 'Pretendard';
    src: url(${Light}) format('woff');
    font-weight: 300;
    font-style: normal;
  }
  @font-face {
    font-family: 'Pretendard';
    src: url(${ExtraLight}) format('woff');
    font-weight: 200;
    font-style: normal;
  }
  @font-face {
    font-family: 'Pretendard';
    src: url(${Thin}) format('woff');
    font-weight: 100;
    font-style: normal;
  }
`;

export default fontStyles;
