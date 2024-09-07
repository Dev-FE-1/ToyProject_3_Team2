import React from 'react';

import { css, SerializedStyles } from '@emotion/react';
import * as Switch from '@radix-ui/react-switch';

import { IS_PUBLIC } from '@/constants/\bnormal';
import theme from '@/styles/theme';

interface ToggleSwitchProps {
  checked: boolean;
  onCheckedChange: () => void;
  customStyle?: SerializedStyles;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ checked, onCheckedChange, customStyle }) => (
  <div css={flexStyle}>
    <div css={[textStyle, customStyle]}>{checked ? IS_PUBLIC.true : IS_PUBLIC.all}</div>
    <Switch.Root
      defaultChecked
      checked={checked}
      onCheckedChange={onCheckedChange}
      css={switchRootStyle}
    >
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

export default ToggleSwitch;
