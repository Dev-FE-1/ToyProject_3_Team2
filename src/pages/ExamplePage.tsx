import { useState } from 'react';

import StarToggleButton from '@/components/StarToggleButton';
import ExampleTanStackQuery from '@/ExampleTanStackQuery';
import { useStarStore } from '@/store/starStore';
import useBearStore from '@/store/store';

const ExamplePage = () => {
  const bears = useBearStore((state) => state.bears);
  const setBear = useBearStore((state) => state.setBear);
  const [value, setValue] = useState<number>(0);

  const isStarred = useStarStore((state) => state.isStarred);

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

      <div style={{ margin: '30px 16px' }}>
        <StarToggleButton />
      </div>
      <p>Star is {isStarred ? 'filled' : 'empty'}</p>
    </div>
  );
};

export default ExamplePage;
