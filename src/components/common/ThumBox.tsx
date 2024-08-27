import React from 'react';

import { css } from '@emotion/react';
import { GoVideo } from 'react-icons/go';

import Badge from '@/components/common/Badge';
import theme from '@/styles/theme';

interface ThumBoxProps {
  onClick?: () => void;
  thumURL?: string;
  title?: string;
  subtitle?: string;
  update?: string;
  uploader?: string;
  likes?: number;
  comments?: number;
  listnum?: string;
  type: 'main1' | 'main2' | 'details';
}

const ThumBox: React.FC<ThumBoxProps> = ({
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
  const mainStyle = css`
    cursor: pointer;
    margin: 1rem;
  `;

  const ellipsisStyle = css`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  `;

  const thumbnailStyle = css`
    position: relative;
    background-image: url(${thumURL});
    background-size: cover;
    background-position: center;
    border-radius: 4px;
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

    .thumbnail {
      ${thumbnailStyle}
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
      ${thumbnailStyle}
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
      ${thumbnailStyle}
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
    margin-right: 10px;
    &:last-child {
      margin-right: 0;
    }
  `;

  const renderContent = () => {
    switch (type) {
      case 'main1':
        return (
          <div css={[mainStyle, main1Style]} onClick={onClick}>
            <div className='thumbnail'>
              <Badge text='동영상' position='corner' suffix='개'>
                {listnum}
              </Badge>
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
            <div className='thumbnail'>
              <Badge Icon={GoVideo} position='corner' suffix='개'>
                {listnum}
              </Badge>
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
            <div className='thumbnail'>
              <Badge text='동영상' position='corner' suffix='개'>
                {listnum}
              </Badge>
            </div>
            <div className='content'>
              <div className='title'>{title}</div>
              <div className='subtitle'>{subtitle}</div>
              <div className='info'>
                <span css={infoItemStyle}>{uploader}</span>
                <span css={infoItemStyle}>좋아요 {likes}</span>
                <span css={infoItemStyle}>댓글 {comments}</span>
              </div>
              <div className='update'>{update}</div>
            </div>
          </div>
        );
    }
  };

  return renderContent();
};

export default ThumBox;
