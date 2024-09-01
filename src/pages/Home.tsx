import CustomDialog from '@/components/common/modals/Dialog';
import SelectBox from '@/components/common/SelectBox';
import { useAuthStatus } from '@/hooks/useAuthStaus';
// SelectBox에 들어갈 내용
const items = [
  { value: 'public', label: '공개' },
  { value: 'private', label: '비공개' },
];
const items2 = [
  { value: 'sport', label: '스포츠' },
  { value: 'music', label: '음악' },
  { value: 'dance', label: '춤' },
  { value: 'mukbang', label: '먹방' },
];
const Home = () => {
  const { isLoggedIn, userEmail } = useAuthStatus();
  const handle = () => {
    console.log('hi');
  };
  return (
    <div>
      <h1>Logo</h1>
      <p>Home</p>
      <p>selectbox 테스트</p>
      <SelectBox items={items} />
      <SelectBox items={items2} />
      <CustomDialog type='videoimageLink' isOpen={true} onClose={handle} />
      <div>
        <h2>인증 상태</h2>
        <p>로그인 상태: {isLoggedIn ? '로그인됨' : '로그인되지 않음'}</p>
        <p>사용자 이메일: {userEmail || '없음'}</p>
      </div>
    </div>
  );
};

export default Home;
