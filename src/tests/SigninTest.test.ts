import { test, expect } from '@playwright/test';

// 온보딩 페이지 방문
test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:5173/');

  const startButton = page.locator('button:has-text("시작하기")');
  // 세션 스토리지에 값이 설정되기 전에 잠시 대기
  await page.waitForTimeout(500); // 0.5초 기다림
  if (await startButton.isVisible()) {
    await startButton.click();
  }
  await expect(page).toHaveURL('http://localhost:5173/signin'); // 온보딩 후 로그인 페이지로 이동했는지 확인
});

test('올바른 자격 증명으로 로그인 성공', async ({ page }) => {
  await page.goto('http://localhost:5173/signin');

  await page.fill('input[id="username"]', 'momtuber@example.com');
  await page.fill('input[id="password"]', 'test1234!');

  const loginButton = page.getByRole('button', { name: '로그인', exact: true });
  await loginButton.click();

  await expect(page).toHaveURL('http://localhost:5173/', { timeout: 5000 });
});

test('잘못된 자격 증명으로 로그인 실패', async ({ page }) => {
  await page.goto('http://localhost:5173/signin');

  await page.fill('input[id="username"]', 'wronguser@example.com');
  await page.fill('input[id="password"]', 'wrongpassword');

  const loginButton = page.getByRole('button', { name: '로그인', exact: true });
  await loginButton.click();

  const errorMessage = page.locator('p:has-text("이메일 주소 또는 비밀번호가 올바르지 않습니다.")');
  await expect(errorMessage).toBeVisible();
});
