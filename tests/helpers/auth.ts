import { expect, type Page } from '@playwright/test';
import { standardUser } from '../data/users';

export async function logIn(page: Page) {
  await page.goto('https://www.saucedemo.com');
  await page.getByRole('textbox', { name: 'Username' }).fill(standardUser.username);
  await page.getByRole('textbox', { name: 'Password' }).fill(standardUser.password);
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
}
