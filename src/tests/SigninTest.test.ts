import { test, expect } from '@playwright/test';

test('사용자가 온보딩을 거쳐 로그인 페이지에 도착하는지 확인', async ({ page }) => {
  await page.goto('http://localhost:5173/');

  const startButton = page.locator('button:has-text("시작하기")');
  await expect(startButton).toBeVisible();
  await startButton.click();

  await expect(page).toHaveURL('http://localhost:5173/signin');
});

test('올바른 자격 증명으로 로그인 성공', async ({ page }) => {
  await page.goto('http://localhost:5173/signin');

  await page.fill('input[id="username"]', 'momtuber@example.com');
  await page.fill('input[id="password"]', 'test1234!');

  const loginButton = page.getByRole('button', { name: '로그인', exact: true });
  await loginButton.click();
  await page.evaluate(() => {
    sessionStorage.setItem('onboarding', 'true');
  });
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
