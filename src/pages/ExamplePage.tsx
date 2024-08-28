import { useEffect, useState } from 'react';

import Button from '@/components/common/buttons/Button';
import ThumBox from '@/components/common/ThumBox';
import Toast from '@/components/common/Toast';
import VideoCard from '@/components/common/VideoCard';
import StarToggleButton from '@/components/playlist/StarToggleButton';
import Profile from '@/components/profile/Profile';
import YouTubePlayerV3 from '@/components/YouTubePlayerV3';
import ExampleTanStackQuery from '@/ExampleTanStackQuery';
import useBearStore from '@/store/store';
import useToastStore from '@/store/useToastStore'; // zustand 상태관리 ✅
import useToggleStore from '@/store/useToggleStore';

const ExamplePage = () => {
  const bears = useBearStore((state) => state.bears);
  const setBear = useBearStore((state) => state.setBear);
  const [value, setValue] = useState<number>(0);
  const [url, setUrl] = useState('');
  const [videoId, setVideoId] = useState<string | null>('');

  const isToggled = useToggleStore((state) => state.isToggled);
  const showToast = useToastStore((state) => state.showToast);

  const getYoutubeVideoId = (url: string) => {
    const videoId = getYoutubeVideoId(url);
    setVideoId(videoId);
    setUrl('');
  };
  // 일반 버튼
  const handleButtonClick = () => {
    console.log('Button clicked!');
    showToast('Button clicked!'); // ✅
  };

  useEffect(() => {
    if (isToggled) {
      showToast('내 재생목록에 저장되었습니다.');
    }
  }, [isToggled, showToast]);
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
      <div>
        <h1>유튜브 API 테스트</h1>
        <input type='text' value={url} onChange={(e) => setUrl(e.target.value)} />
        <button onClick={() => getYoutubeVideoId(url)}>업로드</button>
        <YouTubePlayerV3 videoId={videoId} />
      </div>
      <div>
        <Profile nickname='김승민32ㄴㅇㅎㅁㅇㄴㅎ' />
        <Profile
          nickname='mini'
          profileImageSrc='https://img.freepik.com/free-vector/young-man-with-blue-hair_24877-82124.jpg?t=st=1724720053~exp=1724723653~hmac=2deb5619e93e7a773e2d7f182144cc8c65fa620d252c35388c2f3ec5adac104e&w=1480'
        />
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
        <VideoCard
          type='main'
          thumbURL='https://goodsisgood.com/wp-content/uploads/2024/02/mindaday1.jpg'
          time='3:45'
        />
        <VideoCard
          type='underbar'
          width='100px'
          height='50px'
          thumbURL='https://goodsisgood.com/wp-content/uploads/2024/02/mindaday1.jpg'
        />
      </div>

      <div>
        <StarToggleButton />
        <Button onClick={handleButtonClick}>Click me!</Button>
      </div>
      <Toast />
    </div>
  );
};

export default ExamplePage;
