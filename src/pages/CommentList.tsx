import { css } from '@emotion/react';
import { RiPencilLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

import IconTextButton from '@/components/common/buttons/IconTextButton';
import Header from '@/layouts/layout/Header';
import theme from '@/styles/theme';

const CommentList = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Header />
      <div css={commentTop}>
        <div>
          <img
            src='https://www.urbanbrush.net/web/wp-content/uploads/edd/2023/02/urban-20230228144115810458.jpg'
            alt='미니 썸네일'
          />
          <div>
            <p>개쩌는 플레이리스트 볼사람 여기여기 붙어라</p>
            <p>김아무개</p>
          </div>
        </div>
        <IconTextButton
          Icon={RiPencilLine}
          variant='light'
          iconPosition='left'
          onClick={() => navigate('/')}
        >
          쓰기
        </IconTextButton>
      </div>
      <div css={CommentListDivStyle}>
        <div css={CommentListTopStyle}>
          {/* 댓글 수 / 필터 div */}
          <p>댓글 수 3</p>
          <p>필터</p>
        </div>
        <div css={CommentListStyle}>
          {/* 댓글 리스트 div*/}
          <div>
            <img
              src='https://www.urbanbrush.net/web/wp-content/uploads/edd/2023/02/urban-20230228144115810458.jpg'
              alt='미니 썸네일'
            />
            <div>
              <h1>골든리트리버좋아</h1>
              <h2>1999-05-24</h2>
              <h3>
                {' '}
                나 지금 심심한데 뭐 할거없나...? 이거 누가 봐??? 아님 혼자 그냥 하는거야?
                김혜인바보멍청이 똥개해삼말미잘 호호호호혼ㅇㄹㄴㅇㅁㅁㄹㅇㅁㄴㄹㅇ
              </h3>
            </div>
          </div>
        </div>
        <hr css={horizonStyle} />
        <div css={CommentListStyle}>
          {/* 댓글 리스트 div*/}
          <div>
            <img
              src='https://www.urbanbrush.net/web/wp-content/uploads/edd/2023/02/urban-20230228144115810458.jpg'
              alt='미니 썸네일'
            />
            <div>
              <h1>이름</h1>
              <h2>날짜</h2>
              <h3>이것은 댓글입니다.이것은 댓글입니다.</h3>
            </div>
          </div>
        </div>
        <div css={CommentListStyle}>
          {/* 댓글 리스트 div*/}
          <div>
            <img
              src='https://www.urbanbrush.net/web/wp-content/uploads/edd/2023/02/urban-20230228144115810458.jpg'
              alt='미니 썸네일'
            />
            <div>
              <h1>이름</h1>
              <h2>날짜</h2>
              <h3>이것은 댓글입니다.이것은 댓글입니다.</h3>
            </div>
          </div>
        </div>
        <div css={CommentListStyle}>
          {/* 댓글 리스트 div*/}
          <div>
            <img
              src='https://www.urbanbrush.net/web/wp-content/uploads/edd/2023/02/urban-20230228144115810458.jpg'
              alt='미니 썸네일'
            />
            <div>
              <h1>이름</h1>
              <h2>날짜</h2>
              <h3>이것은 댓글입니다.이것은 댓글입니다.</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const commentTop = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  background-color: ${theme.colors.tertiary};
  div {
    display: flex;
    justify-content: center;
    div {
      margin-left: 16px;
      display: flex;
      flex-direction: column;
      gap: 9px;
    }
  }

  img {
    width: 50px;
    height: 50px;
  }

  p {
    width: 200px;
    display: inline-block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

const CommentListDivStyle = css`
  display: flex;
  flex-direction: column;
  margin: 0 16px;
`;

const CommentListTopStyle = css`
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
`;

const CommentListStyle = css`
  margin: 10px 0;
  display: flex;

  div {
    display: flex;
    justify-content: center;

    div {
      margin-left: 8px;
      display: flex;
      flex-direction: column;
      gap: 5px;

      ::after {
        border: 0;
        height: 1px;
        background-color: ${theme.colors.tertiary};
        margin: 10px 0;
      }
    }
  }

  img {
    width: 35px;
    height: 35px;
    border-radius: 50%;
  }
  h1 {
    font-size: ${theme.fontSizes.normal};
    height: 17px;
    max-width: 100px; //한글 8글자 기준
  }

  h2 {
    font-size: ${theme.fontSizes.small};
    height: 14px;
    max-width: 70px; // 0000-00-00 형태 기준
  }
  h3 {
    display: flex;
    align-items: center;
    margin-top: 12px;
    // height: 22px;
    font-size: ${theme.fontSizes.normal};
  }
`;

const horizonStyle = css`
  border: 0;
  height: 1px;
  background-color: ${theme.colors.tertiary};
  margin: 10px 0;
`;
export default CommentList;
