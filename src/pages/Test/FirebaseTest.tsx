import React, { useEffect, useState } from 'react';

import { getPlaylists, Playlist } from '@/api/playlist';
import { getUserData, User } from '@/api/user';

interface Video {
  videoId: string;
  videoUrl: string;
  title: string;
  thumbnailUrl: string;
  duration: number;
}

const FirebaseTest: React.FC = () => {
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(null);

  useEffect(() => {
    const fetchPlaylists = async () => {
      const fetchedPlaylists = await getPlaylists();
      setPlaylists(fetchedPlaylists);
    };

    const fetchUsers = async () => {
      const fetchedUserInfo = await getUserData('user101');
      setUserInfo(fetchedUserInfo);
    };

    fetchPlaylists();
    fetchUsers();
  }, []);

  const handlePlaylistClick = (playlist: Playlist) => {
    setSelectedPlaylist(playlist);
    console.log('클릭됐다!!!!!!');
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div>
      {userInfo && (
        <div
          style={{
            marginBottom: '20px',
            padding: '10px',
            backgroundColor: '#333',
            borderRadius: '5px',
          }}
        >
          <h2>이름: {userInfo.username}</h2>
          <p>이메일: {userInfo.email}</p>
          <p>플레이리스트 수: {userInfo.playlistCount}</p>
          <p>총 좋아요 수: {userInfo.totalLikes}</p>
          <p>총 포크 수: {userInfo.totalForks}</p>
          <img
            src={userInfo.profileImg}
            alt={userInfo.username}
            style={{ width: '100px', height: '100px', borderRadius: '50%' }}
          />
        </div>
      )}

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {playlists.map((playlist: Playlist) => (
          <div
            key={playlist.playlistId}
            style={{
              width: '200px',
              backgroundColor: '#e0f0ff',
              borderRadius: '10px',
              padding: '10px',
              boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
              cursor: 'pointer',
            }}
            onClick={() => handlePlaylistClick(playlist)}
          >
            {playlist.thumbnailUrl && (
              <img
                src={playlist.thumbnailUrl}
                alt={playlist.title}
                style={{
                  width: '100%',
                  height: '150px',
                  objectFit: 'cover',
                  borderRadius: '5px',
                }}
              />
            )}
            <h3 style={{ margin: '10px 0 5px' }}>{playlist.title}</h3>
            <p style={{ fontSize: '0.9em', color: '#666' }}>{playlist.description}</p>
            <p style={{ fontSize: '0.8em', color: '#888', marginTop: '5px' }}>
              동영상 {playlist.videoCount}개 | 좋아요 {playlist.likeCount} | 댓글{' '}
              {playlist.commentCount}
            </p>
          </div>
        ))}
      </div>

      {selectedPlaylist && (
        <div
          style={{
            marginTop: '30px',
            padding: '20px',
            backgroundColor: '#333',
            borderRadius: '10px',
          }}
        >
          <h2>{selectedPlaylist.title} - 비디오 목록</h2>
          {selectedPlaylist.videos.map((video: Video) => (
            <div
              key={video.videoId}
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '10px',
                padding: '10px',
                backgroundColor: '#333',
                borderRadius: '5px',
              }}
            >
              <img
                src={video.thumbnailUrl}
                alt={video.title}
                style={{ width: '120px', height: '67px', marginRight: '10px' }}
              />
              <div>
                <h4 style={{ margin: '0 0 5px' }}>
                  <a href={video.videoUrl} target='_blank' rel='noopener noreferrer'>
                    {video.title}
                  </a>
                </h4>
                <p style={{ fontSize: '0.8em', color: '#888' }}>
                  재생 시간: {formatDuration(video.duration)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FirebaseTest;
