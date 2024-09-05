import React, { Dispatch, SetStateAction } from 'react';

import { css } from '@emotion/react';

import CommentsButton from '@/components/common/buttons/CommentsButton';
import LikesButton from '@/components/common/buttons/LikesButton';
import Profile from '@/components/profile/Profile';
import { useLikeManagement } from '@/hooks/useLike';
import theme from '@/styles/theme';
import { PlaylistModel } from '@/types/playlist';
import { UserModel } from '@/types/user';
import { formatTimeWithUpdated } from '@/utils/formatDate';
import { getUserIdBySession } from '@/utils/user';

interface ThumBoxDetailProps {
  playlist: PlaylistModel;
  user: UserModel;
  onClickProfile?: () => void;
  setRefreshTrigger: Dispatch<SetStateAction<string>>;
}

const ThumBoxDetail: React.FC<ThumBoxDetailProps> = ({
  playlist,
  user,
  onClickProfile,
  setRefreshTrigger,
}) => {
  const {
    playlistId,
    title,
    description,
    updatedAt,
    videoCount,
    forkCount,
    // likeCount,
    commentCount,
    thumbnailUrl,
    isPublic,
  } = playlist;

  const { profileImg, userName } = user;
  const userId = getUserIdBySession();

  const { likeCount, isLiked, handleLikeToggle } = useLikeManagement(playlistId, userId);

  return (
    <div>
      <img src={thumbnailUrl} alt='Thumbnail' css={thumbnailStyle} />
      <h2 css={titleStyle}>{title}</h2>
      <div css={profileRowStyle}>
        <Profile profileImageSrc={profileImg} userName={userName} onClick={onClickProfile} />
        <div css={actionButtonsStyle}>
          <CommentsButton playListId={playlistId} commentCount={commentCount} />
          <div css={dividerStyle} />
          <LikesButton
            playlistId={playlistId}
            likeCount={likeCount}
            isLiked={isLiked}
            handleLikeToggle={handleLikeToggle}
          />
        </div>
      </div>
      <div css={statsRowStyle}>
        <span css={statsStyle}>동영상 {videoCount}개</span>
        <span css={statsStyle}>포크 {forkCount}회</span>

        {/* 여긴 뭘까??????????????///// */}
        {userId === userId ? (
          <span css={statsStyle}>{isPublic ? '' : '비공개'}</span>
        ) : (
          <span css={statsStyle}>{formatTimeWithUpdated(updatedAt)} 업데이트</span>
        )}
      </div>
      <p css={subtitleStyle}>{description}</p>
    </div>
  );
};

const thumbnailStyle = css`
  width: 100%;
  height: 343px;
  object-fit: cover;
  border-radius: 4px;
`;

const titleStyle = css`
  margin-top: 15px;
  margin-left: 16px;
  margin-right: 26px;
  height: 21px;
  font-size: ${theme.fontSizes.xlarge};
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.27px;
  color: ${theme.colors.white};
`;

const profileRowStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const actionButtonsStyle = css`
  display: flex;
  margin-right: 16px;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: ${theme.heights.short};
  background-color: ${theme.colors.tertiary};
  border-radius: 22px;
  font-size: ${theme.fontSizes.normal};
  color: ${theme.colors.white};
  overflow: hidden;
`;

const dividerStyle = css`
  width: 1px;
  height: 23px;
  background-color: ${theme.colors.white};
  opacity: 0.3;
`;

const statsRowStyle = css`
  margin-left: 16px;
  height: 17px;
  display: flex;
  font-size: ${theme.fontSizes.normal};
  color: ${theme.colors.white};
`;

const statsStyle = css`
  margin-right: 10px;
`;

const subtitleStyle = css`
  font-size: ${theme.fontSizes.normal};
  color: ${theme.colors.white};
  margin: 1rem;
`;

export default ThumBoxDetail;
