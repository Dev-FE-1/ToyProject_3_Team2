export const getVideoId = (url: string): string | null | undefined => {
  try {
    // URL 객체를 생성
    const parsedUrl = new URL(url);

    // 호스트명에 따라 분기 처리
    switch (parsedUrl.hostname) {
      case 'www.youtube.com':
      case 'youtube.com':
        // Shorts URL 처리
        if (parsedUrl.pathname.startsWith('/shorts/')) {
          return parsedUrl.pathname.split('/')[2]; // Shorts의 동영상 ID 추출
        }
        // 일반 유튜브 URL 처리
        return parsedUrl.searchParams.get('v');

      case 'youtu.be':
        // 짧은 공유 URL 처리
        return parsedUrl.pathname.substring(1);

      default:
        // 유효하지 않은 유튜브 URL일 경우
        return null;
    }
  } catch (error) {
    console.error('Invalid URL:', error);
    return null;
  }
};

// 사용 예시
// const url = 'https://www.youtube.com/watch?v=nsO1ILwGAVs';
// const videoId = getYoutubeVideoId(url);
// console.log(videoId); // 'nsO1ILwGAVs' 출력
