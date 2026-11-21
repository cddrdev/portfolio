import { expect, test } from '@playwright/test';

test('un bloqueador de analítica no impide usar el portfolio', async ({ page }) => {
  let blocked = 0;
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.route(/\/assets\/analytics-[^/]+\.js(?:\?.*)?$/, (route) => {
    blocked += 1;
    return route.abort('blockedbyclient');
  });
  await page.goto('/');
  await expect(page.locator('h1')).toContainText('Carlos de Diego');
  await expect.poll(() => blocked).toBeGreaterThan(0);
  await page.getByRole('button', { name: 'Switch to English' }).click();
  await expect(page.locator('.hero__role')).toHaveText('Junior full stack developer');
  await page.getByRole('button', { name: 'Dark mode' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await expect(page.locator('#portfolio-google-analytics')).toHaveCount(0);
  await expect(page.locator('#analytics-settings')).toHaveCount(0);
  expect(errors).toEqual([]);
});

test('la política de seguridad bloquea scripts inline y de otros proveedores', async ({ page }) => {
  await page.addInitScript(() => {
    window.policyViolations = [];
    document.addEventListener('securitypolicyviolation', (event) => {
      window.policyViolations.push({ directive: event.effectiveDirective, blockedURI: event.blockedURI });
    });
  });
  const response = await page.goto('/');
  await expect(page.locator('.hero__role')).toBeVisible();
  const headers = response.headers();
  expect(headers['x-content-type-options']).toBe('nosniff');
  expect(headers['x-frame-options']).toBe('DENY');
  expect(headers['referrer-policy']).toBe('strict-origin');
  expect(headers['content-security-policy']).toContain("frame-ancestors 'none'");
  expect(headers['content-security-policy']).not.toContain('unsafe-eval');
  expect(headers['content-security-policy']).not.toContain('unsafe-inline');
  const requests = [];
  page.on('requestfailed', (request) => {
    if (request.url().includes('untrusted.invalid')) requests.push(request.failure()?.errorText);
  });
  await page.evaluate(() => {
    window.policyViolations = [];
    const inline = document.createElement('script');
    inline.textContent = 'window.untrustedScriptExecuted = true';
    document.head.append(inline);
    const external = document.createElement('script');
    external.src = 'https://untrusted.invalid/injected.js';
    document.head.append(external);
  });
  await expect.poll(() => page.evaluate(() => window.policyViolations.some((event) => event.blockedURI === 'inline'))).toBe(true);
  await expect.poll(() => page.evaluate(() => window.policyViolations.some((event) => event.blockedURI === 'https://untrusted.invalid/injected.js'))).toBe(true);
  expect(await page.evaluate(() => window.untrustedScriptExecuted)).toBeUndefined();
  await expect.poll(() => requests.join(' ')).toMatch(/csp/i);
  await expect(page.locator('.hero__role')).toBeVisible();
});

test('retirar el consentimiento detiene Analytics también en otras pestañas', async ({ page, context }) => {
  await context.route('https://www.googletagmanager.com/**', (route) => route.fulfill({ contentType: 'text/javascript', body: '' }));
  await page.goto('/');
  await page.getByRole('button', { name: 'Aceptar', exact: true }).click();
  const other = await context.newPage();
  await other.goto('/');
  await expect(other.locator('#portfolio-google-analytics')).toHaveCount(1);
  expect(await other.evaluate(() => window['ga-disable-G-TEST123456'])).toBe(false);
  await page.getByRole('button', { name: 'Preferencias de privacidad' }).click();
  await page.getByRole('button', { name: 'Rechazar', exact: true }).click();
  await expect.poll(() => other.evaluate(() => window['ga-disable-G-TEST123456'])).toBe(true);
  const count = await other.evaluate(() => window.dataLayer.length);
  await other.locator('.project-card__link').evaluate((link) => {
    link.addEventListener('click', (event) => event.preventDefault());
    link.click();
  });
  expect(await other.evaluate(() => window.dataLayer.length)).toBe(count);
  await other.close();
});

test('retirar el permiso en otra pestaña prevalece si guardar la elección falló', async ({ page, context }) => {
  await context.route('https://www.googletagmanager.com/**', (route) => route.fulfill({ contentType: 'text/javascript', body: '' }));
  await page.addInitScript(() => {
    const original = Storage.prototype.setItem;
    Storage.prototype.setItem = function (key, value) {
      if (key === 'portfolio-analytics-consent') throw new DOMException('Storage full', 'QuotaExceededError');
      return original.call(this, key, value);
    };
  });
  await page.goto('/');
  await page.getByRole('button', { name: 'Aceptar', exact: true }).click();
  expect(await page.evaluate(() => window['ga-disable-G-TEST123456'])).toBe(false);
  const other = await context.newPage();
  await other.goto('/');
  await other.getByRole('button', { name: 'Rechazar', exact: true }).click();
  await expect.poll(() => page.evaluate(() => window['ga-disable-G-TEST123456'])).toBe(true);
  await other.close();
});
