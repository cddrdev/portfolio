import { expect, test } from '@playwright/test';

test.use({ colorScheme: 'light' });

test('el idioma cambia todo el contenido manual y se conserva al recargar', async ({ page }, testInfo) => {
  const translationRequests = [];
  page.on('request', (request) => {
    if (['fetch', 'xhr'].includes(request.resourceType())) translationRequests.push(request.url());
  });
  await page.goto('/');
  await page.getByRole('button', { name: 'Switch to English' }).click();

  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page).toHaveTitle('Carlos de Diego Rodríguez · Full stack developer');
  await expect(page.locator('main h2')).toHaveText([
    'Projects', 'Professional experience', 'Technologies', 'Education', 'Contact',
  ]);
  await expect(page.locator('.hero__role')).toHaveText('Junior full stack developer');
  await expect(page.locator('.hero__primary')).toContainText('View projects');
  await expect(page.locator('#proyectos')).toContainText('AI product recommender');
  await expect(page.locator('#experiencia')).toContainText('Warehouse associate');
  await expect(page.locator('#tecnologias')).toContainText('Databases');
  await expect(page.locator('#formacion')).toContainText('In progress');
  await expect(page.locator('.languages')).toContainText('Native');
  await expect(page.locator('#contacto')).toContainText('Email');
  await expect(page.locator('footer')).toContainText('Back to top');
  await expect(page.getByRole('navigation', { name: 'Main navigation' })).toHaveCount(1);
  await expect(page.locator('#proyectos .tag-list').first()).toHaveAttribute('aria-label', 'Technologies');
  await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute('content', 'en_GB');
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /^Portfolio of /);
  expect(translationRequests).toEqual([]);

  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.locator('.hero__role')).toHaveText('Junior full stack developer');
  await page.screenshot({ path: testInfo.outputPath('english-light.png'), fullPage: true });

  await page.getByRole('button', { name: 'Cambiar a español' }).click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'es');
  await expect(page.locator('main h2')).toHaveText([
    'Proyectos', 'Experiencia profesional', 'Tecnologías', 'Formación', 'Contacto',
  ]);
  await expect(page.locator('.hero__role')).toHaveText('Desarrollador full stack junior');
  await expect(page.getByRole('button', { name: 'Modo oscuro' })).toHaveAttribute('aria-pressed', 'false');
  await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute('content', 'es_ES');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('lang', 'es');
});

test('el tema sigue al sistema hasta elegirlo y recuerda la elección', async ({ page }, testInfo) => {
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.goto('/');
  const root = page.locator('html');
  const toggle = page.getByRole('button', { name: 'Modo oscuro' });
  await expect(root).toHaveAttribute('data-theme', 'dark');
  await expect(toggle).toHaveAttribute('aria-pressed', 'true');

  await page.emulateMedia({ colorScheme: 'light' });
  await expect(root).toHaveAttribute('data-theme', 'light');
  await toggle.click();
  await expect(root).toHaveAttribute('data-theme', 'dark');
  await expect(toggle).toHaveAttribute('title', 'Activar modo claro');
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.emulateMedia({ colorScheme: 'light' });
  await expect(root).toHaveAttribute('data-theme', 'dark');
  await page.reload();
  await expect(root).toHaveAttribute('data-theme', 'dark');
  await expect(root).toHaveCSS('color-scheme', 'dark');
  await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute('content', '#101b15');
  await page.screenshot({ path: testInfo.outputPath('spanish-dark.png'), fullPage: true });

  await toggle.click();
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.reload();
  await expect(root).toHaveAttribute('data-theme', 'light');
  await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute('content', '#f8f8f3');
});

test('el tema guardado se aplica antes de descargar React', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('portfolio-theme', 'dark');
    localStorage.setItem('portfolio-language', 'en');
  });
  await page.route('**/assets/index-*.js', (route) => route.abort());
  await page.goto('/', { waitUntil: 'domcontentloaded' });

  await expect(page.locator('#root')).toBeEmpty();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.locator('html')).toHaveCSS('background-color', 'rgb(16, 27, 21)');
  await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute('content', '#101b15');
});

test('los controles funcionan aunque el navegador bloquee el almacenamiento', async ({ page }) => {
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.addInitScript(() => {
    for (const method of ['getItem', 'setItem']) {
      Storage.prototype[method] = () => { throw new DOMException('Storage blocked', 'SecurityError'); };
    }
  });
  await page.goto('/');
  await page.getByRole('button', { name: 'Modo oscuro' }).click();
  await page.getByRole('button', { name: 'Switch to English' }).click();

  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.getByRole('button', { name: 'Dark mode' })).toHaveAttribute('aria-pressed', 'true');
  await expect(page.getByRole('heading', { name: 'Projects', exact: true })).toBeVisible();
  expect(errors).toEqual([]);
});

test('ignora preferencias antiguas o inválidas', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('portfolio-theme', 'invalid');
    localStorage.setItem('portfolio-language', 'fr');
  });
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'es');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await expect(page.getByRole('button', { name: 'Switch to English' })).toBeVisible();
});

test('ambos controles admiten teclado y respetan el movimiento reducido', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const theme = page.locator('.site-header__theme');
  const language = page.locator('.site-header__language');
  await theme.focus();
  await page.keyboard.press('Space');
  await expect(theme).toHaveAttribute('aria-pressed', 'true');
  await expect(theme).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(language).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(language).toBeFocused();
  await expect(theme.locator('svg').first()).toHaveCSS('transition-duration', '0s');
  expect(await language.evaluate((element) => getComputedStyle(element, '::before').transitionDuration)).toBe('0s');

  const menu = page.locator('.site-header__toggle');
  if (await menu.isVisible()) {
    await expect(menu).toHaveAttribute('aria-label', 'Open menu');
    await menu.click();
    await expect(menu).toHaveAttribute('aria-label', 'Close menu');
    await page.getByRole('link', { name: 'Projects', exact: true }).click();
    await expect(page).toHaveURL(/#proyectos$/);
    await expect(menu).toHaveAttribute('aria-expanded', 'false');
    await expect(page.getByRole('heading', { name: 'Projects', exact: true })).toBeInViewport({ ratio: 1 });
  }
});

test('el header cabe desde 320 px en ambos idiomas y temas', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'escritorio', 'Esta prueba recorre todos los tamaños en una sola sesión.');
  test.setTimeout(60_000);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);

  for (const width of [320, 360, 390, 448, 449, 480, 640, 768, 1024, 1025, 1280, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const language of ['es', 'en']) {
      if (await page.locator('html').getAttribute('lang') !== language) {
        await page.locator('.site-header__language').click();
      }
      for (const theme of ['light', 'dark']) {
        if (await page.locator('html').getAttribute('data-theme') !== theme) {
          await page.locator('.site-header__theme').click();
        }
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
        expect(overflow, `${width}px, ${language}, ${theme}`).toBeLessThanOrEqual(0);
        const controls = await page.locator('.site-header__control').all();
        for (const control of controls) {
          await expect(control).toBeInViewport({ ratio: 1 });
          const box = await control.boundingBox();
          expect(box.width).toBeGreaterThanOrEqual(44);
          expect(box.height).toBeGreaterThanOrEqual(44);
        }
        expect(await page.locator('header').evaluate((element) => element.offsetHeight)).toBeLessThanOrEqual(80);
      }
    }
    if (width === 390 || width === 1440) {
      await page.screenshot({ path: testInfo.outputPath(`english-dark-${width}.png`), fullPage: true });
    }
  }
});
