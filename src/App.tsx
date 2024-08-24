import { useState } from 'react';

import useBearStore from '@/store/store';

const App = () => {
  const bears = useBearStore((state) => state.bears);
  const setBear = useBearStore((state) => state.setBear);

  const [value, setValue] = useState<number>(0);

  return (
    <div>
      <h3>주스탠드 상태: {bears}</h3>

      <input
        type='number'
        value={value}
        onChange={(event) => {
          setValue(parseInt(event.target.value, 10));
        }}
      />
      <button onClick={() => setBear(value)}>주스탠드 상태업데이트</button>
    </div>
  );
};

export default App;
