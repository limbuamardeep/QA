import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
    await page.goto('http://www.edx.org/');
  
    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/edx/);
  });
  
  test('get started link', async ({ page }) => {
    await page.goto('http://www.edx.org/');
  
    // Click the get started link.
    await page.getByRole('link', { name: 'Sign In' }).click();
    await expect(page.getByRole('heading', { name: 'Sign In' })).toBeVisible();

  });

  