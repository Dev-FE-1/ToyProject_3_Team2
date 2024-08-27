import { useState } from 'react';

import Profile from '@/components/profile/Profile';
import YouTubePlayerV3 from '@/components/YouTubePlayerV3';
import ExampleTanStackQuery from '@/ExampleTanStackQuery';
import useBearStore from '@/store/store';

const ExamplePage = () => {
  const bears = useBearStore((state) => state.bears);
  const setBear = useBearStore((state) => state.setBear);
  const [value, setValue] = useState<number>(0);

  return (
    <div>
      <div>
        <h1>주스탠드 테스트</h1>
        <h2>상태: {bears}</h2>
        <input
          type='number'
          value={value}
          onChange={(event) => {
            setValue(parseInt(event.target.value, 10));
          }}
        />
        <button onClick={() => setBear(value)}>상태 업데이트</button>
      </div>

      <div>
        <h1>텐스택쿼리 테스트</h1>
        <ExampleTanStackQuery />
      </div>
      <YouTubePlayerV3 videoId='WWHr-z6PZB0' />
      <Profile nickname='김승민32ㄴㅇㅎㅁㅇㄴㅎ' />
      <Profile
        nickname='mini'
        profileImageSrc='https://img.freepik.com/free-vector/young-man-with-blue-hair_24877-82124.jpg?t=st=1724720053~exp=1724723653~hmac=2deb5619e93e7a773e2d7f182144cc8c65fa620d252c35388c2f3ec5adac104e&w=1480'
      />
    </div>
  );
};

export default ExamplePage;
