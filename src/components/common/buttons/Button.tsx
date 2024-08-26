import { ReactNode } from 'react';

import { css, SerializedStyles } from '@emotion/react';

import theme from '@/styles/theme';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  styleType?:
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'ghost'
    | 'textBlue'
    | 'textWhite'
    | 'disabled';
  customStyle?: SerializedStyles;
  type?: 'button' | 'submit' | 'reset';
  size?: 'small' | 'large';
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  styleType = 'primary',
  type = 'button',
  size = 'large',
  customStyle,
}: ButtonProps) => (
  <button
    css={[baseButtonStyle, buttonStyles[styleType], sizeStyles[size], customStyle]}
    type={type}
    onClick={onClick}
    disabled={styleType === 'disabled'}
  >
    {children}
  </button>
);
const baseButtonStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: ${theme.heights.tall};
  font-size: ${theme.fontSizes.large};
  font-weight: 400;
  border-radius: 26px;
  transition: all 300ms ease;
`;
const sizeStyles = {
  small: css`
    width: auto;
    height: ${theme.heights.short};
    padding: 0 12px;
    background-color: ${theme.colors.tertiary};
    border-radius: 20px;
    font-size: ${theme.fontSizes.normal};
    color: ${theme.colors.white};
    transition: none;
    &:hover {
      color: ${theme.colors.black};
      background-color: ${theme.colors.white};
    }
  `,
  large: css`
    height: ${theme.heights.tall};
    font-size: ${theme.fontSizes.normal};
  `,
};

const buttonStyles = {
  primary: css`
    background-color: ${theme.colors.primary};
    color: ${theme.colors.white};
    &:hover {
      background-color: ${theme.colors.primaryHover};
    }
  `,
  secondary: css`
    background-color: ${theme.colors.secondary};
    color: ${theme.colors.black};
    &:hover {
      background-color: ${theme.colors.secondaryHover};
    }
  `,
  tertiary: css`
    background-color: ${theme.colors.tertiary};
    color: ${theme.colors.white};
    &:hover {
      background-color: ${theme.colors.hoveTertiary};
    }
  `,
  ghost: css`
    background-color: transparent;
    color: ${theme.colors.primary};
    border: 1px solid ${theme.colors.primary};
    &:hover {
      color: ${theme.colors.primaryHover};
      border: 1px solid ${theme.colors.primaryHover};
    }
  `,
  textBlue: css`
    height: auto;
    background-color: transparent;
    color: ${theme.colors.blue};
    &:hover {
      color: ${theme.colors.blueHover};
    }
  `,
  textWhite: css`
    height: auto;
    background-color: transparent;
    color: ${theme.colors.whiteText};
    &:hover {
      color: ${theme.colors.disabled};
    }
  `,
  disabled: css`
    background-color: ${theme.colors.disabled};
    color: ${theme.colors.disabledText};
    cursor: not-allowed;
  `,
};

export default Button;
