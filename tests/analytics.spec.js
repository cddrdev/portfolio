import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.route('https://www.googletagmanager.com/**', (route) => route.fulfill({ contentType: 'text/javascript', body: '' }));
  await page.route(/https:\/\/[^/]*google-analytics\.com\//, (route) => route.abort());
});

test('no carga Google antes de aceptar y recuerda el rechazo', async ({ page }) => {
  const requests = [];
  page.on('request', (request) => {
    if (/googletagmanager|google-analytics/.test(request.url())) requests.push(request.url());
  });
  await page.goto('/');
  await expect(page.getByRole('region', { name: 'Estadísticas del portfolio' })).toBeVisible();
  await expect(page.locator('#portfolio-google-analytics')).toHaveCount(0);
  await page.getByRole('button', { name: 'Rechazar', exact: true }).click();
  await page.reload();
  await expect(page.locator('.analytics-consent')).toHaveCount(0);
  expect(requests).toEqual([]);
  expect(await page.evaluate(() => window.dataLayer)).toBeUndefined();
});

test('aceptar mide visitas y clics; retirar detiene la medición', async ({ page }) => {
  await page.goto('/?email=private@example.com');
  await page.getByRole('button', { name: 'Aceptar', exact: true }).click();
  await expect(page.locator('#portfolio-google-analytics')).toHaveCount(1);
  const commands = () => page.evaluate(() => window.dataLayer.map((entry) => Array.from(entry)));
  let data = await commands();
  expect(data.filter(([command, event]) => command === 'event' && event === 'page_view')).toHaveLength(1);
  expect(JSON.stringify(data)).not.toContain('private@example.com');
  expect(data.find(([command]) => command === 'config')[2]).toMatchObject({
    send_page_view: false, allow_google_signals: false, allow_ad_personalization_signals: false,
    cookie_domain: 'none', cookie_flags: 'SameSite=Lax;Secure', cookie_expires: 180 * 24 * 60 * 60,
  });
  const globalSettings = data.find(([command]) => command === 'set')[1];
  expect(globalSettings.send_page_view).toBe(false);
  expect(globalSettings.page_location).not.toContain('?');
  expect(data.findIndex(([command]) => command === 'config')).toBeLessThan(
    data.findIndex(([command, action]) => command === 'consent' && action === 'update'),
  );
  await page.evaluate(() => {
    document.addEventListener('click', (event) => {
      if (event.target.closest('a[data-analytics-event]')) event.preventDefault();
    }, true);
  });
  await page.locator('.project-card__link').click();
  await page.locator('.contact-card').first().click();
  data = await commands();
  expect(data).toContainEqual(['event', 'project_click', { project_id: 'eurozona' }]);
  expect(data).toContainEqual(['event', 'contact_click', { contact_method: 'email' }]);
  expect(JSON.stringify(data)).not.toContain('cddrdev@outlook.es');
  await page.evaluate(() => {
    document.cookie = '_ga=test; path=/';
    document.cookie = '_ga_TEST123456=test; path=/';
  });
  await page.getByRole('button', { name: 'Preferencias de privacidad' }).click();
  await page.getByRole('button', { name: 'Rechazar', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Preferencias de privacidad' })).toBeFocused();
  expect(await page.evaluate(() => window['ga-disable-G-TEST123456'])).toBe(true);
  expect(await page.evaluate(() => document.cookie)).not.toMatch(/_ga(?:=|_TEST123456=)/);
  const count = (await commands()).length;
  await page.locator('.project-card__link').click();
  expect((await commands()).length).toBe(count);
  await page.reload();
  await expect(page.locator('#portfolio-google-analytics')).toHaveCount(0);
});

test('recuerda la aceptación sin duplicar la etiqueta ni las visitas', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Aceptar', exact: true }).click();
  await page.reload();
  await expect(page.locator('.analytics-consent')).toHaveCount(0);
  await expect(page.locator('#portfolio-google-analytics')).toHaveCount(1);
  await page.getByRole('button', { name: 'Switch to English' }).click();
  await page.getByRole('button', { name: 'Privacy preferences' }).click();
  await expect(page.getByRole('region', { name: 'Portfolio analytics' })).toBeVisible();
  await page.getByRole('button', { name: 'Privacy information' }).click();
  await expect(page.locator('#analytics-details')).toContainText('180 days');
  await page.getByRole('button', { name: 'Accept', exact: true }).click();
  expect(await page.evaluate(() => window.dataLayer.filter((entry) => entry[0] === 'event' && entry[1] === 'page_view').length)).toBe(1);
  await expect(page.locator('#portfolio-google-analytics')).toHaveCount(1);
});

test('el aviso funciona con teclado a 320 px y con movimiento reducido', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 640 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await page.getByRole('button', { name: 'Switch to English' }).click();
  const banner = page.getByRole('region', { name: 'Portfolio analytics' });
  await expect(banner).toBeInViewport({ ratio: 1 });
  await expect(banner).toHaveCSS('animation-name', 'none');
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(320);
  await page.getByRole('button', { name: 'Reject', exact: true }).focus();
  await page.keyboard.press('Enter');
  await expect(banner).toHaveCount(0);
});

test('el consentimiento caduca también con la página abierta', async ({ page }) => {
  await page.clock.install();
  await page.addInitScript(() => {
    localStorage.setItem('portfolio-analytics-consent', JSON.stringify({ value: 'accepted', expiresAt: Date.now() + 60_000 }));
  });
  await page.goto('/');
  await expect(page.locator('#portfolio-google-analytics')).toHaveCount(1);
  await expect(page.locator('.analytics-consent')).toHaveCount(0);
  await page.evaluate(() => { document.cookie = '_ga=expired; path=/'; });
  await page.clock.fastForward(61_000);
  await expect(page.locator('.analytics-consent')).toBeVisible();
  expect(await page.evaluate(() => window['ga-disable-G-TEST123456'])).toBe(true);
  expect(await page.evaluate(() => document.cookie)).not.toMatch(/_ga=/);
});

test('abrir y cerrar las preferencias no renueva el consentimiento', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Rechazar', exact: true }).click();
  const saved = await page.evaluate(() => localStorage.getItem('portfolio-analytics-consent'));
  await page.getByRole('button', { name: 'Preferencias de privacidad' }).click();
  await expect(page.locator('#analytics-title')).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(page.locator('.analytics-consent')).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'Preferencias de privacidad' })).toBeFocused();
  expect(await page.evaluate(() => localStorage.getItem('portfolio-analytics-consent'))).toBe(saved);
  await expect(page.locator('#portfolio-google-analytics')).toHaveCount(0);
});

test('el consentimiento funciona si el almacenamiento está bloqueado', async ({ page }) => {
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.addInitScript(() => {
    for (const method of ['getItem', 'setItem']) {
      Storage.prototype[method] = () => { throw new DOMException('Storage blocked', 'SecurityError'); };
    }
  });
  await page.goto('/');
  await page.getByRole('button', { name: 'Aceptar', exact: true }).click();
  await expect(page.locator('#portfolio-google-analytics')).toHaveCount(1);
  await page.getByRole('button', { name: 'Preferencias de privacidad' }).click();
  await page.getByRole('button', { name: 'Rechazar', exact: true }).click();
  expect(await page.evaluate(() => window['ga-disable-G-TEST123456'])).toBe(true);
  await page.reload();
  await expect(page.locator('.analytics-consent')).toBeVisible();
  await expect(page.locator('#portfolio-google-analytics')).toHaveCount(0);
  expect(errors).toEqual([]);
});

test('una preferencia dañada no activa Analytics', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('portfolio-analytics-consent', JSON.stringify({ value: 'accepted', expiresAt: String(Date.now() + 60_000) }));
  });
  await page.goto('/');
  await expect(page.locator('.analytics-consent')).toBeVisible();
  await expect(page.locator('#portfolio-google-analytics')).toHaveCount(0);
});
