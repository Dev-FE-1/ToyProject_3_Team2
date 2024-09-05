import { useEffect, useState } from 'react';

import { css } from '@emotion/react';
import { RiAddLargeLine } from 'react-icons/ri';
import { useParams, useNavigate } from 'react-router-dom';

import { getUserPlaylists } from '@/api/endpoints/playlist';
import { getUserData } from '@/api/endpoints/user';
import IconButton from '@/components/common/buttons/IconButton';
import Spinner from '@/components/common/Spinner';
import Toast from '@/components/common/Toast';
import MyPlaylists from '@/components/mypage/MyPlaylists';
import MyProfile from '@/components/mypage/MyProfile';
import { PATH } from '@/constants/path';
import { PlaylistModel } from '@/types/playlist';
import { UserModel } from '@/types/user';

const MyPage = () => {
  const navigate = useNavigate();
  const [playlists, setPlaylists] = useState<PlaylistModel[]>([]);
  const [userData, setUserData] = useState<UserModel | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { userId } = useParams<{ userId?: string }>();
  const [isAdmin, setIsAdmin] = useState(false);
  const [sessionUserId, setSessionUserId] = useState('');
  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        setIsLoading(true);

        if (!userId) {
          throw new Error('유효한 사용자 ID가 없습니다.');
        }
        // 세션 스토리지에서 userSession 문자열을 가져와서 파싱
        const userSessionStr = sessionStorage.getItem('userSession');
        if (!userSessionStr) {
          throw new Error('세션에 유저 ID를 찾을 수 없습니다.');
        }
        const userSession = JSON.parse(userSessionStr);
        const sessionUserId = userSession.uid;
        setSessionUserId(sessionUserId);
        if (!sessionUserId) {
          throw new Error('유효한 사용자 ID가 없습니다.');
        }
        setIsAdmin(sessionUserId === userId);
        // 사용자 데이터 가져오기
        const user = await getUserData(userId);
        if (!user) {
          throw new Error('사용자 데이터를 가져오는 데 실패했습니다.');
        }
        setUserData(user);

        // 플레이리스트 데이터 가져오기
        const data = await getUserPlaylists(userId);
        setPlaylists(data);
      } catch (error) {
        setError(error instanceof Error ? error : new Error('알 수 없는 에러 발생!'));
      } finally {
        setIsLoading(false);
      }
    };
    fetchPlaylists();
  }, [userId]);

  const handleAddPlaylist = () => {
    navigate(PATH.MYPAGE_ADD_PLAYLIST);
  };
  if (isLoading) {
    return (
      <div css={spinnerStyle}>
        <Spinner />
      </div>
    );
  }
  if (error) {
    return <div>에러 발생: {error.message}</div>;
  }
  if (!userData) {
    return <div>사용자 데이터를 찾을 수 없습니다.</div>;
  }

  return (
    <>
      <div css={containerStyle}>
        <MyProfile userData={userData} />
        <MyPlaylists playlists={playlists} sessionUserId={sessionUserId} />
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
