import { ComponentType, ReactNode, SVGProps } from 'react';

import { css, SerializedStyles } from '@emotion/react';

import theme from '@/styles/theme';

interface BadgeProps {
  Icon?: ComponentType<SVGProps<SVGSVGElement>>;
  text?: string;
  extra?: string;
  suffix?: string;
  customStyle?: SerializedStyles;
  position?: 'corner' | 'center';
  children?: ReactNode;
}

const Badge: React.FC<BadgeProps> = ({
  Icon,
  suffix,
  text,
  extra,
  children,
  customStyle,
  position = 'corner',
}: BadgeProps) => (
  <div css={[badgeStyle, positionStyle[position], customStyle]}>
    {Icon && <Icon />}
    {text}
    <span>
      {children}
      {suffix}
    </span>
    {extra && <span>{extra}</span>}
  </div>
);

const badgeStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  svg {
    width: ${theme.fontSizes.xsmall};
    height: ${theme.fontSizes.xsmall};
  }
`;
const positionStyle = {
  corner: css`
    position: absolute;
    bottom: 8px;
    right: 8px;
    color: ${theme.colors.white};
    font-size: ${theme.fontSizes.xsmall};
    background-color: ${theme.colors.black + '5a'};
    border-radius: 2px;
    padding: 2px 4px;
  `,
  center: css`
    position: relative;
    bottom: 0;
    right: 0;
    margin: 0 auto;
    justify-content: space-between;
    font-weight: 500;
    font-size: ${theme.fontSizes.normal};
    background-color: ${theme.colors.bgBadge};
    border-radius: 6px;
    padding: 5px 12px;
  `,
};
export default Badge;
