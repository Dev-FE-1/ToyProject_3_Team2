import { ComponentType, SVGProps } from 'react';

import { css, SerializedStyles } from '@emotion/react';

import theme from '@/styles/theme';

type IconButtonVariant = 'transparent' | 'dark' | 'light' | 'large';

interface IconTextButtonProps {
  Icon: ComponentType<SVGProps<SVGAElement>>;
  variant?: IconButtonVariant;
  iconPosition?: 'left' | 'right';
  onClick?: () => void;
  children: string;
  customStyle?: SerializedStyles;
}

const IconTextButton: React.FC<IconTextButtonProps> = ({
  Icon,
  variant = 'transparent',
  iconPosition = 'right',
  onClick,
  children,
  customStyle,
}: IconTextButtonProps) => (
  <button
    css={[baseButtonStyle, getVariantStyle(variant), customStyle]}
    onClick={onClick}
    className={iconPosition}
  >
    {children}
    <Icon />
  </button>
);

const baseButtonStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 8px 8px 12px;
  gap: 4px;
  font-size: ${theme.fontSizes.xsmall};

  svg {
    width: ${theme.fontSizes.small};
    height: ${theme.fontSizes.small};
  }
  &.left {
    flex-direction: row-reverse;
  }
`;

const getVariantStyle = (variant: IconButtonVariant) => {
  switch (variant) {
    case 'transparent':
      return css`
        height: ${theme.fontSizes.small};
        background-color: transparent;
        font-size: ${theme.fontSizes.small};
        font-weight: 500;
        color: ${theme.colors.white};
        padding: 16px 0;
        z-index: 100;
      `;
    case 'dark':
      return css`
        height: ${theme.heights.short};
        background-color: ${theme.colors.tertiary};
        font-size: ${theme.fontSizes.small};
        font-weight: 500;
        line-height: 14px;
        color: ${theme.colors.white};
        border-radius: 20px;
        padding: 4px 12px;
        gap: 2px;
      `;
    case 'light':
      return css`
        height: ${theme.heights.short};
        background-color: ${theme.colors.white};
        font-size: ${theme.fontSizes.normal};
        line-height: 14px;
        color: ${theme.colors.black};
        border-radius: 20px;
        padding: 4px 12px;
        gap: 2px;
        svg {
          width: ${theme.fontSizes.normal};
          height: ${theme.fontSizes.normal};
        }
      `;
    case 'large':
      return css`
        width: 100%;
        height: ${theme.heights.tall};
        background-color: ${theme.colors.white};
        font-size: ${theme.fontSizes.large};
        font-weight: 500;
        line-height: 20px;
        color: ${theme.colors.black};
        border-radius: 26px;
        padding: 4px 12px;
        gap: 6px;
        svg {
          width: ${theme.fontSizes.xlarge};
          height: ${theme.fontSizes.xlarge};
        }
      `;
  }
};

export default IconTextButton;
