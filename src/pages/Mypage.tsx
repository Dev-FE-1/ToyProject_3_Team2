import { useEffect, useState } from 'react';

import { css } from '@emotion/react';
import { RiAddLargeLine } from 'react-icons/ri';
import { useParams, useNavigate } from 'react-router-dom';

import { getUserPlaylists } from '@/api/endpoints/playlist';
import { getUserData } from '@/api/endpoints/user';
import IconButton from '@/components/common/buttons/IconButton';
import Spinner from '@/components/common/Spinner';
import Toast from '@/components/common/Toast';
import MyPlaylists from '@/components/page/mypage/MyPlaylists';
import MyProfile from '@/components/page/mypage/MyProfile';
import { PATH } from '@/constants/path';
import { useUserPlaylists } from '@/hooks/queries/usePlaylistQueries';
import { useUserData } from '@/hooks/queries/useUserQueries';
import { PlaylistModel } from '@/types/playlist';
import { UserModel } from '@/types/user';
import { getUserIdBySession } from '@/utils/user';

const MyPage = () => {
  const navigate = useNavigate();
  const {
    data: userData,
    isLoading: isUserLoading,
    error: userError,
    refetch: refetchUserData,
  } = useUserData();
  const {
    data: playlists,
    isLoading: isPlaylistsLoading,
    error: playlistsError,
    refetch: refetchPlaylists,
  } = useUserPlaylists();

  useEffect(() => {
    refetchUserData();
    refetchPlaylists();
  }, [refetchUserData, refetchPlaylists]);

  const sessionUserId = getUserIdBySession();
  const isAdmin = userData?.userId === sessionUserId;

  const handleAddPlaylist = () => {
    navigate(PATH.MYPAGE_ADD_PLAYLIST);
  };

  if (isUserLoading || isPlaylistsLoading) {
    return (
      <div css={spinnerStyle}>
        <Spinner />
      </div>
    );
  }

  if (userError || playlistsError) {
    return <div>에러 발생: {(userError || playlistsError)?.message}</div>;
  }

  if (!userData) {
    return <div>사용자 데이터를 찾을 수 없습니다.</div>;
  }

  return (
    <>
      <div css={containerStyle}>
        <MyProfile userData={userData} />
        <MyPlaylists playlists={playlists || []} />
        {isAdmin && (
          <div css={addButtonContainerStyle}>
            <IconButton
              Icon={RiAddLargeLine}
              customStyle={floatAddButtonStyle}
              onClick={handleAddPlaylist}
            />
          </div>
        )}
      </div>
      <Toast />
    </>
  );
};
const containerStyle = css`
  position: relative;
  max-width: 498px;
  padding-bottom: 80px;
`;
const addButtonContainerStyle = css`
  position: fixed;
  left: 50%;
  bottom: 96px;
  width: 100vw;
  max-width: 500px;
  height: 1px;
  transform: translateX(-50%);
`;
const floatAddButtonStyle = css`
  position: absolute;
  right: 1.5rem;
  bottom: 0;
  z-index: 100;
  transition: all 0.3s ease;
  &:hover {
    transform: translateY(-2px);
  }
`;
const spinnerStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
export default MyPage;
