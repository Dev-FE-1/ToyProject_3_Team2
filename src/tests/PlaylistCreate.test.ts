import { test, expect } from '@playwright/test';

test('사용자가 로그인 후 나만의 플리를 생성', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  //온보딩
  const startButton = page.locator('button:has-text("시작하기")');
  await expect(startButton).toBeVisible();
  await startButton.click();

  await expect(page).toHaveURL('http://localhost:5173/signin');

  await page.goto('http://localhost:5173/signin');

  await page.fill('input[id="username"]', 'dyeong@bomvi.com');
  await page.fill('input[id="password"]', 'test1234!');

  const loginButton = page.getByRole('button', { name: '로그인', exact: true });
  await loginButton.click();
  await page.evaluate(() => {
    sessionStorage.setItem('onboarding', 'true');
  });
  await expect(page).toHaveURL('http://localhost:5173/');
  await page.click('text=나');

  await expect(page).toHaveURL('http://localhost:5173/mypage/j07TuYHzRMWy63zd9txuioy0VrE3');

  const playlistCreateButton = page.locator(
    'button.css-9j0n2e-iconButtonStyle-floatAddButtonStyle-IconButton'
  );
  await playlistCreateButton.click();

  await expect(page.locator('input[name="title"]')).toBeVisible();

  await page.fill('input[name="title"]', '새로운 테스트 플레이리스트');

  const switchButton = page.getByRole('switch');
  await switchButton.click();

  const comboboxButton = page.getByRole('combobox');
  await comboboxButton.click();
  const movieOption = page.locator('span:has-text("영화")'); // 드롭다운 항목 중 '영화' 선택
  await movieOption.click();
  await expect(comboboxButton).toHaveText('영화');

  await page.fill('textarea', '새로운 테스트 플레이리스트');

  const createButton = page.locator('text=만들기');
  await createButton.click();

  await expect(page).toHaveURL('http://localhost:5173/mypage/j07TuYHzRMWy63zd9txuioy0VrE3');
  const toastMessage = page.locator('text=플레이리스트가 추가되었습니다');
  await expect(toastMessage).toBeVisible();
});
