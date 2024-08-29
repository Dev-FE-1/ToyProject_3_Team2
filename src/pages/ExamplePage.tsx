import { useState } from 'react';

import FirebaseTest from '@/components/FirebaseTest';
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
        <h1 style={{ backgroundColor: 'yellow', color: 'black', fontSize: '32px' }}>
          주스탠드 테스트
        </h1>
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
        <h1 style={{ backgroundColor: 'yellow', color: 'black', fontSize: '32px' }}>
          텐스택쿼리 테스트
        </h1>
        <ExampleTanStackQuery />
      </div>

      <div>
        <h1 style={{ backgroundColor: 'yellow', color: 'black', fontSize: '32px' }}>
          유튜브 API V3 테스트
        </h1>
        <YouTubePlayerV3 videoId='7MVs26bOwUM' />
      </div>
      <div>
        <h1 style={{ backgroundColor: 'yellow', color: 'black', fontSize: '32px' }}>
          파이어베이스 테스트
        </h1>
        <FirebaseTest />
      </div>
    </div>
  );
};

export default ExamplePage;
