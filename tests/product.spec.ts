import test, { expect } from '@playwright/test';
import { logIn } from './helpers/auth';

test('select product and verify product details', async ({ page }) => {
    await logIn(page);
    await page.getByRole('button', { name: 'View details for Sauce Labs Backpack' })
    .filter({ hasText: 'Sauce Labs Backpack' })
    .click();
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory-item.html?id=4');
    await expect(page.locator('.inventory_details_name')).toHaveText('Sauce Labs Backpack');
    await expect(page.locator('.inventory_details_desc')).toHaveText('carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.');
    await expect(page.locator('.inventory_details_price')).toHaveText('$29.99');
    await expect(page.getByRole('button', { name: 'Add to cart' })).toBeEnabled();
});

test('select product and then go back to product list', async ({ page }) => {
    await logIn(page);
    await page.getByRole('button', { name: 'View details for Sauce Labs Backpack' })
    .filter({ hasText: 'Sauce Labs Backpack' })
    .click();
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory-item.html?id=4');
    await page.getByRole('button', { name: 'Back to products' }).click();
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
});