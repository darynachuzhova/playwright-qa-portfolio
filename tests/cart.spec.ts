import { test, expect, type Page } from '@playwright/test';

async function logIn(page: Page) {
  await page.goto('https://www.saucedemo.com');
  await page.getByRole('textbox', { name: 'Username' }).fill('standard_user');
  await page.getByRole('textbox', { name: 'Password' }).fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
}

async function addItemToCart(page: Page, itemName: string) {
  await page.locator('.inventory_item').filter({ hasText: itemName }).getByRole('button', { name: 'Add to cart' }).click();
}

test('cart badge is not visible before adding item', async ({ page }) => {
    await logIn(page);
    await expect(page.locator('.shopping_cart_badge')).not.toBeVisible();
});

test('cart badge shows 1 after adding one item', async ({ page }) => {
  await logIn(page);
  await addItemToCart(page, 'Sauce Labs Backpack');
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
});

test('cart shows correct item after adding to cart', async ({ page }) => {
  await logIn(page);
  await addItemToCart(page, 'Sauce Labs Backpack');
  await page.locator('.shopping_cart_link').click();
  await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
  await expect(page.locator('.cart_item')).toHaveCount(1);
  await expect(page.locator('.inventory_item_name')).toHaveText('Sauce Labs Backpack');
});

test('cart badge shows 2 after adding two items', async ({ page }) => {
  await logIn(page);
  await addItemToCart(page, 'Sauce Labs Backpack');
  await addItemToCart(page, 'Sauce Labs Bolt T-Shirt');
  await expect(page.locator('.shopping_cart_badge')).toHaveText('2');
});

test('cart badge shows 0 after removing all item', async ({ page }) => {
  await logIn(page);
  await addItemToCart(page, 'Sauce Labs Backpack');
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
  await page.locator('.inventory_item').filter({ hasText: 'Sauce Labs Backpack' }).getByRole('button', { name: 'Remove' }).click();
  await expect(page.locator('.shopping_cart_badge')).not.toBeVisible();
});



