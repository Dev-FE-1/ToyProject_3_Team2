import { css } from '@emotion/react';
import { GoPerson, GoSignOut, GoChevronRight } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';

import CustomDialog from '@/components/common/modals/Dialog';
import { PATH } from '@/constants/path';
import Header from '@/layouts/layout/Header';
import { useModalStore } from '@/store/useModalStore';
import theme from '@/styles/theme';

const Settings = () => {
  const isModalOpen = useModalStore((state) => state.isModalOpen);
  const { openModal, closeModal } = useModalStore();
  const navigate = useNavigate();

  const handleSignOut = () => {
    openModal();
  };
  const confirmSignOut = () => {
    //로그인 상태를 로그아웃으로 변경하는 코드
    // 토스트는 없어도 됨
    sessionStorage.removeItem('userSession');
    closeModal();
    navigate(PATH.SIGNIN);
  };
  return (
    <div css={containerStyle}>
      <Header>설정</Header>
      <ul css={ulStyle}>
        <li>
          <button css={buttonStyle}>
            <GoPerson />
            <span>프로필 수정</span>
            <GoChevronRight css={iconStyle} />
          </button>
        </li>
        <li>
          <button css={buttonStyle} onClick={handleSignOut}>
            <GoSignOut />
            <span>로그아웃</span>
            <GoChevronRight css={iconStyle} />
          </button>
        </li>
      </ul>
      {isModalOpen && (
        <CustomDialog
          type='alertconfirm'
          isOpen={isModalOpen}
          onClose={closeModal}
          onConfirm={confirmSignOut}
        />
      )}
    </div>
  );
};

const containerStyle = css`
  position: relative;
`;
const ulStyle = css`
  display: flex;
  flex-direction: column;

  padding: 1rem;
  li {
    svg {
      font-size: 1.5rem;
    }
    cursor: pointer;
  }
`;
const buttonStyle = css`
  position: relative;
  display: flex;
  align-items: center;
  text-indent: 1rem;
  height: ${theme.heights.xtall};
  color: ${theme.colors.white};
  font-size: ${theme.fontSizes.large};
  background-color: ${theme.colors.black};
  width: 100%;
  padding: 0 1rem;
  transition: background-color 0.3s;
`;
const iconStyle = css`
  position: absolute;
  right: 8px;
`;
export default Settings;
