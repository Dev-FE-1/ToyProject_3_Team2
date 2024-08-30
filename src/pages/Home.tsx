import SelectBox from '@/components/common/SelectBox';

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

const Home = () => (
  <div>
    <h1>Logo</h1>
    <p>Home</p>
    <p>selectbox 테스트</p>
    <SelectBox items={items} />
    <SelectBox items={items2} />
  </div>
);

export default Home;
