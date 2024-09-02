import axios from 'axios';

// youtube API Axios 인스턴스
export const fetchYoutubeData = axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3',
  params: {
    key: import.meta.env.VITE_YOUTUBE_API_KEY,
  },
});
