export const CATEGORY_OPTIONS = [
  { value: 'lecture', label: '강의' },
  { value: 'animal', label: '동물' },
  { value: 'life', label: '라이프' },
  { value: 'travel', label: '여행' },
  { value: 'movie', label: '영화' },
  { value: 'entertainment', label: '엔터테인먼트' },
  { value: 'music', label: '음악' },
  { value: 'kids', label: '키즈' },
];

export const INITIAL_FORM_STATE = {
  title: '',
  description: '',
  category: '',
  createdAt: '',
  updatedAt: '',
  likeCount: 0,
  forkCount: 0,
  commentCount: 0,
  videoCount: 0,
  thumbnailUrl: '',
  isPublic: false,
  videos: [],
};

export const PLAYLIST = {
  categories: ['전체', '키즈', '음악', '라이프', '영화', '엔터', '동물', '강의', '여행'],
  search: {
    placeholder: '검색어를 입력해주세요',
  },
};
