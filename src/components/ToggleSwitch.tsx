import React from 'react';

import { css } from '@emotion/react';
import * as Switch from '@radix-ui/react-switch';

import theme from '@/styles/theme';

interface SwitchToggleProps {
  onClick?: () => void;
}

const SwitchToggle: React.FC<SwitchToggleProps> = ({ onClick }) => (
  <div css={flexStyle}>
    <div css={textStyle}>공개</div>
    <Switch.Root defaultChecked onClick={onClick} css={switchRootStyle}>
      <Switch.Thumb css={switchThumbStyle} />
    </Switch.Root>
  </div>
);

const flexStyle = css`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const textStyle = css`
  font-size: ${theme.fontSizes.normal};
  color: ${theme.colors.white};
  font-weight: 500;
`;

const switchRootStyle = css`
  background-color: ${theme.colors.bgSwitchOff + '5a'};
  width: 32px;
  height: 16px;
  border-radius: 100px;
  position: relative;
  border: 1px solid ${theme.colors.bgSwitchOff};
  cursor: pointer;

  &[data-state='checked'] {
    background-color: ${theme.colors.primary};
  }
`;

const switchThumbStyle = css`
  display: block;
  width: 15px;
  height: 15px;
  background-color: ${theme.colors.whiteText};
  border-radius: 100px;
  transition: transform 200ms;
  transform: translateY(-0.5px);

  [data-state='checked'] & {
    transform: translateX(15px) translateY(-0.5px);
  }
`;

export default SwitchToggle;
