import axios from 'axios';

import { BASE_URL } from '@/constants/api';

// youtube API Axios 인스턴스
export const fetchYoutubeData = axios.create({
  baseURL: BASE_URL.youtube,
  params: {
    key: import.meta.env.VITE_YOUTUBE_API_KEY,
  },
});
