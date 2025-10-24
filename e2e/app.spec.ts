import { test, expect } from '@playwright/test';

test('home redirects to dashboard and renders navigation', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveURL(/dashboard/);
  await expect(page.getByRole('link', { name: /Bookings/i })).toBeVisible();
});
