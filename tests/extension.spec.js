const { test, expect, chromium } = require('@playwright/test');
const path = require('path');

const extensionPath = path.resolve(__dirname, '..');

test('popup loads with required UI elements', async () => {
  const context = await chromium.launchPersistentContext('', {
    headless: false,
    args: [
      `--disable-extensions-except=${extensionPath}`,
      `--load-extension=${extensionPath}`,
      '--no-sandbox',
      '--disable-dev-shm-usage',
    ],
  });

  // Wait for service worker to register
  let [background] = context.serviceWorkers();
  if (!background) {
    background = await context.waitForEvent('serviceworker', { timeout: 10000 });
  }
  const extensionId = background.url().split('/')[2];

  const page = await context.newPage();
  await page.goto(`chrome-extension://${extensionId}/popup.html`);

  await expect(page.locator('#count')).toBeVisible();
  await expect(page.locator('#btnCapture')).toBeVisible();
  await expect(page.locator('#btnDownload')).toBeVisible();
  await expect(page.locator('#btnClear')).toBeVisible();
  await expect(page.locator('#prefix')).toBeVisible();

  await context.close();
});
