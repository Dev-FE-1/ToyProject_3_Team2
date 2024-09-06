import { useEffect, useState } from 'react';

import Button from '@/components/common/buttons/Button';
import ThumBox from '@/components/common/ThumBox';
import Toast from '@/components/common/Toast';
import VideoCard from '@/components/common/VideoCard';
import MyPlaylists from '@/components/page/mypage/MyPlaylists';
import StarToggleButton from '@/components/page/playlist/StarToggleButton';
import Profile from '@/components/page/profile/Profile';
import SubsToggleButton from '@/components/page/subscriptions/SubsToggleButton';
import YouTubePlayerV3 from '@/components/YouTubePlayerV3';
import ExampleTanStackQuery from '@/ExampleTanStackQuery';
import useBearStore from '@/store/store';
import useToastStore from '@/store/useToastStore'; // zustand 상태관리 ✅
import useToggleStore from '@/store/useToggleStore';
import { getVideoId } from '@/utils/getVideoId';

const ExamplePage = () => {
  const bears = useBearStore((state) => state.bears);
  const setBear = useBearStore((state) => state.setBear);
  const [value, setValue] = useState<number>(0);
  const [url, setUrl] = useState('');
  const [videoId, setVideoId] = useState<string | null>('');

  const isToggled = useToggleStore((state) => state.isToggled);
  const showToast = useToastStore((state) => state.showToast);

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
        <h1>유튜브 API 테스트</h1>
        <input type='text' value={url} onChange={(e) => setUrl(e.target.value)} />
        {/* <button onClick={() => getYoutubeVideoId(url)}>업로드</button> */}
        <YouTubePlayerV3 videoId={videoId} />
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
