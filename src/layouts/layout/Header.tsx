import { ComponentType, SVGProps } from 'react';

import { css, SerializedStyles } from '@emotion/react';
import { GoChevronLeft } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';

import theme from '@/styles/theme';
interface HeaderProps {
  Icon?: ComponentType<SVGProps<SVGElement>>;
  children?: React.ReactNode;
  onBack?: () => void;
  customStyle?: SerializedStyles;
  onIcon?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  Icon,
  children,
  onBack,
  customStyle,
  onIcon,
}: HeaderProps) => {
  const navigate = useNavigate();

  const handleBack = () => {
    onBack ? onBack() : navigate(-1);
  };
  return (
    <header css={headerStyle}>
      <button css={buttonStyle} onClick={handleBack}>
        <GoChevronLeft />
      </button>
      {children && <h1 css={titleStyle}>{children}</h1>}
      {Icon && (
        <button css={[buttonStyle, customStyle]} onClick={onIcon}>
          <Icon />
        </button>
      )}
    </header>
  );
};

const headerStyle = css`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: ${theme.heights.tall};
  background-color: ${theme.colors.black};
  padding: 13px 20px 13px 16px;
`;
const buttonStyle = css`
  width: 24px;
  height: 24px;
  color: ${theme.colors.white};
  background-color: transparent;
  svg {
    width: 24px;
    height: 24px;
  }
`;
const titleStyle = css`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

export default Header;
