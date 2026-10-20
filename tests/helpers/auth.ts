import { expect, type Page } from '@playwright/test';

export async function logIn(page: Page) {
  await page.goto('https://www.saucedemo.com');
  await page.getByRole('textbox', { name: 'Username' }).fill('standard_user');
  await page.getByRole('textbox', { name: 'Password' }).fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
}