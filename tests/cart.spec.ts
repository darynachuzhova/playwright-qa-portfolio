import { test, expect, type Page } from '@playwright/test';
import { logIn } from './helpers/auth';
import { InventoryPage } from './pages/inventory.page';


async function addItemToCart(page: Page, itemName: string) {
  await page.locator('.inventory_item').filter({ hasText: itemName }).getByRole('button', { name: 'Add to cart' }).click();
}

test('cart badge is not visible before adding item', async ({ page }) => {
    await logIn(page);
    await expect(page.locator('.shopping_cart_badge')).not.toBeVisible();
});

test('cart badge shows 1 after adding one item', async ({ page }) => {
  await logIn(page);
  
  const inventtoryPage = new InventoryPage(page);
  await inventtoryPage.addItemToCart('Sauce Labs Backpack');
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
});

test('cart shows correct item after adding to cart', async ({ page }) => {
  await logIn(page);

  const inventtoryPage = new InventoryPage(page);
  await inventtoryPage.addItemToCart('Sauce Labs Backpack');
  await page.locator('.shopping_cart_link').click();
  await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
  const cartItem = page.locator('.cart_item');
  await expect(cartItem).toHaveCount(1);
  await expect(cartItem.locator('.inventory_item_name')).toHaveText('Sauce Labs Backpack');
});

test('cart badge shows 2 after adding two items', async ({ page }) => {
  await logIn(page);
  const inventoryPage = new InventoryPage(page);
  
  await inventoryPage.addItemToCart('Sauce Labs Backpack');
  await inventoryPage.addItemToCart('Sauce Labs Bolt T-Shirt');
  await expect(page.locator('.shopping_cart_badge')).toHaveText('2');
});

test('cart badge shows 0 after removing all item', async ({ page }) => {
  await logIn(page);
  const inventoryPage = new InventoryPage(page);
  await inventoryPage.addItemToCart('Sauce Labs Backpack');
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
  await page.locator('.inventory_item').filter({ hasText: 'Sauce Labs Backpack' }).getByRole('button', { name: 'Remove' }).click();
  await expect(page.locator('.shopping_cart_badge')).not.toBeVisible();
});



