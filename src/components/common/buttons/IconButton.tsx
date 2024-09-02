import { ComponentType, SVGProps } from 'react';

import { css, SerializedStyles } from '@emotion/react';

import theme from '@/styles/theme';
interface IconButtonProps {
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  type?: 'reset' | 'button' | 'submit';
  onClick?: () => void;
  customStyle?: SerializedStyles;
}

const IconButton: React.FC<IconButtonProps> = ({
  Icon,
  onClick,
  type = 'button',
  customStyle,
}: IconButtonProps) => (
  <button type={type} css={[iconButtonStyle, customStyle]} onClick={onClick}>
    <Icon />
  </button>
);

const iconButtonStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${theme.heights.tall};
  height: ${theme.heights.tall};
  border-radius: 50%;
  background-color: ${theme.colors.tertiary};
  svg {
    width: 24px;
    height: 24px;
    color: ${theme.colors.white};
  }
`;

export default IconButton;
