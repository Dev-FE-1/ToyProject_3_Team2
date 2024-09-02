import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';

import notFound from '@/assets/images/notFound.png';
import Button from '@/components/common/buttons/Button';
import theme from '@/styles/theme';

const NotFound = () => {
  const navigate = useNavigate();
  const handleGoBack = () => navigate(-1);
  return (
    <div css={containerStyle}>
      <img css={notFoundImageStyle} src={notFound} alt='code 404' />
      <p css={pStyle}>페이지를 찾을 수 없습니다</p>
      <p className='contents'>
        페이지가 존재하지 않거나, 사용할 수 없는 페이지입니다. <br />
        입력하신 주소가 정확한지 다시 한 번 확인해주세요.
      </p>
      <Button onClick={handleGoBack} customStyle={buttonStyle}>
        이전 페이지로 이동
      </Button>
    </div>
  );
};
const containerStyle = css`
  width: 100%;
  max-width: 500px;
  height: 100vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px;
  background-color: ${theme.colors.black};
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

  .contents {
    margin-bottom: 24px;
    font-size: ${theme.fontSizes.normal};
    text-align: center;
    line-height: 140%;
  }
`;
const buttonStyle = css`
  font-size: 16px;
  margin-top: 100px;
`;
const notFoundImageStyle = css`
  width: 200px;
  margin: 0 0 24px;
`;

const pStyle = css`
  font-size: 24px;
  font-weight: 700;
  line-height: 1.5;
  color: ${theme.colors.primary};
`;

export default NotFound;
