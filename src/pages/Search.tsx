import { useEffect, useState } from 'react';

import { css } from '@emotion/react';
import axios from 'axios';

import { getAllPlaylists, Playlist } from '@/api/playlist';
import ThumBox from '@/components/common/ThumBox';
import theme from '@/styles/theme';

const Search = () => {
  const [playlists, setPlaylists] = useState<Playlist[] | null>([]);

  useEffect(() => {
    // const fetchPlaylists = async () => {
    //   const fetchedPlaylists = await getAllPlaylists();
    //   setPlaylists(fetchedPlaylists);
    // };

    // fetchPlaylists();

    const fetchPlaylists = async () => {
      const response = await axios.get('/src/mock/playlists.json');
      setPlaylists(response.data);
    };

    fetchPlaylists();
  }, []);

  console.log(playlists);

  return (
    <div>
      <input type='text' />
      {playlists &&
        playlists.map((playlist) => (
          <ThumBox
            key={playlist.playlistId}
            type='details'
            thumURL={playlist.thumbnailUrl}
            title={playlist.title}
            subtitle={playlist.description}
            likes={playlist.likeCount}
            comments={playlist.commentCount}
            uploader={playlist.username}
            update='2일 전에 업데이드 됨'
            listnum='3'
          />
        ))}
    </div>
  );
};

const containerStyle = css`
  display: flex;
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

export default Search;
