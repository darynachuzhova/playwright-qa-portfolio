import type { Page } from '@playwright/test';

export class InventoryPage {
  constructor(private page: Page) {}
  
  async openProduct(itemName: string) {
    await this.page.
    getByRole('button', { name: `View details for ${itemName}` })
    .filter({ hasText: itemName })
    .click();
  }

   async addItemToCart(itemName: string) {
    await this.page.locator('.inventory_item')
      .filter({ hasText: itemName })
      .getByRole('button', { name: 'Add to cart' })
      .click();
  }
}