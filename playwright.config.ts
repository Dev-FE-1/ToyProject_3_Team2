import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  // 테스트가 위치한 디렉토리 설정
  testDir: './src/tests',

  // 테스트가 실패했을 때 재시도 횟수 설정
  retries: 0, // 재시도 없이 한 번만 실행

  // 각 테스트의 타임아웃 시간 설정 (use 블록 밖에서 설정해야 함)
  timeout: 30000, // 각 테스트가 30초 내에 완료되지 않으면 실패

  // Playwright의 전역 설정
  use: {
    // Chrome 브라우저를 채널로 사용 (브라우저 선택)
    channel: 'chrome',

    // 테스트가 실행될 기본 URL 설정 (테스트 대상 애플리케이션)
    baseURL: 'http://localhost:5173',

    // CI 환경에서 headless 모드로 실행
    headless: !!process.env.CI, // CI 환경이면 headless 모드 (브라우저 UI 없이 실행)

    // 테스트가 실패했을 때만 스크린샷을 찍음
    screenshot: 'only-on-failure',

    // 실패한 경우만 비디오 기록
    video: 'retain-on-failure',
  },
};

export default config;
