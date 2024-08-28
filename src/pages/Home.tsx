import SelectBox from '@/components/common/SelectBox';

// SelectBox에 들어갈 내용
const items = [
  { value: '공개', label: 'public' },
  { value: '비공개', label: 'private' },
];
const items2 = [
  { value: '스포츠', label: 'sport' },
  { value: '음악', label: 'music' },
  { value: '댄스', label: 'dance' },
  { value: '먹방', label: 'mukbang' },
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
