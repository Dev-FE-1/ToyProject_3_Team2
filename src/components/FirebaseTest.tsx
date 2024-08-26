import React, { useEffect } from 'react';

import { collection, getDocs } from 'firebase/firestore';

import { db, auth } from '@/server/firebase';

const MyComponent: React.FC = () => {
  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, 'users'));
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
      });
    };

    fetchData();
  }, []);

  return <div>My Component</div>;
};

export default MyComponent;
