import { useState } from 'react';

import YouTubePlayerV3 from '@/components/YouTubePlayerV3';
import ExampleTanStackQuery from '@/ExampleTanStackQuery';
import useBearStore from '@/store/store';
import { getVideoId } from '@/utils/getVideoId';

const ExamplePage = () => {
  const bears = useBearStore((state) => state.bears);
  const setBear = useBearStore((state) => state.setBear);
  const [value, setValue] = useState<number>(0);
  const [url, setUrl] = useState('');
  const [videoId, setVideoId] = useState<string | null>('');

  const getYoutubeVideoId = (url: string) => {
    const videoId = getVideoId(url);
    setVideoId(videoId);
    setUrl('');
  };

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
      <YouTubePlayerV3 videoId='WWHr-z6PZB0' />
    </div>
  );
};

export default ExamplePage;
