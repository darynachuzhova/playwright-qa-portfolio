import {test , expect} from '@playwright/test';
import { logIn } from './helpers/auth';

test('sorts products by price from low to high', async ({ page }) => {
  await logIn(page);
  await page.getByRole('combobox', { name: 'Sort products' })
      .selectOption({ label: 'Price (low to high)' });
const prices = (await page.locator('.inventory_item_price').allTextContents())
      .map(price => parseFloat(price.replace('$', '')));
       const sortedPrices = [...prices].sort((a, b) => a - b);
       expect(prices.length).toBeGreaterThan(0);
       expect(prices).toEqual(sortedPrices);
});
