export const getVideoId = (url: string): string | null | undefined => {
  try {
    // URL 객체를 생성
    const parsedUrl = new URL(url);
    // URLSearchParams 객체를 통해 쿼리 파라미터를 가져옴
    if (parsedUrl.hostname === 'www.youtube.com' || parsedUrl.hostname === 'youtube.com') {
      return parsedUrl.searchParams.get('v'); // 쿼리 파라미터 'v'에서 추출
    }

    // 유튜브 공유하기 URL (예: https://youtu.be/VVbZnhQM0lU)
    if (parsedUrl.hostname === 'youtu.be') {
      return parsedUrl.pathname.substring(1); // 경로에서 동영상 ID 추출 (첫 '/' 제거)
    }

    // 유효하지 않은 유튜브 URL일 경우
    return null;
  } catch (error) {
    console.error('Invalid URL:', error);
    return null;
  }
};

// 사용 예시
// const url = 'https://www.youtube.com/watch?v=nsO1ILwGAVs';
// const videoId = getYoutubeVideoId(url);
// console.log(videoId); // 'nsO1ILwGAVs' 출력
