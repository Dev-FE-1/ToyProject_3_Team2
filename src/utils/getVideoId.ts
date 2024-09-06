export const getVideoId = (url: string): string | null | undefined => {
  // URL 객체를 생성
  const parsedUrl = new URL(url);
  // URLSearchParams 객체를 통해 쿼리 파라미터를 가져옴
  const videoId = parsedUrl.searchParams.get('v');

  // videoId가 있으면 반환, 없으면 null 반환
  // 이는 API 호출 단계에서 처리 예정
  return videoId;
};

// 사용 예시
// const url = 'https://www.youtube.com/watch?v=nsO1ILwGAVs';
// const videoId = getYoutubeVideoId(url);
// console.log(videoId); // 'nsO1ILwGAVs' 출력
