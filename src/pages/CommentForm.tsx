import React, { useState, useEffect } from 'react';

import { css } from '@emotion/react';
import { useNavigate, useLocation } from 'react-router-dom';

import { getPlaylistById } from '@/api/endpoints/playlist';
import Button from '@/components/common/buttons/Button';
import Header from '@/layouts/layout/Header';
import { CommentTabStyle } from '@/pages/CommentList';
import theme from '@/styles/theme';

const MAX_COMMENT_LENGTH = 500;

const CommentForm = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // location.state에서 필요한 데이터를 받음
  const { playlistId, title, userName, thumbnailUrl } = location.state || {};

  const [comment, setComment] = useState('');
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setIsActive(comment.length > 0 && comment.length <= MAX_COMMENT_LENGTH);
  }, [comment]);

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isActive) {
      console.log('댓글이 등록되었습니다:', comment);
      setComment('');
      navigate(-1);
    }
  };

  return (
    <div>
      <Header />
      <div css={CommentTabStyle}>
        <div>
          <img src={thumbnailUrl} alt='미니 썸네일' />
          <div>
            <p>{title}</p>
            <p>{userName}</p>
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit} css={formStyle}>
        <label htmlFor='comment' css={labelStyle}>
          댓글 작성
        </label>
        <textarea
          css={textareaStyle}
          placeholder='설명을 입력하세요.'
          value={comment}
          onChange={handleCommentChange}
          maxLength={MAX_COMMENT_LENGTH}
        />
        <div css={charCountStyle}>
          <span css={blueTextStyle}>{comment.length}</span>/{MAX_COMMENT_LENGTH}
        </div>
        {isActive ? (
          <Button type='submit' styleType='primary'>
            등록
          </Button>
        ) : (
          <Button type='submit' styleType='disabled'>
            등록
          </Button>
        )}
      </form>
    </div>
  );
};

const formStyle = css`
  display: flex;
  flex-direction: column;
  margin-top: 16px;
  margin: 0 2rem;
`;

const labelStyle = css`
  font-size: ${theme.fontSizes.normal};
  margin-top: 0.5rem;
  color: ${theme.colors.white};
`;

const textareaStyle = css`
  width: 100%;
  height: 140px;
  padding: 12px;
  margin-top: 1rem;
  border: 1px solid ${theme.colors.white};
  background-color: transparent;
  color: ${theme.colors.white};
  outline: none;
  font-size: ${theme.fontSizes.large};
  border-radius: 4px;
  resize: none;
`;

const charCountStyle = css`
  text-align: right;
  font-size: ${theme.fontSizes.normal};
  color: ${theme.colors.white};
  margin: 0.5rem 0 1.5rem;
`;

const blueTextStyle = css`
  color: ${theme.colors.primary};
`;

export default CommentForm;
