export const CATEGORY_OPTIONS = [
  { value: '키즈', label: '키즈' },
  { value: '음악', label: '음악' },
  { value: '라이프', label: '라이프' },
  { value: '영화', label: '영화' },
  { value: '엔터', label: '엔터' },
  { value: '동물', label: '동물' },
  { value: '강의', label: '강의' },
  { value: '여행', label: '여행' },
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
    no_result: '검색 결과가 없습니다.',
  },
};
