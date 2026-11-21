import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.use({ reducedMotion: 'reduce' });

for (const language of ['es', 'en']) {
  for (const theme of ['light', 'dark']) {
    test(`accesibilidad en ${language} con tema ${theme}`, async ({ page }) => {
      await page.addInitScript(({ language, theme }) => {
        localStorage.setItem('portfolio-language', language);
        localStorage.setItem('portfolio-theme', theme);
      }, { language, theme });
      await page.goto('/');
      await expect(page.locator('.analytics-consent')).toBeVisible();
      await page.evaluate(() => document.fonts.ready);
      const scan = async () => {
        const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']).analyze();
        expect(result.violations.map(({ id, nodes }) => ({ id, targets: nodes.map(({ target }) => target) }))).toEqual([]);
      };
      await scan();
      const menu = page.locator('.site-header__toggle');
      if (await menu.isVisible()) await menu.click();
      await page.getByRole('button', { name: language === 'es' ? 'Información de privacidad' : 'Privacy information' }).click();
      await expect(page.locator('#analytics-details')).toBeVisible();
      await scan();
    });
  }
}

test('la página y el consentimiento admiten texto al 200 % en móvil', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'movil', 'La comprobación recorre los dos anchos móviles.');
  await page.goto('/');
  await page.getByRole('button', { name: 'Rechazar', exact: true }).click();
  for (const width of [320, 390]) {
    await page.setViewportSize({ width, height: 844 });
    await page.evaluate(() => { document.documentElement.style.fontSize = '32px'; });
    for (const language of ['es', 'en']) {
      if (await page.locator('html').getAttribute('lang') !== language) await page.locator('.site-header__language').click();
      expect(await page.evaluate(() => document.documentElement.scrollWidth), `${width}px, ${language}`).toBeLessThanOrEqual(width);
      await expect(page.locator('.site-header__theme')).toBeInViewport({ ratio: 1 });
      await expect(page.locator('.site-header__language')).toBeInViewport({ ratio: 1 });
      await page.getByRole('button', { name: language === 'es' ? 'Preferencias de privacidad' : 'Privacy preferences' }).click();
      await page.getByRole('button', { name: language === 'es' ? 'Información de privacidad' : 'Privacy information' }).click();
      expect(await page.locator('.analytics-consent').evaluate((element) => element.scrollWidth - element.clientWidth)).toBeLessThanOrEqual(0);
      await page.getByRole('button', { name: language === 'es' ? 'Cerrar' : 'Close', exact: true }).click();
      await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
    }
  }
});
