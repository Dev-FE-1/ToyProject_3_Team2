import LikesAndComments from '@/components/common/LikesAndComments';

interface PlaylistItemProps {
  playListId: number;
  initialLikeCount: number;
  commentCount: number;
}

const Home = () => {
  const playlists: PlaylistItemProps[] = [
    { playListId: 123, initialLikeCount: 234, commentCount: 233 },
    { playListId: 124, initialLikeCount: 100, commentCount: 150 },
    { playListId: 125, initialLikeCount: 50, commentCount: 75 },
  ];

  return (
    <div>
      <h1>Logo</h1>
      <p>Home</p>
      {playlists.map((playlist) => (
        <LikesAndComments
          key={playlist.playListId}
          playListId={playlist.playListId}
          commentCount={playlist.commentCount}
          initialLikeCount={playlist.initialLikeCount}
        />
      ))}
    </div>
  );
};

export default Home;
