import { ComponentType, SVGProps } from 'react';

import { css } from '@emotion/react';

import theme from '@/styles/theme';
interface IconButtonProps {
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  type?: string;
  onClick?: () => void;
}

const IconButton: React.FC<IconButtonProps> = ({
  Icon,
  onClick,
  type = 'button',
}: IconButtonProps) => (
  <button css={iconButtonStyle} onClick={onClick}>
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
