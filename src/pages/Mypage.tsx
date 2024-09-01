import { useEffect, useState } from 'react';

import { css } from '@emotion/react';
import { RiAddLargeLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

import { getAllPlaylists } from '@/api/playlist';
import IconButton from '@/components/common/buttons/IconButton';
import Toast from '@/components/common/Toast';
import MyPlaylists from '@/components/mypage/MyPlaylists';
import MyProfile from '@/components/mypage/MyProfile';
import { PATH } from '@/constants/path';
import { PlaylistModel } from '@/types/playlist';

const MyPage = () => {
  const navigate = useNavigate();
  const [playlists, setPlaylists] = useState<PlaylistModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        setIsLoading(true);
        const data = await getAllPlaylists();
        setPlaylists(data);
      } catch (error) {
        setError(error instanceof Error ? error : new Error('알 수 없는 에러 발생!'));
      } finally {
        setIsLoading(false);
      }
    };
    fetchPlaylists();
  }, []);
  const handleAddPlaylist = () => {
    navigate(`${PATH.MYPAGE}/${PATH.MYPAGE_ADD_PLAYLIST}`);
  };

  return (
    <>
      <div css={containerStyle}>
        <MyProfile />
        <MyPlaylists playlists={playlists} />
        <IconButton
          Icon={RiAddLargeLine}
          customStyle={floatAddButtonStyle}
          onClick={handleAddPlaylist}
        />
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
const floatAddButtonStyle = css`
  position: absolute;
  right: 1.5rem;
  top: calc(100vh - 150px);
  z-index: 100;
  transition: all 0.3s ease;
  &:hover {
    transform: translateY(-2px);
  }
`;
export default MyPage;
