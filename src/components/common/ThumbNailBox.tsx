import React from 'react';

import { css } from '@emotion/react';
import { GoVideo } from 'react-icons/go';

import Badge from '@/components/common/Badge';
import theme from '@/styles/theme';

interface ThumbNailBoxProps {
  onClick?: () => void;
  thumURL?: string;
  title?: string;
  subtitle?: string;
  update?: string;
  uploader?: string;
  likes?: string;
  comments?: number;
  listnum?: number;
  type: 'main1' | 'main2' | 'details' | 'recent';
}

const LIKES = '좋아요';
const COMMENTS = '댓글';

const ThumbNailBox: React.FC<ThumbNailBoxProps> = ({
  onClick,
  thumURL,
  title,
  subtitle,
  update,
  uploader,
  likes,
  comments,
  type,
  listnum,
}) => {
  switch (type) {
    case 'main1':
      return (
        <div css={[mainStyle, main1Style]} onClick={onClick}>
          <div css={thumbnailContainerStyle}>
            <div className='thumbnail' css={thumbnailStyle(thumURL)}>
              <Badge text='동영상' position='corner' suffix='개'>
                {listnum}
              </Badge>
            </div>
            <div css={thumbnailBackdropStyle}></div>
          </div>
          <div className='title'>{title}</div>
          <div className='info'>
            <span css={infoItemStyle}>{uploader} </span>
            <span css={infoItemStyle}>좋아요 {likes}</span>
          </div>
        </div>
      );
    case 'main2':
      return (
        <div css={[mainStyle, main2Style]} onClick={onClick}>
          <div css={thumbnailContainerStyle}>
            <div className='thumbnail' css={thumbnailStyle(thumURL)}>
              <Badge Icon={GoVideo} position='corner' suffix='개'>
                {listnum}
              </Badge>
            </div>
            <div css={thumbnailBackdropStyle}></div>
          </div>
          <div className='content'>
            <div className='title'>{title}</div>
            <div className='info'>
              <span css={infoItemStyle}>{uploader}</span>
              <span css={infoItemStyle}>좋아요 {likes}</span>
            </div>
            <div className='update'>{update}</div>
          </div>
        </div>
      );
    case 'details':
      return (
        <div css={[mainStyle, detailsStyle]} onClick={onClick}>
          <div css={thumbnailContainerStyle}>
            <div className='thumbnail' css={thumbnailStyle(thumURL)}>
              <Badge text='동영상' position='corner' suffix='개'>
                {listnum}
              </Badge>
            </div>
            <div css={thumbnailBackdropStyle}></div>
          </div>
          <div className='content'>
            <div className='title'>{title}</div>
            <div className='subtitle'>{subtitle}</div>
            <div className='info'>
              <span css={infoItemStyle}>{uploader}</span>
              <span css={infoItemStyle}>
                {LIKES} {likes}
              </span>
              <span css={infoItemStyle}>
                {COMMENTS} {comments}
              </span>
            </div>
            <div className='update'>{update}</div>
          </div>
        </div>
      );
    case 'recent':
      return (
        <div css={[mainStyle, detailsStyle]} onClick={onClick}>
          <div css={thumbnailContainerStyle}>
            <div className='thumbnail' css={thumbnailStyle(thumURL)}>
              <Badge text='동영상' position='corner' suffix='개'>
                {listnum}
              </Badge>
            </div>
            <div css={thumbnailBackdropStyle}></div>
          </div>
          <div className='content'>
            <div className='title'>{title}</div>
            <div className='subtitle'>{subtitle}</div>
            <div className='info'>
              <span css={infoItemStyle}>{uploader}</span>
              <span css={infoItemStyle}>
                {LIKES} {likes}
              </span>
            </div>
            <div className='update'>{update}</div>
          </div>
        </div>
      );
  }
};

const mainStyle = css`
  cursor: pointer;
  margin: 1rem;
`;

const ellipsisStyle = css`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const thumbnailContainerStyle = css`
  position: relative;
`;

const thumbnailStyle = (thumURL: string | undefined) => css`
  position: relative;
  background-image: url(${thumURL});
  background-size: cover;
  background-position: center;
  border-radius: 4px;
  z-index: 4;
`;

const thumbnailBackdropStyle = css`
  position: absolute;
  top: -3px;
  left: 2.5%;
  width: 95%;
  height: 100%;
  border-radius: 6px;
  background-color: ${theme.colors.ThumbNailBox};
  z-index: 1;
`;

const titleStyle = css`
  ${ellipsisStyle}
  font-size: ${theme.fontSizes.normal};
  color: ${theme.colors.white};
  height: 17px;
`;

const infoStyle = css`
  ${ellipsisStyle}
  font-size: ${theme.fontSizes.small};
  color: ${theme.colors.disabled};
  height: 14px;
  display: flex;
`;

const updateStyle = css`
  ${ellipsisStyle}
  font-size: ${theme.fontSizes.small};
  color: ${theme.colors.disabled};
  height: 14px;
`;

const main1Style = css`
  width: 150px;
  height: 190px;
  margin-right: 0;

  .thumbnail {
    width: 150px;
    height: 150px;
  }

  .title {
    ${titleStyle}
    margin-top: 6px;
    width: 150px;
  }

  .info {
    ${infoStyle}
    max-width: 150px;
  }
`;

const main2Style = css`
  max-width: 480px;
  height: 103px;
  display: flex;

  .thumbnail {
    width: 100px;
    height: 100px;
  }

  .content {
    ${ellipsisStyle}
    margin-left: 27px;
    margin-top: 6px;
    max-width: 300px;
  }

  .title {
    ${titleStyle}
    margin-top: 6px;
  }

  .info {
    ${infoStyle}
    margin-top: 7px;
  }

  .update {
    ${updateStyle}
    margin-top: 6px;
  }
`;

const detailsStyle = css`
  max-width: 480px;
  height: 143px;
  display: flex;

  .thumbnail {
    width: 140px;
    height: 140px;
  }

  .content {
    ${ellipsisStyle}
    margin-left: 16px;
    margin-top: 6px;
    max-width: 300px;
  }

  .title {
    ${titleStyle}
  }

  .subtitle {
    ${ellipsisStyle}
    font-size: ${theme.fontSizes.small};
    color: ${theme.colors.disabled};
    margin-top: 11px;
    height: 28px;
  }

  .info {
    ${infoStyle}
    margin-top: 11px;
  }

  .update {
    ${updateStyle}
    margin-top: 9px;
  }
`;

const infoItemStyle = css`
  margin-top: 2px;
  margin-right: 4px;
  &:last-child {
    margin-right: 0;
  }
  &:last-child::after {
    content: '';
    margin-right: 0;
  }
  &::after {
    content: '·';
    margin-left: 4px;
  }
`;

export default ThumbNailBox;
