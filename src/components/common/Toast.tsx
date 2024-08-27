import { useEffect, useState } from 'react';

import { css } from '@emotion/react';

import useToastStore from '@/store/toastStore';
import theme from '@/styles/theme';

const Toast: React.FC = () => {
  const { isVisible, message, hideToast } = useToastStore();
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isVisible) {
      setIsAnimating(true);
      timer = setTimeout(() => {
        setIsAnimating(false);
        setTimeout(hideToast, 200);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, hideToast]);

  if (!isVisible && !isAnimating) return null;

  return <div css={[toastStyle, isAnimating ? toastEnterStyle : toastLeaveStyle]}>{message}</div>;
};
const toastStyle = css`
  width: calc(100vw - 32px);
  max-width: 468px;
  position: fixed;
  bottom: 96px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
  border-radius: 4px;
  background-color: ${theme.colors.white};
  color: ${theme.colors.black};
  z-index: 1000;
  transition: all 0.2s ease-in;
`;
const toastEnterStyle = css`
  opacity: 1;
  transform: translateX(-50%) translateY(0);
`;

const toastLeaveStyle = css`
  opacity: 0;
  transform: translateX(-50%) translateY(10px);
`;
export default Toast;
