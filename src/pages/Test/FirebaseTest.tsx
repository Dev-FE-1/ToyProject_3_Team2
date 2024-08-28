// import React, { useEffect, useState } from 'react';

// import { fetchCollection } from '@/firebase/firebaseService';

// interface User {
//   id: string;
//   username: string;
//   email: string;
//   profileImg: string;
// }

// export const UserList: React.FC = () => {
//   const [users, setUsers] = useState<User[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const loadUsers = async () => {
//       try {
//         const userData = await fetchCollection('users');
//         // fetchCollection()의 타입은 DocumentData[]
//         // 타입 오류 해결의 가장 쉬운 방법은 타입 단언: setUsers(userData as User[]);
//         // 아래 방법은 반환된 값 중 필요한 속성만 추출하여 User 객체를 명시적으로 생성 (데이터 매핑)
//         setUsers(
//           userData.map((doc) => ({
//             id: doc.id,
//             username: doc.username,
//             email: doc.email,
//             profileImg: doc.profileImg,
//           }))
//         );
//         setLoading(false);
//       } catch (err) {
//         setError('Failed to fetch users');
//         setLoading(false);
//       }
//     };

//     loadUsers();
//   }, []);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div>
//       <h2>User List</h2>
//       <ul>
//         {users.map((user) => (
//           <li key={user.id}>
//             <img src={user.profileImg} alt={user.username} width='50' height='50' />
//             {user.username} ({user.email})
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };
import React, { useEffect, useState } from 'react';

// import { useQuery } from '@tanstack/react-query';

import { getPlaylists, getUserById, User, Playlist } from '@/firebase/firebaseService';

const FirebaseTest: React.FC = () => {
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  useEffect(() => {
    const fetchPlaylists = async () => {
      const fetchedPlaylists = await getPlaylists();
      setPlaylists(fetchedPlaylists);
    };

    fetchPlaylists();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      const fetchedUserInfo = await getUserById('user1');
      setUserInfo(fetchedUserInfo);
    };

    fetchUsers();
  }, []);
  ///////// 아래부분은 TanStack Query를 사용할 시
  // const {
  //   data: userInfo,
  //   error,
  //   isLoading,
  // } = useQuery<User | null, Error>(
  //   ['user', 'user1'], // 쿼리 키: user와 userId로 구성
  //   () => getUserById('user1') // 쿼리 함수: userId를 전달하여 사용자 정보 가져오기
  // );

  // if (isLoading) {
  //   return <div>Loading user...</div>;
  // }

  // if (error) {
  //   return <div>{error.message}</div>;
  // }

  // if (!userInfo) {
  //   return <div>No user found.</div>;
  // }

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
      {userInfo && (
        <div>
          <h2>이름: {userInfo?.username}</h2>
          <h2>플리 개수: {userInfo?.playlistCount}</h2>
          <h2>총 좋아요수: {userInfo?.totalLikes}</h2>
        </div>
      )}
      {playlists?.map((playlist: Playlist) => (
        <div
          key={playlist.id}
          style={{
            width: '200px',
            backgroundColor: '#e0f0ff',
            borderRadius: '10px',
            padding: '10px',
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
          }}
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
            동영상 {playlist.videoCount}개
          </p>
        </div>
      ))}
    </div>
  );
};

export default FirebaseTest;
