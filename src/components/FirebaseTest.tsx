import React, { useEffect, useState } from 'react';

import { fetchCollection } from '@/server/firestoreService';

interface User {
  id: string;
  username: string;
  email: string;
  profileImg: string;
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const userData = await fetchCollection('users');
        // fetchCollection()의 타입은 DocumentData[]
        // 타입 오류 해결의 가장 쉬운 방법은 타입 단언: setUsers(userData as User[]);
        // 아래 방법은 반환된 값 중 필요한 속성만 추출하여 User 객체를 명시적으로 생성 (데이터 매핑)
        setUsers(
          userData.map((doc) => ({
            id: doc.id,
            username: doc.username,
            email: doc.email,
            profileImg: doc.profileImg,
          }))
        );
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch users');
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <img src={user.profileImg} alt={user.username} width='50' height='50' />
            {user.username} ({user.email})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
