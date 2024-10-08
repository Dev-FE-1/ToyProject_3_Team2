import { css, keyframes } from '@emotion/react';

import theme from '@/styles/theme';
const spin = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
    `;
const Spinner: React.FC = () => (
  <div css={spinnerContainerStyle}>
    <div css={spinnerStyle}></div>
  </div>
);

const spinnerContainerStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
const spinnerStyle = css`
  border: 4px solid ${theme.colors.bgMypage};
  border-top: 4px solid ${theme.colors.primary};
  border-radius: 50%;
  width: 32px;
  height: 32px;
  animation: ${spin} 1s linear infinite;
`;
export default Spinner;
