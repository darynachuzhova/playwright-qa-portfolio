import { test, expect } from '@playwright/test';
import { logIn } from './helpers/auth';
import { standardUser } from './data/users';

test('login with valid credentials', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    await page.getByRole('textbox', { name: 'Username' }).fill(standardUser.username);
    await page.getByRole('textbox', { name: 'Password' }).fill(standardUser.password);
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  });

test ('shows an error when username field is empty', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    await page.getByRole('textbox', { name: 'Password' }).fill(standardUser.password);
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Username is required');
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    });

test ('shows an error when password field is empty', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    await page.getByRole('textbox', { name: 'Username' }).fill(standardUser.username);
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Password is required');
     await expect(page).toHaveURL('https://www.saucedemo.com/');
    });

test  ('shows an error when username is invalid', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    await page.getByRole('textbox', { name: 'Username' }).fill('invalid_user');
    await page.getByRole('textbox', { name: 'Password' }).fill(standardUser.password);
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Username and password do not match any user in this service');
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    });

 test ('shows an error when password is invalid', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    await page.getByRole('textbox', { name: 'Username' }).fill(standardUser.username);
    await page.getByRole('textbox', { name: 'Password' }).fill('invalid_password');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Username and password do not match any user in this service');
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    }); 

test ('logout from the application', async ({ page }) => {
    await logIn(page);
    await page.getByRole('button', { name: 'Open Menu' }).click();
    await page.getByRole('button', { name: 'Logout' }).click();
    await expect(page).toHaveURL('https://www.saucedemo.com/');
  });



