import { expect, test } from '@playwright/test';

for (const reducedMotion of ['no-preference', 'reduce']) {
  test.describe(`Navegación con movimiento: ${reducedMotion}`, () => {
    test.use({ reducedMotion });

    test('el salto a Proyectos termina alineado con la sección', async ({ page }) => {
      await page.goto('/');
      const toggle = page.locator('button.site-header__toggle');
      const mobile = await toggle.isVisible();

      if (mobile) {
        await toggle.click();
        await expect(page.getByRole('button', { name: 'Cerrar menú' })).toBeVisible();
      }

      const scrollFinished = page.evaluate(
        () => new Promise((resolve) => document.addEventListener('scrollend', () => resolve(), { once: true })),
      );
      await page.locator('header a[href="#proyectos"]').click();
      await scrollFinished;

      await expect(page).toHaveURL(/#proyectos$/);
      await expect(page.getByRole('heading', { name: 'Proyectos', exact: true })).toBeInViewport({ ratio: 1 });
      await expect.poll(() => page.locator('#proyectos').evaluate((section) => {
        const padding = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop);
        return Math.abs(section.getBoundingClientRect().top - padding);
      })).toBeLessThan(1);

      if (mobile) {
        await expect(toggle).toHaveAttribute('aria-expanded', 'false');
      }
    });
  });
}

test('Escape cierra el menú móvil y devuelve el foco al botón', async ({ page }) => {
  await page.goto('/');
  const toggle = page.locator('button.site-header__toggle');
  test.skip(!(await toggle.isVisible()), 'El menú desplegable solo aparece en móvil.');

  await toggle.focus();
  await page.keyboard.press('Enter');
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await page.keyboard.press('Tab');
  await expect(page.locator('header a[href="#proyectos"]')).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await expect(toggle).toBeFocused();
  await expect(page.locator('#menu-principal')).toBeHidden();
});

test('las secciones siguen visibles sin IntersectionObserver', async ({ page }) => {
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.addInitScript(() => {
    delete window.IntersectionObserver;
  });
  await page.goto('/');

  await expect(page.locator('section.section.is-visible')).toHaveCount(5);
  await expect(page.getByRole('heading', { name: 'Contacto', exact: true })).toBeVisible();
  expect(errors).toEqual([]);
});
