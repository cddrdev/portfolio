import { resolve } from 'node:path';
import { createServer } from 'vite';
import { expect, test } from '@playwright/test';

test('el servidor de desarrollo funciona con analytics.js bloqueado', async ({ page }, testInfo) => {
  test.setTimeout(60_000);
  const server = await createServer({
    cacheDir: resolve('.playwright-dist', `dev-cache-${testInfo.project.name}`),
    define: { 'import.meta.env.VITE_GA_MEASUREMENT_ID': JSON.stringify('G-TEST123456') },
    server: { host: '127.0.0.1', port: 0, strictPort: true, hmr: false },
    clearScreen: false,
  });
  try {
    await server.listen();
    const address = server.httpServer.address();
    if (!address || typeof address === 'string') throw new Error('Development server has no TCP address');
    let blocked = 0;
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.route('**/src/lib/analytics.js**', (route) => {
      blocked += 1;
      return route.abort('blockedbyclient');
    });
    await page.goto(`http://127.0.0.1:${address.port}`);
    await expect(page.locator('h1')).toContainText('Carlos de Diego');
    await expect.poll(() => blocked).toBeGreaterThan(0);
    await page.getByRole('button', { name: 'Switch to English' }).click();
    await expect(page.locator('.hero__role')).toHaveText('Junior full stack developer');
    await expect(page.locator('#portfolio-google-analytics')).toHaveCount(0);
    expect(errors).toEqual([]);
  } finally {
    await server.close();
  }
});
