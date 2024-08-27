import { css } from '@emotion/react';
import { FaRegComment } from 'react-icons/fa6';
import { IoMdHeartEmpty } from 'react-icons/io';

import theme from '@/styles/theme';

const LikesAndComments = () => (
  <div css={LikesAndCommentss}>
    <button>
      <FaRegComment />
    </button>
    <button>
      <IoMdHeartEmpty />
    </button>
  </div>
);

export default LikesAndComments;

export const LikesAndCommentss = css`
  background-color: white;
  display: flex;
  justify-content: center;
  width: 150px;
  height: 35px;
  font-size: 14px;
`;
