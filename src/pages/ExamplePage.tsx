import { useState } from 'react';

import ThumBox from '@/components/common/ThumBox';
// import YouTubePlayerV3 from '@/components/YouTubePlayerV3';
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
      {/* <YouTubePlayerV3 videoId='WWHr-z6PZB0' /> */}
      <ThumBox
        type='main1'
        thumURL='https://goodsisgood.com/wp-content/uploads/2024/02/mindaday1.jpg'
        title='개쩌는 플레이리스트 볼사람'
        likes={100}
        uploader='김아무개'
        listnum='8'
      />
      <ThumBox
        type='main2'
        thumURL='https://goodsisgood.com/wp-content/uploads/2024/02/mindaday1.jpg'
        title='개쩌는 플레이리스트 볼사람'
        likes={100}
        uploader='김아무개'
        update='2개월전'
        listnum='5'
      />
      <ThumBox
        type='details'
        thumURL='https://goodsisgood.com/wp-content/uploads/2024/02/mindaday1.jpg'
        title='개쩌는 플레이리스트 볼사람'
        subtitle='이 영상은 영국에서 전해져 내려오는 영상으로 어쩌구 저쩌구 오늘 하루 좋은 하루 되세용이 영상은 영국에서 전해져 내려오는 영상으로 드덱 되면 어쩌구 저쩌구 오늘 하루 좋은 하루 되세용이 영상은 영국에서 전해져 내려오는 영상으로 드덱 되면 어쩌구 저쩌구 오늘 하루 좋은 하루 되세용'
        likes={100}
        comments={5}
        uploader='김아무개'
        update='2일 전에 업데이드 됨'
        listnum='3'
      />
    </div>
  );
};

export default ExamplePage;
