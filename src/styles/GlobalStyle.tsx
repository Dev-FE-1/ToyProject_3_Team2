import { css, Global } from '@emotion/react';

import fontStyles from './globalFonts';
import theme from '@/styles/\btheme';

const baseStyles = css`
  ${fontStyles} /* @font-face */

  /* reset */
  html,
  body,
  div,
  span,
  applet,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  address,
  code,
  img,
  small,
  strike,
  strong,
  b,
  u,
  i,
  center,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  details,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section,
  summary,
  time {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  input,
  textarea,
  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section {
    display: block;
  }

  ol,
  ul {
    list-style: none;
  }

  blockquote,
  q {
    quotes: none;
  }

  blockquote::before,
  blockquote::after,
  q::before,
  q::after {
    content: '';
    content: none;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  button {
    outline: 0;
    border: 0;
    cursor: pointer;
  }
  a:link,
  a:visited,
  a:hover,
  a:active {
    text-decoration: none;
    color: inherit;
  }
  /* base */
  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    font-family: 'Pretendard', sans-serif;
    font-weight: 400;
    line-height: 1;
    font-size: ${theme.fontSizes.large}; /* 16px */
    color: ${theme.colors.black};
    letter-spacing: -0.14px;
    background-color: ${theme.colors.black};
  }

  input,
  textarea {
    font-family: 'Pretendard', sans-serif;
    letter-spacing: -0.14px;
    color: ${theme.colors.black};

    &::placeholder {
      color: ${theme.colors.darkGray};
      opacity: 1; /* Firefox */
    }
  }

  /* 공통 페이지 여백 */
  .wrapper {
    padding: 0 16px; /* 1rem */
  }
  /* 공통 페이지 타이틀 */
  .page-title {
    padding: 32px 0 20px 16px;
    font-weight: bold;
    font-size: ${theme.fontSizes.xxlarge};
    background-color: ${theme.colors.white};
  }
`;

const GlobalStyle = () => <Global styles={baseStyles} />;

export default GlobalStyle;
